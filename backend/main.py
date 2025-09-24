# main.py

import os
import stripe
from dotenv import load_dotenv
from fastapi import FastAPI, Request, HTTPException, Query, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

# Carrega as variáveis de ambiente
load_dotenv()

# --- Configuração ---
STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY')
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000')
STRIPE_WEBHOOK_SECRET = os.getenv('STRIPE_WEBHOOK_SECRET') # Nova variável

stripe.api_key = STRIPE_SECRET_KEY

app = FastAPI()

# --- Configuração do CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Modelos de Dados (Pydantic) ---
class CartItem(BaseModel):
    id: int
    name: str
    price: str
    quantity: int

class CheckoutRequest(BaseModel):
    items: List[CartItem]

# --- Funções Auxiliares ---
def parse_price_to_cents(price_str: str) -> int:
    price_clean = price_str.replace('R$', '').strip().replace('.', '').replace(',', '.')
    return int(float(price_clean) * 100)

# --- Endpoints da API ---

@app.get("/")
def read_root():
    return {"message": "API Financeira com Stripe está online"}

@app.post("/api/create-checkout-session")
async def create_checkout_session(checkout_request: CheckoutRequest):
    try:
        line_items = []
        for item in checkout_request.items:
            line_items.append({
                'price_data': {
                    'currency': 'brl',
                    'product_data': {'name': item.name},
                    'unit_amount': parse_price_to_cents(item.price),
                },
                'quantity': item.quantity,
            })

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=f"{FRONTEND_URL}/pedido-sucesso?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{FRONTEND_URL}/",
        )
        return {"checkoutUrl": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/validate-payment")
async def validate_payment(session_id: str = Query(alias="sessionId")):
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        if session.payment_status == 'paid':
            return {"status": "paid"}
        return {"status": "failed"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- NOVO ENDPOINT DE WEBHOOK ---
@app.post("/api/stripe-webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    """
    Este endpoint ouve as notificações (eventos) enviadas pelo Stripe.
    """
    # 1. Lê o corpo da requisição
    payload = await request.body()

    # 2. Valida a assinatura para garantir que a requisição veio do Stripe
    try:
        event = stripe.Webhook.construct_event(
            payload=payload, sig_header=stripe_signature, secret=STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e: # Payload inválido
        raise HTTPException(status_code=400, detail=str(e))
    except stripe.error.SignatureVerificationError as e: # Assinatura inválida
        raise HTTPException(status_code=400, detail=str(e))

    # 3. Processa o evento
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # --- LÓGICA DE PEDIDO CONFIRMADO ---
        # Este é o lugar para a lógica mais importante do seu negócio!
        # - Salvar o pedido no banco de dados.
        # - Enviar e-mail de confirmação para o cliente.
        # - Notificar a cozinha para preparar o pedido.
        print(f"✅ Pagamento bem-sucedido para a sessão: {session.get('id')}")
        print("🚀 Hora de salvar no banco e notificar o cliente!")
    else:
        print(f"Evento não tratado: {event['type']}")

    return {"status": "success"}