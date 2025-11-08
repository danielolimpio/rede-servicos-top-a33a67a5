import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-technician.jpg";

const Hero = () => {
  return (
    <section className="bg-background py-16 px-4">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl font-bold text-foreground mb-4 leading-tight">
            Profissional. Amigável. Cortês.
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            O Servicolocal está pronto para ajudar com todas as suas necessidades de conserto e serviços locais.
          </p>
          <Button size="lg" variant="secondary" className="rounded-full px-8">
            PEDIR DIAGNÓSTICO
          </Button>

          {/* Carousel Dots */}
          <div className="flex gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-muted"></div>
            <div className="w-2 h-2 rounded-full bg-muted"></div>
            <div className="w-2 h-2 rounded-full bg-muted"></div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-end">
          <img
            src={heroImage}
            alt="Técnico profissional"
            className="w-full max-w-md h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
