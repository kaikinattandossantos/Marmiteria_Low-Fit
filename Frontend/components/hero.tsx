import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Clock, Heart } from "lucide-react"

export function Hero() {
  return (
    <section id="inicio" className="pt-20 pb-16 bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Marmitas <span className="text-primary">Fitness</span> para sua{" "}
                <span className="text-secondary">Rotina</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Refeições balanceadas, saborosas e nutritivas entregues na sua porta. Cuide da sua saúde sem abrir mão
                do sabor.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">100% Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Entrega Rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-destructive" />
                <span className="text-sm font-medium">Feito com Amor</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Link adicionado para a seção de cardápio */}
              <a href="#cardapio">
                <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
                  Ver Cardápio
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              {/* Link adicionado para a seção "sobre" */}
              <a href="#sobre">
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent w-full sm:w-auto">
                  Saiba Mais
                </Button>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
              <img
                src="/marmita_padrao.png"
                alt="Marmitas fitness Low&Fit"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm">Clientes Satisfeitos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}