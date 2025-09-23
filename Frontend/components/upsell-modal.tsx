"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { X } from "lucide-react";

// Define os dados do item que estamos sugerindo
const upsellItem = {
  id: 22,
  name: "Brownie 70% funcional",
  price: "R$ 15,00", // Preço base, já que o original é "a partir de"
  image: "/placeholder-brownie.svg", // Crie uma imagem para o brownie
  description: "Nosso delicioso brownie funcional, sem glúten e sem lactose. Perfeito para fechar sua refeição com chave de ouro!"
};

interface UpsellModalProps {
  onConfirm: () => void;
  onDecline: () => void;
  onClose: () => void;
}

export function UpsellModal({ onConfirm, onDecline, onClose }: UpsellModalProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleDecline = () => {
    onDecline();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
      <Card className="max-w-md w-full relative">
        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Só um minutinho...</CardTitle>
          <CardDescription>Que tal adicionar uma sobremesa deliciosa ao seu pedido?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <img
              src={upsellItem.image}
              alt={upsellItem.name}
              className="w-40 h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{upsellItem.name}</h3>
            <p className="text-sm text-muted-foreground text-center my-2">{upsellItem.description}</p>
            <p className="text-xl font-bold text-primary mb-6">{upsellItem.price}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button size="lg" onClick={handleConfirm}>
              Sim, adicionar ao pedido!
            </Button>
            <Button size="lg" variant="outline" onClick={handleDecline}>
              Não, obrigado
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}