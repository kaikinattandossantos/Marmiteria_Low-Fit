"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { useCart } from "@/app/context/CartContext" // Caminho correto do hook

// Seus dados de menu continuam aqui
export const menuItems = [
    // Fit
  { id: 1, name: "Panquecas de aveia com recheio de carne patinho", price: "R$ 19,00", image: "/placeholder.svg", category: "Fit", calories: "360gr - 620Kcal", description: "2 deliciosas massas de panquecas feita com aveia bem recheadas." },
  { id: 2, name: "Salada de grão de bico com carne", price: "R$ 19,00", image: "/placeholder.svg", category: "Fit", calories: "280gr - 430Kcal", description: "Deliciosa salada de grão de bico com carne e legumes." },
  { id: 3, name: "Salada de grão de bico com frango", price: "R$ 19,00", image: "/placeholder.svg", category: "Fit", calories: "280gr - 410Kcal", description: "Deliciosa salada de grão de bico com frango e legumes." },
  { id: 4, name: "Carne com arroz e feijão preto", price: "R$ 19,00", image: "/placeholder.svg", category: "Fit", calories: "350gr - 500Kcal", description: "Uma refeição completa, balanceada e tradicional, rica em proteínas." },
  { id: 5, name: "Escondidinho de carne", price: "R$ 19,00", image: "/placeholder.svg", category: "Fit", calories: "345gr - 500Kcal", description: "220gr Delicioso purê de macaxeira com 100gr de carne patinho." },
  { id: 6, name: "Escondidinho de frango", price: "R$ 19,00", image: "/placeholder.svg", category: "Fit", calories: "345gr - 470Kcal", description: "220gr Delicioso purê de macaxeira com 100gr de frango bem temperado." },
  { id: 7, name: "Frango xadrez com arroz integra e legumes", price: "R$ 19,00", image: "/placeholder.svg", category: "Fit", calories: "300gr - 460Kcal", description: "Refeição rica em proteína magra e carboidratos complexos." },
  { id: 8, name: "Macarrão Penne integral a bolonhesa", price: "R$ 19,00", image: "/placeholder.svg", category: "Fit", calories: "350gr - 610Kcal", description: "Refeição rica em energia, com boa carga de proteína e fibras." },
  { id: 9, name: "Panqueca de carne com arroz e legumes", price: "R$ 19,00", image: "/placeholder.svg", category: "Fit", calories: "300gr - 590Kcal", description: "Refeição rica em proteína magra e fibras, com boa composição." },
  { id: 10, name: "Panqueca de frango com arroz e legumes", price: "R$ 19,00", image: "/placeholder.svg", category: "Fit", calories: "300gr - 520Kcal", description: "Massa feita de aveia. Refeição completa e balanceada, rica em nutrientes." },
  { id: 11, name: "Strogonoff de frango com arroz integral e legumes", price: "R$ 19,00", image: "/placeholder.svg", category: "Fit", calories: "300gr - 490Kcal", description: "150gr de strogonoff, 100gr de arroz integral e 50gr de legumes." },
  // Lowcarb
  { id: 12, name: "Almondegas com espaguete de legumes", price: "R$ 19,00", image: "/placeholder.svg", category: "Lowcarb", calories: "370gr - 400Kcal", description: "Refeição rica em proteínas magras, com baixo teor de carboidratos." },
  { id: 13, name: "Canelone de abobrinha com recheio de frango", price: "R$ 19,00", image: "/placeholder.svg", category: "Lowcarb", calories: "340gr - 332Kcal", description: "Delicioso canelone de abobrinha com recheio de frango finalizado com queijo." },
  { id: 14, name: "Carne patinho com purê de batata doce", price: "R$ 19,00", image: "/placeholder.svg", category: "Lowcarb", calories: "325gr - 360Kcal", description: "180gr de um delicioso purê de batata doce com 100gr de carne magra." },
  { id: 15, name: "Carne patinho com quinoa e purê de banana", price: "R$ 19,00", image: "/placeholder.svg", category: "Lowcarb", calories: "345gr - 520Kcal", description: "Deliciosa carne patinho com molho de tomate rustico e queijo." },
  { id: 16, name: "Charuto de couve com pure de jerimum", price: "R$ 19,00", image: "/placeholder.svg", category: "Lowcarb", calories: "355gr - 400Kcal", description: "100gr de carne patinho enrolado na couve folha com um delicioso purê." },
  { id: 17, name: "Frango desfiado com purê de batata doce", price: "R$ 19,00", image: "/placeholder.svg", category: "Lowcarb", calories: "300gr - 330Kcal", description: "180gr de um delicioso purê de batata doce com 120gr de frango." },
  // Lanches
  { id: 18, name: "Coxinha Sem Culpa Lowcarb", price: "R$ 9,00", image: "/placeholder.svg", category: "Lanche", calories: "70gr - 165Kcal", description: "Massa toda feita com frango e creme de queijo e empanada na farinha de linhaça." },
  { id: 19, name: "Dadinho de tapioca - 24 unidades", price: "R$ 24,00", image: "/placeholder.svg", category: "Lanche", calories: "", description: "Excelente Lanche para todos os momentos. Ingredientes: Leite, tapioca e queijo." },
  { id: 20, name: "Pastel de batata doce com recheio de carne", price: "R$ 9,90", image: "/placeholder.svg", category: "Lanche", calories: "150gr - 250Kcal", description: "Pastel todo feito com batata doce e aveia e recheado com frango." },
  { id: 21, name: "Pastel de batata doce com recheio de frango", price: "R$ 9,90", image: "/placeholder.svg", category: "Lanche", calories: "150gr - 260Kcal", description: "Pastel todo feito com batata doce e aveia e recheado com frango." },
  // Sobremesas
  { id: 22, name: "Brownie Brownie 70% funcional", price: "A partir de R$ 15,00", image: "/placeholder.svg", category: "Sobremesa", calories: "", description: "Brownie funcional 70% Sem glúten Sem lactose. Ingredientes: Chocolate 70%, ovos, farinha de amêndoas, xylitol." },
  // Premium
  { id: 23, name: "Frango Parmegiana com espaguete de legumes", price: "R$ 22,00", image: "/placeholder.svg", category: "Premium", calories: "390gr - 520Kcal", description: "Lowcarb - Rica em fibras, vitaminas A e C (principalmente pelos vegetais)." },
  { id: 24, name: "Frango Parmegiana com macarrão integral", price: "R$ 22,00", image: "/placeholder.svg", category: "Premium", calories: "460gr - 760Kcal", description: "Refeição rica em energia e proteína, ideal para quem precisa de uma refeição mais robusta." },
  { id: 25, name: "Inhoque de banana a bolonhesa", price: "R$ 22,00", image: "/placeholder.svg", category: "Premium", calories: "360gr - 460Kcal", description: "170gr de Inhoque de banana feito com aveia coberto por uma deliciosa bolonhesa de carne magra." },
  { id: 26, name: "Lasanha integral", price: "R$ 23,00", image: "/placeholder.svg", category: "Premium", calories: "480gr - 700Kcal", description: "Refeição rica em proteínas e gorduras, com carboidrato complexo." },
];

const categories = ['Todos', 'Fit', 'Lowcarb', 'Premium', 'Lanche', 'Sobremesa'];

export function MenuSection() {
  const { addToCart } = useCart(); // 1. O hook do carrinho é chamado aqui
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredItems = selectedCategory === 'Todos'
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="cardapio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">
            Nosso <span className="text-primary">Cardápio</span> Completo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore nossas opções e monte seu pedido. Tudo feito com ingredientes frescos e muito carinho.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="rounded-full px-4"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow group flex flex-col">
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium">
                  {item.category}
                </Badge>
              </div>

              <CardHeader className="p-4 flex-grow">
                <CardTitle className="text-md font-bold leading-tight">{item.name}</CardTitle>
                <p className="text-xs text-muted-foreground text-pretty line-clamp-2 mt-1">{item.description}</p>
              </CardHeader>

              <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-center mb-4">
                  {item.calories && <Badge variant="outline" className="text-xs font-mono">{item.calories}</Badge>}
                  <span className="text-lg font-bold text-foreground">{item.price}</span>
                </div>
                {/* 2. O botão chama a função addToCart, passando o item clicado */}
                <Button size="sm" className="w-full" onClick={() => addToCart(item)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}