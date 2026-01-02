import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { categories } from "@/data/categories";
import logoHorizontal from "@/assets/logo-horizontal.png";

interface MobileMenuProps {
  onSearchOpen: () => void;
}

const MobileMenu = ({ onSearchOpen }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);

  const mainLinks = [
    { to: "/", label: "Home" },
    { to: "/servicos", label: "Serviços" },
    { to: "/sobre", label: "Sobre" },
    { to: "/galeria", label: "Galeria" },
    { to: "/blog", label: "Blog" },
    { to: "/contato", label: "Contato" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10 h-10 w-10">
          <Menu className="h-7 w-7" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 overflow-y-auto">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center">
            <img src={logoHorizontal} alt="Serviço Local" className="h-8" />
          </SheetTitle>
        </SheetHeader>
        
        <div className="p-4">
          {/* Search Button */}
          <Button 
            variant="outline" 
            className="w-full justify-start mb-4"
            onClick={() => {
              setOpen(false);
              onSearchOpen();
            }}
          >
            <span className="text-muted-foreground">Buscar serviços...</span>
          </Button>

          {/* Main Navigation Links */}
          <nav className="space-y-1 mb-6">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex items-center py-3 px-2 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Categories Accordion */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Categorias
            </h3>
            <Accordion type="single" collapsible className="space-y-1">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <AccordionItem key={category.id} value={category.id} className="border-0">
                    <AccordionTrigger className="py-3 px-2 hover:bg-muted rounded-lg hover:no-underline [&[data-state=open]]:bg-muted">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-sm">{category.name}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2">
                      <div className="ml-11 space-y-1">
                        {/* Link to main category */}
                        <Link
                          to={`/categoria/${category.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center py-2 px-2 text-sm text-primary hover:bg-primary/5 rounded-md transition-colors"
                        >
                          Ver todos os serviços
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        </Link>
                        {/* Subcategories - show first 5 */}
                        {category.subcategories.slice(0, 5).map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/categoria/${category.slug}?subcategoria=${sub.slug}`}
                            onClick={() => setOpen(false)}
                            className="block py-2 px-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                        {category.subcategories.length > 5 && (
                          <Link
                            to={`/categoria/${category.slug}`}
                            onClick={() => setOpen(false)}
                            className="block py-2 px-2 text-xs text-primary hover:underline"
                          >
                            +{category.subcategories.length - 5} mais serviços
                          </Link>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* CTA Button */}
          <div className="mt-6 pt-4 border-t">
            <Button className="w-full rounded-full">
              CONSULTA GRÁTIS
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
