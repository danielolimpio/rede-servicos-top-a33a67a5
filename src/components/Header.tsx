import { MapPin, Clock, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoHorizontal from "@/assets/logo-horizontal.png";

const Header = () => {
  return (
    <header className="w-full">
      {/* Top Bar - Dark Blue */}
      <div className="bg-primary-dark text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm text-white">Bem-vindo ao nosso centro de serviços! Trabalhamos para você!</p>
          <Button size="sm" variant="secondary" className="rounded-full">
            CONSULTA GRÁTIS
          </Button>
        </div>
      </div>

      {/* Main Header - Primary Blue */}
      <div className="bg-primary text-primary-foreground py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logoHorizontal} alt="Serviço Local" className="h-12" />
          </Link>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <div className="text-sm">
                <p>Av. Julia Freire, 1200 - Expedicionários</p>
                <p>João Pessoa - PB, CEP 58.041-000</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <div className="text-sm">
                <p>Seg-Sex: 9h às 18h</p>
                <p>Sáb-Dom: 10h às 17h</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <div className="text-sm">
                <p>(12) 98251-9116</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-background border-b border-border py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/" className="text-foreground hover:text-primary font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link to="/servicos" className="text-foreground hover:text-primary font-medium">
                Serviços
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="text-foreground hover:text-primary font-medium">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/galeria" className="text-foreground hover:text-primary font-medium">
                Galeria
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-foreground hover:text-primary font-medium">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contato" className="text-foreground hover:text-primary font-medium">
                Contato
              </Link>
            </li>
          </ul>

          <button className="text-foreground hover:text-primary">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
