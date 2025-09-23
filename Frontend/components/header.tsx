"use client";

import { useState } from "react";
import Image from "next/image"; // 1. Importe o componente de Imagem
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { CartModal } from "./CartModal";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-3"> {/* Diminuí um pouco o padding vertical para a logo se ajustar melhor */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* 2. O texto foi substituído pela sua logo */}
              <a href="#inicio" className="flex items-center">
                <Image
                  src="/logo_lowefit.png" // Garanta que a imagem esteja na pasta 'public'
                  alt="Logo Low&Fit"
                  width={80} // Ajuste a largura conforme necessário
                  height={40}  // Ajuste a altura conforme necessário
                  className="h-auto" // Mantém a proporção da imagem
                />
              </a>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-foreground hover:text-primary transition-colors">Início</a>
              <a href="#planos" className="text-foreground hover:text-primary transition-colors">Planos</a>
              <a href="#cardapio" className="text-foreground hover:text-primary transition-colors">Cardápio</a>
              <a href="#contato" className="text-foreground hover:text-primary transition-colors">Contato</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex bg-transparent relative"
                onClick={toggleCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Pedidos
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <div className="flex flex-col space-y-4">
                <a href="#inicio" className="text-foreground hover:text-primary transition-colors">Início</a>
                <a href="#planos" className="text-foreground hover:text-primary transition-colors">Planos</a>
                <a href="#cardapio" className="text-foreground hover:text-primary transition-colors">Cardápio</a>
                <a href="#contato" className="text-foreground hover:text-primary transition-colors">Contato</a>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-fit bg-transparent relative"
                  onClick={toggleCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Pedidos
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}