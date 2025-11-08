import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      image: heroSlide1,
      title: "Profissional. Amigável. Cortês.",
      description: "O Servicolocal está pronto para ajudar com todas as suas necessidades de conserto e serviços locais.",
    },
    {
      image: heroSlide2,
      title: "Técnicos Especializados.",
      description: "Nossa equipe possui anos de experiência em reparos de todos os tipos de eletrodomésticos.",
    },
    {
      image: heroSlide3,
      title: "Atendimento Rápido.",
      description: "Diagnóstico gratuito e atendimento em até 24 horas para sua comodidade.",
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="bg-background py-16 px-4 overflow-hidden">
      <div className="container mx-auto">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left Content */}
                  <div>
                    <h1 className="text-5xl font-bold text-foreground mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-6">
                      {slide.description}
                    </p>
                    <Button size="lg" variant="secondary" className="rounded-full px-8">
                      PEDIR DIAGNÓSTICO
                    </Button>

                    {/* Carousel Dots */}
                    <div className="flex gap-2 mt-8">
                      {slides.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => api?.scrollTo(dotIndex)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            current === dotIndex ? "bg-primary" : "bg-muted"
                          }`}
                          aria-label={`Ir para slide ${dotIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="flex justify-end">
                    <img
                      src={slide.image}
                      alt={`Técnico profissional ${index + 1}`}
                      className="w-full max-w-2xl h-auto object-cover rounded-lg"
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;
