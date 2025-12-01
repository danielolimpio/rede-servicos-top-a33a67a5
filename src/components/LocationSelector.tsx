import { useState, useEffect } from "react";
import { MapPin, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLocation } from "@/contexts/LocationContext";
import { useToast } from "@/hooks/use-toast";

interface State {
  id: number;
  sigla: string;
  nome: string;
}

interface City {
  id: number;
  nome: string;
}

const LocationSelector = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"state" | "city" | "neighborhood">("state");
  const { location, setLocation } = useLocation();
  const { toast } = useToast();

  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // Sample neighborhoods - in production, this could come from another API or database
  const neighborhoods: { [key: string]: string[] } = {
    "default": ["Centro", "Zona Norte", "Zona Sul", "Zona Leste", "Zona Oeste"],
    "São Paulo": ["Centro", "Pinheiros", "Vila Mariana", "Moema", "Itaim Bibi", "Perdizes", "Santana", "Tatuapé"],
    "Rio de Janeiro": ["Centro", "Copacabana", "Ipanema", "Leblon", "Barra da Tijuca", "Botafogo", "Tijuca"],
    "Campinas": ["Centro", "Cambuí", "Taquaral", "Barão Geraldo", "Castelo", "Guanabara"],
  };

  // Load states from IBGE API
  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");
        const data = await response.json();
        setStates(data);
      } catch (error) {
        toast({
          title: "Erro ao carregar estados",
          description: "Não foi possível carregar a lista de estados. Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, [toast]);

  // Load cities when state is selected
  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        setLoadingCities(true);
        try {
          const response = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState.id}/municipios?orderBy=nome`
          );
          const data = await response.json();
          setCities(data);
        } catch (error) {
          toast({
            title: "Erro ao carregar cidades",
            description: "Não foi possível carregar a lista de cidades. Tente novamente.",
            variant: "destructive",
          });
        } finally {
          setLoadingCities(false);
        }
      };
      fetchCities();
    }
  }, [selectedState, toast]);

  const handleStateClick = (state: State) => {
    setSelectedState(state);
    setStep("city");
  };

  const handleCityClick = (city: City) => {
    setSelectedCity(city);
    setStep("neighborhood");
  };

  const handleNeighborhoodClick = (neighborhood: string) => {
    if (selectedState && selectedCity) {
      setLocation({
        state: selectedState.nome,
        stateCode: selectedState.sigla,
        city: selectedCity.nome,
        cityCode: selectedCity.id.toString(),
        neighborhood: neighborhood,
      });
      setOpen(false);
      setStep("state");
      setSelectedState(null);
      setSelectedCity(null);
      toast({
        title: "Localização definida!",
        description: `${neighborhood}, ${selectedCity.nome} - ${selectedState.sigla}`,
      });
    }
  };

  const handleBack = () => {
    if (step === "neighborhood") {
      setStep("city");
      setSelectedCity(null);
    } else if (step === "city") {
      setStep("state");
      setSelectedState(null);
      setCities([]);
    }
  };

  const getNeighborhoods = () => {
    if (selectedCity) {
      return neighborhoods[selectedCity.nome] || neighborhoods["default"];
    }
    return neighborhoods["default"];
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="sm"
        className="gap-2 bg-primary-dark text-white border-white/20 hover:bg-primary-dark/80"
      >
        <MapPin className="h-4 w-4" />
        <span className="hidden md:inline">
          {location.neighborhood && location.city
            ? `${location.neighborhood}, ${location.city} - ${location.stateCode}`
            : location.city && location.stateCode
            ? `${location.city} - ${location.stateCode}`
            : "Escolher localização"}
        </span>
        <span className="md:hidden">Localização</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Escolha sua localização
            </DialogTitle>
            <DialogDescription>
              Selecione seu estado, cidade e bairro para encontrar profissionais próximos a você
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* States */}
            {step === "state" && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Selecione seu Estado:</h3>
                {loadingStates ? (
                  <p className="text-center text-muted-foreground py-8">Carregando estados...</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[400px] overflow-y-auto">
                    {states.map((state) => (
                      <Button
                        key={state.id}
                        onClick={() => handleStateClick(state)}
                        variant="secondary"
                        className="justify-between h-auto py-3"
                      >
                        <span>{state.nome}</span>
                        <ChevronRight className="h-4 w-4 ml-2 flex-shrink-0" />
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Cities */}
            {step === "city" && selectedState && (
              <div>
                <Button onClick={handleBack} variant="ghost" size="sm" className="mb-3">
                  ← Voltar para Estados
                </Button>
                <h3 className="text-lg font-semibold mb-3">
                  Cidades em {selectedState.nome}:
                </h3>
                {loadingCities ? (
                  <p className="text-center text-muted-foreground py-8">Carregando cidades...</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
                    {cities.map((city) => (
                      <Button
                        key={city.id}
                        onClick={() => handleCityClick(city)}
                        variant="secondary"
                        className="justify-between h-auto py-3"
                      >
                        <span>{city.nome}</span>
                        <ChevronRight className="h-4 w-4 ml-2 flex-shrink-0" />
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Neighborhoods */}
            {step === "neighborhood" && selectedCity && (
              <div>
                <Button onClick={handleBack} variant="ghost" size="sm" className="mb-3">
                  ← Voltar para Cidades
                </Button>
                <h3 className="text-lg font-semibold mb-3">
                  Bairros em {selectedCity.nome}:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
                  {getNeighborhoods().map((neighborhood) => (
                    <Button
                      key={neighborhood}
                      onClick={() => handleNeighborhoodClick(neighborhood)}
                      variant="secondary"
                      className="justify-between h-auto py-3"
                    >
                      <span>{neighborhood}</span>
                      <ChevronRight className="h-4 w-4 ml-2 flex-shrink-0" />
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocationSelector;
