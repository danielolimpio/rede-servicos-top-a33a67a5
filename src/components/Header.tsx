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

      {/* Main Header - Primary Blue with Navigation */}
      <div className="bg-primary text-white py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logoHorizontal} alt="Serviço Local" className="h-12" />
          </Link>

          {/* Navigation - Hidden on mobile */}
          <ul className="hidden lg:flex items-center gap-6">
            <li>
              <Link to="/" className="text-white hover:opacity-80 font-medium transition-opacity">
                Home
              </Link>
            </li>
            <li>
              <Link to="/servicos" className="text-white hover:opacity-80 font-medium transition-opacity">
                Serviços
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="text-white hover:opacity-80 font-medium transition-opacity">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/galeria" className="text-white hover:opacity-80 font-medium transition-opacity">
                Galeria
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-white hover:opacity-80 font-medium transition-opacity">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contato" className="text-white hover:opacity-80 font-medium transition-opacity">
                Contato
              </Link>
            </li>
          </ul>

          {/* Right side: Location and Search */}
          <div className="flex items-center gap-3">
            <LocationSelector />
            <button className="text-white hover:opacity-80 transition-opacity">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar - White background */}
      <nav className="bg-background border-b border-border py-3 px-4">
        <div className="container mx-auto">
          <div className="hidden lg:flex items-center justify-center gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/categoria/${category.slug}`}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-sm font-medium">{category.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
