import { Wrench, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Social */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-8 w-8" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight">SERVICE</span>
                <span className="text-xl font-light tracking-wide">CENTER</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" className="hover:text-secondary transition-colors">f</a>
              <a href="#" className="hover:text-secondary transition-colors">t</a>
              <a href="#" className="hover:text-secondary transition-colors">p</a>
              <a href="#" className="hover:text-secondary transition-colors">v</a>
              <a href="#" className="hover:text-secondary transition-colors">g+</a>
              <a href="#" className="hover:text-secondary transition-colors">rss</a>
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
                <div>
                  <p>(11) 1234-5678</p>
                  <p>1-800-314-684</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <p>info@servicolocal.com.br</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <div>
                  <p>Rua Principal, 123 – Centro</p>
                  <p>São Paulo – SP, CEP 01234-000</p>
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

        <div className="border-t border-footer-foreground/20 mt-8 pt-6 text-center text-sm text-footer-foreground/60">
          <p>© 2025 Todos os Direitos Reservados. Termos de Uso e Política de Privacidade</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
