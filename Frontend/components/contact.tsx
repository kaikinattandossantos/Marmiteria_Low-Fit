import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react"

export function Contact() {
  return (
    <section id="contato" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-balance">
            Faça seu <span className="text-primary">Pedido</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Estamos prontos para te atender! Fale conosco pelo WhatsApp para fazer seu pedido ou tirar dúvidas.
          </p>
        </div>

        <div className="flex flex-col items-center">
          {/* Grid com as informações principais */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl w-full">
            <Card className="p-6">
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Telefone</h3>
                  <p className="text-muted-foreground">(81) 99689-8664</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Localização</h3>
                  <p className="text-muted-foreground">Olinda, PE</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold">Horário</h3>
                  <p className="text-muted-foreground">Atendimento 24h</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Botão de Ação para o WhatsApp */}
          <div className="mt-12 w-full max-w-md">
            <a 
              href="https://wa.me/5581996898664?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido." 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button size="lg" className="w-full text-lg py-7">
                <MessageCircle className="w-6 h-6 mr-3" />
                Pedir pelo WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}