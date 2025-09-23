"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Trash2, Minus, Plus, Loader2 } from "lucide-react"; // Adicionado Loader2 para o botão
import { useCart } from "@/app/context/CartContext"; // Assumindo que este é o caminho correto para seu contexto
import { UpsellModal } from "./upsell-modal";

const UPSELL_ITEM_ID = 22; // ID do Brownie

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, addToCart } = useCart();
  const [showUpsell, setShowUpsell] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Novo estado para feedback de carregamento

  useEffect(() => {
    if (!isOpen) {
      setShowUpsell(false);
    }
    // Trava o scroll da página principal quando o modal está aberto
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Limpa o estilo quando o componente é desmontado
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  // FUNÇÃO ATUALIZADA: Lógica para enviar o pedido ao backend e redirecionar para o Mercado Pago
// DENTRO DE CartModal.tsx

const proceedToCheckout = async () => {
    setIsLoading(true);
    try {
        // ATUALIZE A URL para o novo endpoint do backend
        const backendUrl = 'http://localhost:8080/api/create-checkout-session';

        console.log("Enviando itens do carrinho para o backend:", cartItems);

        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: cartItems }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Falha ao iniciar o pagamento via Stripe.');
        }

        // <<<< MUDANÇA CHAVE AQUI >>>>
        // O backend agora retorna "checkoutUrl" em vez de "initPointUrl"
        const { checkoutUrl } = await response.json();

        if (checkoutUrl) {
            console.log("Redirecionando para o Stripe:", checkoutUrl);
            window.location.href = checkoutUrl; // Redireciona para a página do Stripe
        } else {
            throw new Error('URL de pagamento do Stripe não recebida do servidor.');
        }

    } catch (error) {
        console.error("Erro no checkout:", error);
        alert(error instanceof Error ? error.message : "Não foi possível iniciar o pagamento. Tente novamente.");
    } finally {
        setIsLoading(false);
    }
};


  // FUNÇÃO ATUALIZADA: Gerencia o clique no botão "Finalizar Pedido" (com lógica de Upsell)
  const handleFinalizeOrderClick = () => {
    // Certifica-se de que o carrinho não está vazio antes de prosseguir
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const hasBrownie = cartItems.some(item => item.id === UPSELL_ITEM_ID);
    
    // Se não tem brownie E o carrinho não está vazio, mostra o upsell
    if (!hasBrownie) { 
      setShowUpsell(true);
    } else {
      // Se já tem brownie ou o upsell foi ignorado, vai direto para o checkout
      proceedToCheckout();
    }
  };

  // FUNÇÃO ATUALIZADA: Confirma o upsell
  const handleUpsellConfirm = () => {
    addToCart({
      id: UPSELL_ITEM_ID,
      name: "Brownie 70% funcional",
      price: "R$ 15,00",
      image: "/placeholder-brownie.svg"
    });
    setShowUpsell(false);
    proceedToCheckout(); // Continua para o checkout após adicionar o brownie
  };

  // FUNÇÃO ATUALIZADA: Recusa o upsell
  const handleUpsellDecline = () => {
    setShowUpsell(false);
    proceedToCheckout(); // O cliente recusou, mas quer continuar para o pagamento
  };

  const formattedTotal = totalPrice.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
        <Card className="max-w-md w-full max-h-[85vh] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Seu Carrinho</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Seu carrinho está vazio.
              </div>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start p-4 border-b last:border-b-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <p className="font-semibold leading-tight">{item.name}</p>
                      {/* Mostra a lista de itens se for um combo */}
                      {item.isCombo && item.comboItems && (
                        <ul className="text-xs text-muted-foreground list-disc pl-4 mt-1">
                          {item.comboItems.map(comboItem => (
                            <li key={comboItem.id}>{comboItem.quantity}x {comboItem.name}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <p className="text-md font-bold whitespace-nowrap">
                        {item.price}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.isCombo || item.quantity <= 1} // Desabilita para combos e se for <= 1
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.isCombo} // Desabilita para combos
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          {cartItems.length > 0 && (
            <div className="p-4 border-t mt-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-xl font-bold">{formattedTotal}</span>
              </div>
              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleFinalizeOrderClick}
                disabled={isLoading} // Desabilita o botão enquanto carrega
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando Pagamento...
                  </>
                ) : (
                  'Finalizar Pedido'
                )}
              </Button>
            </div>
          )}
        </Card>
      </div>

      {showUpsell && (
        <UpsellModal
          onConfirm={handleUpsellConfirm}
          onDecline={handleUpsellDecline}
          onClose={() => setShowUpsell(false)}
        />
      )}
    </>
  );
}