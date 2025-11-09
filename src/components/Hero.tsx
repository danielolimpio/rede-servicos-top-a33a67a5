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

    // Auto-play every 5 seconds
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="bg-background overflow-hidden">
      <div className="w-full">
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
                <div 
                  className="relative w-full h-[600px] bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  
                  {/* Conteúdo */}
                  <div className="container mx-auto px-4 h-full relative z-10">
                    <div className="flex items-center h-full max-w-xl">
                      <div>
                        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
                          {slide.title}
                        </h1>
                        <p className="text-lg text-foreground/90 mb-6 font-light">
                          {slide.description}
                        </p>
                        <Button size="lg" variant="secondary" className="rounded-full px-8 font-medium">
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
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 z-20" />
          <CarouselNext className="right-4 z-20" />
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;
