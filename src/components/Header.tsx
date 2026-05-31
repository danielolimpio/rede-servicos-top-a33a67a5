import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoHorizontal from "@/assets/logo-horizontal.png";
import LocationSelector from "@/components/LocationSelector";
import { categories } from "@/data/categories";
import SearchCommand from "@/components/SearchCommand";
import MobileMenu from "@/components/MobileMenu";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
      <header className="w-full">
        {/* Top Bar - Dark Blue - Hidden on mobile */}
        <div className="hidden sm:block bg-primary-dark text-white py-2 px-4">
          <div className="container mx-auto flex items-center justify-between">
            <p className="text-sm text-white">Bem-vindo ao nosso centro de serviços! Trabalhamos para você!</p>
            <Button asChild size="sm" variant="secondary" className="rounded-full">
              <Link to="/cadastro-profissional">CADASTRE-SE</Link>
            </Button>
          </div>
        </div>

        {/* Main Header - Primary Blue with Navigation */}
        <div className="bg-primary text-white py-3 sm:py-4 px-4">
          <div className="container mx-auto flex items-center justify-between">
            {/* Mobile: Logo left, Search + Hamburger right */}
            <div className="flex lg:hidden items-center justify-between w-full gap-3">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img src={logoHorizontal} alt="Serviço Local" className="h-8" />
              </Link>

              {/* Search + Menu Hamburguer */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-white hover:opacity-80 transition-opacity"
                  aria-label="Abrir busca"
                >
                  <Search className="h-5 w-5" />
                </button>
                <MobileMenu onSearchOpen={() => setSearchOpen(true)} />
              </div>
            </div>

            {/* Desktop: Original layout */}
            <div className="hidden lg:flex items-center justify-between w-full">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img src={logoHorizontal} alt="Serviço Local" className="h-12" />
              </Link>

              {/* Navigation */}
              <ul className="flex items-center gap-6">
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
                <button 
                  onClick={() => setSearchOpen(true)}
                  className="text-white hover:opacity-80 transition-opacity"
                  aria-label="Abrir busca"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Bar - Hidden on mobile */}
        <nav className="hidden lg:block bg-background border-b border-border py-3 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-center gap-8">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.id}
                    to={`/categoria/${category.slug}`}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors whitespace-nowrap"
                  >
                    <IconComponent className="h-5 w-5 shrink-0" />
                    <span className="text-sm font-medium">{category.shortName ?? category.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
