import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import iceMaker from "@/assets/ice-maker.jpg";
import stove from "@/assets/stove.jpg";
import microwave from "@/assets/microwave.jpg";
import washer from "@/assets/washer.jpg";
import refrigerator from "@/assets/refrigerator.jpg";
import rangeHood from "@/assets/range-hood.jpg";

const Services = () => {
  const services = [
    {
      title: "Conserto de Máquina de Gelo",
      slug: "conserto-de-maquina-de-gelo",
      image: iceMaker,
    },
    {
      title: "Conserto de Fogão",
      slug: "conserto-de-fogao",
      image: stove,
    },
    {
      title: "Conserto de Microondas",
      slug: "conserto-de-microondas",
      image: microwave,
    },
    {
      title: "Conserto de Máquina de Lavar",
      slug: "conserto-de-maquina-de-lavar",
      image: washer,
    },
    {
      title: "Conserto de Refrigerador",
      slug: "conserto-de-refrigerador",
      image: refrigerator,
    },
    {
      title: "Conserto de Coifa",
      slug: "conserto-de-coifa",
      image: rangeHood,
    },
  ];

  return (
    <section>
      {/* Blue header section */}
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-3">Nossos Serviços</h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto">
            Você pode ter certeza de que os reparos são realizados apenas com sua aprovação prévia.
          </p>
        </div>
      </div>

      {/* White services section */}
      <div className="bg-background py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            {services.map((service, index) => (
              <Link
                key={index}
                to={`/servicos/${service.slug}`}
                className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-4 flex flex-col items-center">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-32 h-32 object-contain mb-4"
                  />
                  <h3 className="text-sm font-semibold text-primary text-center">{service.title}</h3>
                  <div className="w-12 h-0.5 bg-primary mt-2"></div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="default" className="rounded-full px-8">
              VER TODOS OS SERVIÇOS
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
