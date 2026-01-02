import { Link } from "react-router-dom";
import { categories } from "@/data/categories";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CategoriesCarousel = () => {
  return (
    <section className="py-12 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Categorias de Serviços
        </h2>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <CarouselItem key={category.id} className="pl-2 basis-[75%] sm:basis-1/2">
                    <Link to={`/categoria/${category.slug}`}>
                      <Card className="p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group h-full">
                        <div className="flex flex-col items-center text-center gap-3">
                          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-base mb-1">{category.name}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2 bg-background shadow-md" />
            <CarouselNext className="right-0 translate-x-1/2 bg-background shadow-md" />
          </Carousel>
          
          {/* Swipe hint */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            ← Deslize para ver mais →
          </p>
        </div>

        {/* Desktop/Tablet Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.id} to={`/categoria/${category.slug}`}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group h-full">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesCarousel;
