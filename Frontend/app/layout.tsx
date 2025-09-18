"use client";

import { CartProvider } from "@/app/context/CartContext";
import "./globals.css"; // Assuming you have global styles

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}