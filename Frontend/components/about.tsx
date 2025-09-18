import { Card, CardContent } from "@/components/ui/card"
import { Utensils, Target, Award, Users } from "lucide-react"

export function About() {
  const features = [
    {
      icon: Utensils,
      title: "Ingredientes Premium",
      description: "Selecionamos apenas os melhores ingredientes frescos e orgânicos para suas refeições.",
    },
    {
      icon: Target,
      title: "Foco no Resultado",
      description: "Cada marmita é pensada para te ajudar a alcançar seus objetivos fitness e de saúde.",
    },
    {
      icon: Award,
      title: "Qualidade Garantida",
      description: "Preparamos tudo com muito cuidado seguindo rigorosos padrões de qualidade e higiene.",
    },
    {
      icon: Users,
      title: "Atendimento Personalizado",
      description: "Nossa equipe está sempre pronta para atender suas necessidades específicas.",
    },
  ]

  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-balance">
            Por que escolher a <span className="text-primary">Low&Fit</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Somos apaixonados por alimentação saudável e queremos transformar sua rotina com refeições nutritivas e
            deliciosas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
