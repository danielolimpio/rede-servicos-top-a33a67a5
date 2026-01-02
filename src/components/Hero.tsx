import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";
import slide1 from "@/assets/hero-slide-1.jpg";
import SearchCommand from "@/components/SearchCommand";

const Hero = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { location } = useLocation();

  return (
    <section className="relative h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slide1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-dark/90" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="max-w-4xl w-full text-white text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Encontre profissionais qualificados perto de você
          </h1>
          <p className="text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 px-2">
            Conectamos você aos melhores profissionais de conserto e manutenção
          </p>

          {/* Search Trigger */}
          <div 
            onClick={() => setSearchOpen(true)}
            className="bg-white rounded-lg p-2 shadow-2xl cursor-pointer hover:shadow-3xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row gap-2">
              {/* Search Input (Visual trigger) */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <div className="pl-10 h-12 flex items-center text-muted-foreground text-left">
                  O que você precisa consertar?
                </div>
              </div>

              {/* Location Display */}
              <div className="flex-1 flex items-center px-3 border-l border-border">
                <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span className="truncate text-foreground text-sm">
                  {location.neighborhood && location.city
                    ? `${location.neighborhood}, ${location.city} - ${location.stateCode}`
                    : location.city && location.stateCode
                    ? `${location.city} - ${location.stateCode}`
                    : "Escolha sua localização"}
                </span>
              </div>

              {/* Search Button */}
              <Button size="lg" className="h-12 px-8">
                Buscar
              </Button>
            </div>
          </div>

          {/* Search Command Dialog */}
          <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
