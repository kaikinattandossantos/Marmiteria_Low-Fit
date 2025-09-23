"use client";

import { useState } from "react";
import { HeroAbout } from "@/components/hero-about";
import { PlansSection } from "@/components/plans-section";
import { MenuSection } from "@/components/menu-section";
import { Contact } from "@/components/contact";
import { ComboBuilderModal } from "@/components/combo-builder-modal";

type Plan = {
  name: string;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
  popular: boolean;
  description: string;
};

export default function Home() {
  // Estado para controlar o modal de montagem do combo
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  return (
    <>
      <HeroAbout />
      <PlansSection onSelectPlan={handleSelectPlan} />
      <MenuSection />
      <Contact />

      {/* O modal só será renderizado se um plano for selecionado */}
      {selectedPlan && (
        <ComboBuilderModal
          plan={selectedPlan}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}