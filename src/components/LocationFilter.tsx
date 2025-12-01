import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";
import LocationSelector from "@/components/LocationSelector";

const LocationFilter = () => {
  const { location } = useLocation();

  const handleFindProfessionals = () => {
    if (location.neighborhood && location.city) {
      const citySlug = location.city.toLowerCase().replace(/\s+/g, "-");
      const neighborhoodSlug = location.neighborhood.toLowerCase().replace(/\s+/g, "-");
      window.location.href = `/servicos/conserto-de-geladeira-em-${citySlug}-bairro-${neighborhoodSlug}`;
    }
  };

  return (
    <section className="bg-muted py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Encontre Profissionais na Sua Região
          </h2>
          <p className="text-muted-foreground text-lg">
            Selecione sua localização para encontrar os melhores profissionais próximos a você
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <div className="flex flex-col items-center gap-6">
            {location.neighborhood && location.city ? (
              <div className="text-center space-y-4 w-full">
                <div className="flex items-center justify-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-semibold">
                    {location.neighborhood}, {location.city} - {location.stateCode}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleFindProfessionals} size="lg" className="gap-2">
                    <MapPin className="h-5 w-5" />
                    Buscar Profissionais
                  </Button>
                  <LocationSelector />
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 w-full">
                <p className="text-muted-foreground mb-4">
                  Você ainda não selecionou sua localização
                </p>
                <LocationSelector />
              </div>
            )}
          </div>
        </div>

        {location.city && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Conectando você com profissionais verificados em {location.city}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationFilter;
