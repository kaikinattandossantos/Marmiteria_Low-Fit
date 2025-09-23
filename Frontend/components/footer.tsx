import { Separator } from "@/components/ui/separator"
import { Instagram, Facebook, Twitter, Leaf, MapPin, Clock, Phone, Wallet } from "lucide-react"

export function Footer() {
  // OBS: Substitua "#" pelos links reais das suas redes sociais
  const socialLinks = {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    twitter: "https://twitter.com/",
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Coluna 1: Sobre a Empresa */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">L&F</span>
              </div>
              <h3 className="text-xl font-bold">Low&Fit</h3>
            </div>
            <p className="text-muted-foreground text-pretty">
              Transformando vidas através da alimentação saudável e saborosa. Sua jornada fitness começa aqui.
            </p>
            <div className="flex space-x-4">
              {/* Ícones de redes sociais agora são links clicáveis */}
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#inicio" className="hover:text-primary transition-colors">Início</a></li>
              <li><a href="#planos" className="hover:text-primary transition-colors">Planos</a></li>
              <li><a href="#cardapio" className="hover:text-primary transition-colors">Cardápio</a></li>
              <li><a href="#contato" className="hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Coluna 3: Informações Úteis (Substituindo "Categorias") */}
          <div>
            <h4 className="font-semibold mb-4">Informações</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#entrega" className="hover:text-primary transition-colors">Área de Entrega</a></li>
              <li><a href="#pagamento" className="hover:text-primary transition-colors">Formas de Pagamento</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">Dúvidas Frequentes</a></li>
            </ul>
             <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                <Wallet size={16} />
                <span className="text-sm">Aceitamos PIX e Cartão</span>
            </div>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-1 shrink-0" />
                {/* Link clicável para ligar ou abrir o WhatsApp */}
                <a href="https://wa.me/5581996898664" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  (81) 99689-8664
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span>Olinda e Recife, PE</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-1 shrink-0" />
                <span>Atendimento 24h</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {new Date().getFullYear()} Low&Fit. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Leaf className="w-4 h-4 text-secondary" />
            <span>Feito com ingredientes naturais</span>
          </div>
        </div>
      </div>
    </footer>
  )
}