"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { menuItems as allAvailableDishes } from "./menu-section";

type Plan = {
  name: string;
  quantity: number;
  totalPrice: number;
};

interface ComboBuilderModalProps {
  plan: Plan;
  onClose: () => void;
}

type SelectedDish = {
  id: number;
  name: string;
  quantity: number;
};

export function ComboBuilderModal({ plan, onClose }: ComboBuilderModalProps) {
  const { addToCart } = useCart();
  const [selectedDishes, setSelectedDishes] = useState<SelectedDish[]>([]);
  const [activeCategory, setActiveCategory] = useState("Fit");
  const [searchTerm, setSearchTerm] = useState("");

  const mealCategories = ['Fit', 'Lowcarb', 'Premium'];

  const filteredMeals = allAvailableDishes
    .filter(dish => mealCategories.includes(dish.category))
    .filter(dish => dish.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalSelected = selectedDishes.reduce((total, dish) => total + dish.quantity, 0);
  const remainingSelections = plan.quantity - totalSelected;

  const handleSelectDish = (dish: { id: number; name: string }) => {
    if (remainingSelections <= 0) return;
    setSelectedDishes(prev => {
      const existing = prev.find(d => d.id === dish.id);
      if (existing) {
        return prev.map(d => d.id === dish.id ? { ...d, quantity: d.quantity + 1 } : d);
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const handleRemoveDish = (dishId: number) => {
    setSelectedDishes(prev => {
      const existing = prev.find(d => d.id === dishId);
      if (existing && existing.quantity > 1) {
        return prev.map(d => d.id === dishId ? { ...d, quantity: d.quantity - 1 } : d);
      }
      return prev.filter(d => d.id !== dishId);
    });
  };

  const removeAllOfDish = (dishId: number) => {
    setSelectedDishes(prev => prev.filter(d => d.id !== dishId));
  };

  const handleConfirmCombo = () => {
    const comboItem = {
      id: -Math.floor(Math.random() * 1000),
      name: plan.name,
      price: `R$ ${plan.totalPrice.toFixed(2).replace('.', ',')}`,
      image: "/placeholder-combo.svg",
      isCombo: true,
      comboItems: selectedDishes,
    };
    addToCart(comboItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <Card className="max-w-4xl w-full max-h-[90vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b shrink-0">
          <div>
            <CardTitle>Monte seu {plan.name}</CardTitle>
            <p className="text-muted-foreground text-sm mt-1">
              Selecione {plan.quantity} refeições. Faltam: <span className="text-primary font-bold">{remainingSelections}</span>
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        {/* A ESTRUTURA DE LAYOUT FOI AJUSTADA AQUI */}
        <div className="grid md:grid-cols-2 flex-1 overflow-y-hidden">
          {/* Coluna da Esquerda com Busca e Abas */}
          <div className="p-4 border-r flex flex-col overflow-y-auto">
            <Input
              placeholder="🔎 Pesquisar prato..."
              className="mb-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid w-full grid-cols-3">
                {mealCategories.map(cat => (
                  <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                ))}
              </TabsList>
              <div className="mt-4 pr-2">
                {mealCategories.map(cat => (
                  <TabsContent key={cat} value={cat}>
                    <div className="space-y-2">
                      {filteredMeals.filter(dish => dish.category === cat).map(dish => (
                        <div key={dish.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                          <p className="font-medium text-sm">{dish.name}</p>
                          <Button size="sm" onClick={() => handleSelectDish(dish)} disabled={remainingSelections <= 0}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>

          {/* Coluna da Direita (Sua Seleção) */}
          <div className="flex flex-col">
            <div className="p-4">
              <h3 className="font-semibold mb-4 text-center md:text-left">Sua Seleção ({totalSelected} de {plan.quantity})</h3>
            </div>
            <div className="overflow-y-auto px-4 flex-1">
              {selectedDishes.length === 0 ? (
                <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                  Comece a adicionar refeições.
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedDishes.map(dish => (
                    <div key={dish.id} className="flex items-center justify-between p-2 rounded-md bg-muted">
                      <div>
                        <p className="font-medium text-sm">{dish.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => handleRemoveDish(dish.id)}>
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold text-sm w-4 text-center">{dish.quantity}</span>
                        <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => handleSelectDish(dish)} disabled={remainingSelections <= 0}>
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => removeAllOfDish(dish.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 mt-auto border-t">
              <Button
                onClick={handleConfirmCombo}
                disabled={remainingSelections !== 0}
                className="w-full"
                size="lg"
              >
                {remainingSelections > 0
                  ? `Selecione mais ${remainingSelections} para continuar`
                  : 'Confirmar e Adicionar ao Carrinho'
                }
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}