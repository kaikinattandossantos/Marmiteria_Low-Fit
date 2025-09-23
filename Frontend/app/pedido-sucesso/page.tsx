"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from '@/app/context/CartContext'; // !!! ATUALIZE PARA O SEU CAMINHO CORRETO DO CONTEXTO DO CARRINHO !!!
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'; // Ícones para feedback visual
import Link from 'next/link'; // Para navegação declarativa

// Adicionei a interface para o status de forma mais robusta
type PaymentStatus = 'loading' | 'success' | 'pending' | 'failed' | 'error_api';

export default function PedidoSucessoPage() { // Renomeado para seguir convenção de páginas
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart(); // Obtém a função para limpar o carrinho do contexto
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('loading');
  const [errorMessage, setErrorMessage] = useState(''); // Para mensagens de erro específicas
  const router = useRouter();

// DENTRO DE PedidoSucessoPage.tsx

useEffect(() => {
    if (!sessionId) {
        // ... (lógica existente está boa)
        return;
    }

    const validatePayment = async () => {
        try {
            // VERIFIQUE SE A URL ESTÁ CORRETA
            const response = await fetch(`http://localhost:8080/api/validate-payment?sessionId=${sessionId}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Falha na comunicação com o servidor de pagamento.');
            }

            const data = await response.json();
            
            // A lógica abaixo já funciona perfeitamente com a resposta do nosso backend!
            if (data.status === 'paid') {
                setPaymentStatus('success');
                clearCart();
            } else {
                 // Nosso backend retorna 'failed' para todos os outros casos
                setPaymentStatus('failed');
                setErrorMessage('O pagamento não foi confirmado ou falhou.');
            }
        } catch (error) {
            // ... (lógica de erro existente está boa)
        }
    };

    validatePayment();
}, [sessionId, clearCart]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 text-center bg-background text-foreground">
      {paymentStatus === "loading" && (
        <div className="flex flex-col items-center">
          <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold">Verificando seu pagamento...</h1>
          <p className="mt-2 text-muted-foreground">Isso pode levar alguns segundos.</p>
        </div>
      )}

      {paymentStatus === "success" && (
        <div className="flex flex-col items-center">
          <CheckCircle2 className="h-20 w-20 text-green-500 mb-6 animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Pedido Confirmado!</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">Obrigado pelo seu pedido, ele está sendo preparado com carinho! 🍽️</p>
          <Link href="/">
            <Button size="lg" className="mt-8">Voltar ao Cardápio</Button>
          </Link>
        </div>
      )}

      {(paymentStatus === "pending" || paymentStatus === "failed" || paymentStatus === "error_api") && (
        <div className="flex flex-col items-center">
          <XCircle className="h-20 w-20 text-destructive mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-destructive">
            {paymentStatus === "pending" ? "Pagamento Pendente" : "Problema com o Pagamento"}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">{errorMessage}</p>
          {paymentStatus !== "error_api" && (
            <p className="mt-2 text-md text-muted-foreground">
              Por favor, aguarde alguns minutos ou entre em contato se o problema persistir.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/">
              <Button size="lg" variant="outline">Voltar ao Início</Button>
            </Link>
            <Link href="/contato"> {/* Supondo que você terá uma página de contato */}
              <Button size="lg">Entrar em Contato</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}