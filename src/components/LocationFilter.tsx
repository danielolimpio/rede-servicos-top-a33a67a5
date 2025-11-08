import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const LocationFilter = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Brazilian states
  const states = [
    "São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná",
    "Rio Grande do Sul", "Pernambuco", "Ceará", "Pará", "Santa Catarina",
    "Maranhão", "Goiás", "Amazonas", "Espírito Santo", "Paraíba",
    "Rio Grande do Norte", "Mato Grosso", "Alagoas", "Piauí", "Distrito Federal",
    "Mato Grosso do Sul", "Sergipe", "Rondônia", "Tocantins", "Acre",
    "Amapá", "Roraima"
  ];

  // Sample cities (in real implementation, this would be dynamic based on state)
  const cities: { [key: string]: string[] } = {
    "São Paulo": ["São Paulo", "Campinas", "Santos", "São Bernardo do Campo", "Guarulhos"],
    "Rio de Janeiro": ["Rio de Janeiro", "Niterói", "Duque de Caxias", "Nova Iguaçu", "Petrópolis"],
    // Add more cities for other states as needed
  };

  // Sample neighborhoods (in real implementation, this would be dynamic based on city)
  const neighborhoods: { [key: string]: string[] } = {
    "São Paulo": ["Centro", "Pinheiros", "Vila Mariana", "Moema", "Itaim Bibi"],
    "Campinas": ["Centro", "Cambuí", "Taquaral", "Barão Geraldo", "Castelo"],
    // Add more neighborhoods for other cities as needed
  };

  const handleStateClick = (state: string) => {
    setSelectedState(state);
    setSelectedCity(null);
  };

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
  };

  const handleNeighborhoodClick = (neighborhood: string) => {
    // Navigate to service page with location
    const stateSlug = selectedState?.toLowerCase().replace(/\s+/g, "-");
    const citySlug = selectedCity?.toLowerCase().replace(/\s+/g, "-");
    const neighborhoodSlug = neighborhood.toLowerCase().replace(/\s+/g, "-");
    window.location.href = `/servicos/conserto-de-geladeira-em-${citySlug}-bairro-${neighborhoodSlug}`;
  };

  return (
    <section className="bg-muted py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
          Encontre serviços na sua cidade e bairro
        </h2>

        {/* States */}
        {!selectedState && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Selecione seu Estado:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {states.map((state) => (
                <Button
                  key={state}
                  onClick={() => handleStateClick(state)}
                  variant="secondary"
                  className="justify-between"
                >
                  {state}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Cities */}
        {selectedState && !selectedCity && (
          <div>
            <Button
              onClick={() => setSelectedState(null)}
              variant="outline"
              className="mb-4"
            >
              ← Voltar para Estados
            </Button>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Cidades em {selectedState}:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(cities[selectedState] || []).map((city) => (
                <Button
                  key={city}
                  onClick={() => handleCityClick(city)}
                  variant="secondary"
                  className="justify-between"
                >
                  {city}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Neighborhoods */}
        {selectedState && selectedCity && (
          <div>
            <Button
              onClick={() => setSelectedCity(null)}
              variant="outline"
              className="mb-4"
            >
              ← Voltar para Cidades
            </Button>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Bairros em {selectedCity}:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(neighborhoods[selectedCity] || []).map((neighborhood) => (
                <Button
                  key={neighborhood}
                  onClick={() => handleNeighborhoodClick(neighborhood)}
                  variant="secondary"
                  className="justify-between"
                >
                  {neighborhood}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationFilter;
