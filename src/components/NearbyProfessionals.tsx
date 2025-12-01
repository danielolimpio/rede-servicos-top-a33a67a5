import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockProfessionals } from "@/data/professionals";
import { useLocation } from "@/contexts/LocationContext";

const NearbyProfessionals = () => {
  const { location } = useLocation();

  // Filter professionals by location if available
  const filteredProfessionals = location.city
    ? mockProfessionals.filter(
        (prof) =>
          prof.location.city === location.city &&
          (!location.neighborhood || prof.location.neighborhood === location.neighborhood)
      )
    : mockProfessionals.slice(0, 6);

  const displayProfessionals = filteredProfessionals.slice(0, 6);

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Profissionais Próximos</h2>
          <p className="text-muted-foreground">
            {location.neighborhood && location.city
              ? `Encontrados em ${location.neighborhood}, ${location.city} - ${location.stateCode}`
              : location.city
              ? `Encontrados em ${location.city} - ${location.stateCode}`
              : "Selecione sua localização para ver profissionais próximos"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProfessionals.map((professional) => (
            <Card key={professional.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-4">
                <img
                  src={professional.photo}
                  alt={professional.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{professional.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {professional.category}
                  </p>
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{professional.rating}</span>
                      <span className="text-muted-foreground">
                        ({professional.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{professional.distance}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full" asChild>
                    <Link to={`/profissional/${professional.slug}`}>
                      Ver perfil
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyProfessionals;
