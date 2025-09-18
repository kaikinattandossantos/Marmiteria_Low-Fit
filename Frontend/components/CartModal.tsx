"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
    console.log("CartModal: isOpen changed to", isOpen, "cartItems:", cartItems);
  }, [isOpen, cartItems]);

  if (!isModalOpen) {
    console.log("CartModal not rendered due to isModalOpen: false");
    return null;
  }

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
    console.log("CartModal closed");
  };

  const formattedTotal = totalPrice.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-background rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Seu Carrinho ({cartItems.length} itens)</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Seu carrinho está vazio.
              </div>
            ) : (
              <>
                {cartItems.map((item) => {
                  const itemPrice = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
                  const itemTotal = (itemPrice * item.quantity).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  });

                  return (
                    <div key={item.id} className="flex items-center p-4 border-b border-border last:border-b-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded mr-4"
                        onError={() => console.log(`Failed to load image for ${item.name}`)}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.price}</p>
                        {item.comboItems && (
                          <div className="mt-2 text-sm">
                            <p className="font-semibold">Itens do Combo:</p>
                            <ul className="list-disc pl-4">
                              {item.comboItems.map((comboItem) => (
                                <li key={comboItem.id}>{comboItem.name}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            updateQuantity(item.id, item.quantity - 1);
                            console.log("Decreased quantity for item:", item.id, "to", item.quantity - 1);
                          }}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Badge className="px-3">{item.quantity}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            updateQuantity(item.id, item.quantity + 1);
                            console.log("Increased quantity for item:", item.id, "to", item.quantity + 1);
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            removeFromCart(item.id);
                            console.log("Removed item:", item.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <p className="text-sm font-medium ml-2">{itemTotal}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="p-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-xl font-bold">{formattedTotal}</span>
                  </div>
                  <Button className="w-full mt-4">Finalizar Pedido</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
