import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoHorizontal from "@/assets/logo-horizontal.png";
import LocationSelector from "@/components/LocationSelector";
import { categories } from "@/data/categories";

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

          {/* Categories - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-6">
            {categories.slice(0, 5).map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/categoria/${category.slug}`}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-sm font-medium">{category.name}</span>
                </Link>
              );
            })}
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

          <div className="flex items-center gap-3">
            <LocationSelector />
            <button className="text-foreground hover:text-primary">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
