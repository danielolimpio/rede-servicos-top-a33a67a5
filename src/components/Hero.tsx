import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";
import slide1 from "@/assets/hero-slide-1.jpg";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { location } = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery, "in", location);
  };

  return (
    <section className="relative h-[500px] overflow-hidden">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Encontre profissionais qualificados perto de você
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Conectamos você aos melhores profissionais de conserto e manutenção
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white rounded-lg p-2 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="O que você precisa consertar?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-0 focus-visible:ring-0 text-foreground"
                />
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
              <Button type="submit" size="lg" className="h-12 px-8">
                Buscar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
