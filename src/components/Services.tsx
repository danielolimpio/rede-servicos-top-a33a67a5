import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import iceMaker from "@/assets/ice-maker.jpg";
import stove from "@/assets/stove.jpg";
import microwave from "@/assets/microwave.jpg";
import washer from "@/assets/washer.jpg";
import refrigerator from "@/assets/refrigerator.jpg";
import rangeHood from "@/assets/range-hood.jpg";
import iron from "@/assets/iron.jpg";
import airConditioner from "@/assets/air-conditioner.jpg";
import tv from "@/assets/tv.jpg";
import computer from "@/assets/computer.jpg";
import blender from "@/assets/blender.jpg";

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
    {
      title: "Conserto de Ferro Elétrico",
      slug: "conserto-de-ferro-eletrico",
      image: iron,
    },
    {
      title: "Instalação de Ar Condicionado",
      slug: "instalacao-de-ar-condicionado",
      image: airConditioner,
    },
    {
      title: "Conserto de TV",
      slug: "conserto-de-tv",
      image: tv,
    },
    {
      title: "Conserto de Computador",
      slug: "conserto-de-computador",
      image: computer,
    },
    {
      title: "Conserto de Liquidificador",
      slug: "conserto-de-liquidificador",
      image: blender,
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
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full mb-8"
          >
            <CarouselContent>
              {services.map((service, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
                  <Link
                    to={`/servicos/${service.slug}`}
                    className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-xl transition-shadow block h-full"
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>

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
