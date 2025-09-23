"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

// Define o tipo do plano para consistência
type Plan = {
  name: string;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
  popular: boolean;
  description: string;
};

// Adiciona a nova prop 'onSelectPlan'
interface PlansSectionProps {
  onSelectPlan: (plan: Plan) => void;
}

export function PlansSection({ onSelectPlan }: PlansSectionProps) {
  const plans: Plan[] = [
    {
      name: "Combo 10 Refeições",
      quantity: 10,
      totalPrice: 180,
      unitPrice: 18.00,
      popular: false,
      description: "Escolha 10 opções, podendo repetir. Entregamos em 24h.",
    },
    {
      name: "Combo 14 Refeições",
      quantity: 14,
      totalPrice: 245,
      unitPrice: 17.50,
      popular: true,
      description: "Escolha 14 opções, podendo repetir. Entregamos em 24h.",
    },
    {
      name: "Combo 20 Refeições",
      quantity: 20,
      totalPrice: 340,
      unitPrice: 17.00,
      popular: false,
      description: "Escolha 20 opções, podendo repetir. Entregamos em 24h.",
    },
  ];

  return (
    <section id="planos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-balance">
            Escolha seu <span className="text-primary">Combo</span> Ideal
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Quanto mais você compra, mais você economiza! Escolha a quantidade ideal para sua rotina.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative flex flex-col ${plan.popular ? "border-primary shadow-lg scale-105" : "hover:shadow-md"}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  Mais Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">R$ {plan.totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-2 px-4 h-12">
                  {plan.description}
                </div>
                <div className="text-lg text-secondary font-medium mt-2">
                  (R$ {plan.unitPrice.toFixed(2).replace('.', ',')} por refeição)
                </div>
              </CardHeader>

              <CardContent className="flex flex-col flex-grow justify-between p-6 pt-2">
                <Button
                  className="w-full mt-4"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => onSelectPlan(plan)}
                >
                  Selecionar Combo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Dúvidas sobre qual combo escolher?</p>
          <a href="https://wa.me/5581996898664?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20combos." target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">
              Falar no WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}