import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Social */}
          <div>
            <div className="flex flex-col items-start gap-2 mb-4">
              <img src={logoIcon} alt="Serviço Local" className="h-16" />
              <p className="text-sm text-footer-foreground/90 mt-2 max-w-xs">
                O profissional que você precisa, na sua cidade, no seu bairro, na hora certa.
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-sm text-footer-foreground/80 mb-4">
              Fique por dentro das últimas notícias, ofertas especiais e informações de desconto. Inscreva-se na nossa newsletter.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                className="bg-footer-foreground/10 border-footer-foreground/20 text-footer-foreground placeholder:text-footer-foreground/50"
              />
              <Button variant="secondary" className="rounded-full">
                ASSINAR
              </Button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Entre em Contato</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <p>(12) 98251-9116</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <p>info@servicolocal.com</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <div>
                  <p>Av. Julia Freire, 1200 - Expedicionários</p>
                  <p>João Pessoa - PB, CEP 58.041-000</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <div>
                  <p>Seg-Sex: 9h às 18h</p>
                  <p>Sáb-Dom: 10h às 17h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-footer-foreground/20 mt-8 pt-6 text-sm text-footer-foreground/60">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© Copyright 2025 | Todos os Direitos Reservados | Desenvolvido por <a href="https://danielolimpio.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">DanielOlimpio</a></p>
            <div className="flex gap-4">
              <a href="/termos-de-uso" className="hover:text-secondary transition-colors">Termos de Uso</a>
              <a href="/politica-de-privacidade" className="hover:text-secondary transition-colors">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
