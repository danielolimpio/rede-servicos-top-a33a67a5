import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import manufacturersBg from "@/assets/manufacturers-bg.jpg";
import lgLogo from "@/assets/brands/lg.png";
import samsungLogo from "@/assets/brands/samsung.png";
import mideaLogo from "@/assets/brands/midea.png";
import consulLogo from "@/assets/brands/consul.png";
import brastempLogo from "@/assets/brands/brastemp.png";
import continentalLogo from "@/assets/brands/continental.png";
import boschLogo from "@/assets/brands/bosch.png";
import siemensLogo from "@/assets/brands/siemens.png";
import electroluxLogo from "@/assets/brands/electrolux.png";

const Manufacturers = () => {
  const manufacturers = [
    { name: "LG", logo: lgLogo },
    { name: "Samsung", logo: samsungLogo },
    { name: "Midea", logo: mideaLogo },
    { name: "Consul", logo: consulLogo },
    { name: "Brastemp", logo: brastempLogo },
    { name: "Continental", logo: continentalLogo },
    { name: "Bosch", logo: boschLogo },
    { name: "Siemens", logo: siemensLogo },
    { name: "Electrolux", logo: electroluxLogo },
  ];

  return (
    <section
      className="py-16 px-4 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${manufacturersBg})` }}
    >
      <div className="absolute inset-0 bg-foreground/80"></div>
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-background">Fabricantes</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {manufacturers.map((manufacturer, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                <div className="flex items-center justify-center p-6 bg-background/90 rounded-lg h-24">
                  <img
                    src={manufacturer.logo}
                    alt={manufacturer.name}
                    className="max-h-16 max-w-full object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Manufacturers;
