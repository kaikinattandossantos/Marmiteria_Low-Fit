# main.py

import os
import stripe
from dotenv import load_dotenv
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from fastapi import FastAPI, Request, HTTPException, Query

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# --- Configuração ---
STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY')
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000')

# Valida se a chave secreta foi configurada
if not STRIPE_SECRET_KEY:
    raise ValueError("A variável de ambiente STRIPE_SECRET_KEY não foi definida.")

stripe.api_key = STRIPE_SECRET_KEY

app = FastAPI()

# --- Configuração do CORS ---
# Permite que o seu frontend (ex: http://localhost:3000) se comunique com o backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Modelos de Dados (Pydantic) ---
# Isso garante que os dados recebidos do frontend tenham a estrutura correta.
class CartItem(BaseModel):
    id: int
    name: str
    price: str  # Recebemos como string "R$ 15,00"
    quantity: int
    image: Optional[str] = None
    isCombo: Optional[bool] = False
    # Adicione outros campos se necessário

class CheckoutRequest(BaseModel):
    items: List[CartItem]

# --- Funções Auxiliares ---
def parse_price_to_cents(price_str: str) -> int:
    """Converte um preço em string (ex: 'R$ 15,90') para centavos (ex: 1590)."""
    try:
        # Remove o "R$", espaços em branco e substitui a vírgula por ponto.
        price_clean = price_str.replace('R$', '').strip().replace('.', '').replace(',', '.')
        price_float = float(price_clean)
        return int(price_float * 100)
    except (ValueError, TypeError):
        # Retorna 0 ou lança um erro se o formato for inválido.
        # Para este caso, lançar um erro é mais seguro para o fluxo de pagamento.
        raise ValueError(f"Formato de preço inválido: {price_str}")


# --- Endpoints da API ---

@app.get("/")
def read_root():
    return {"message": "API Financeira com Stripe está online"}

@app.post("/api/create-checkout-session")
async def create_checkout_session(checkout_request: CheckoutRequest):
    """
    Cria uma sessão de checkout no Stripe com base nos itens do carrinho.
    """
    cart_items = checkout_request.items
    if not cart_items:
        raise HTTPException(status_code=400, detail="O carrinho está vazio.")

    line_items = []
    for item in cart_items:
        try:
            unit_amount_cents = parse_price_to_cents(item.price)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=f"Erro no item '{item.name}': {e}")
            
        line_items.append({
            'price_data': {
                'currency': 'brl',
                'product_data': {
                    'name': item.name,
                    # Você pode adicionar mais detalhes como a imagem aqui
                    # 'images': [item.image] if item.image else [],
                },
                'unit_amount': unit_amount_cents,
            },
            'quantity': item.quantity,
        })

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'], # Adicione outros métodos se quiser: 'boleto'
            line_items=line_items,
            mode='payment',
            success_url=f"{FRONTEND_URL}/pedido-sucesso?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{FRONTEND_URL}/", # Redireciona para a home se cancelar
        )
        return {"checkoutUrl": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/validate-payment")
async def validate_payment(session_id: str = Query(alias="sessionId")):
    """
    Valida o status de uma sessão de pagamento do Stripe.
    """
    if not session_id:
        raise HTTPException(status_code=400, detail="Session ID é obrigatório.")
        
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        
        # O frontend espera 'paid', 'pending', ou 'failed'.
        # O payment_status do Stripe pode ser 'paid', 'unpaid', ou 'no_payment_required'.
        if session.payment_status == 'paid':
            # Pagamento foi bem-sucedido.
            # AQUI é um bom lugar para salvar o pedido no seu banco de dados!
            return {"status": "paid"}
        
        # Para outros status como 'unpaid' ou 'expired', consideramos como falha.
        return {"status": "failed"}

    except stripe.error.InvalidRequestError:
        raise HTTPException(status_code=404, detail="Sessão de pagamento não encontrada.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))