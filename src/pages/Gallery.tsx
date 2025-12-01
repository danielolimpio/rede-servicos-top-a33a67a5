import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { X } from "lucide-react";
import refrigerator from "@/assets/refrigerator.jpg";
import washer from "@/assets/washer.jpg";
import airConditioner from "@/assets/air-conditioner.jpg";
import stove from "@/assets/stove.jpg";
import microwave from "@/assets/microwave.jpg";
import tv from "@/assets/tv.jpg";
import blender from "@/assets/blender.jpg";
import computer from "@/assets/computer.jpg";
import iron from "@/assets/iron.jpg";
import iceMaker from "@/assets/ice-maker.jpg";
import rangeHood from "@/assets/range-hood.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: refrigerator, title: "Reparo de Geladeira", category: "Refrigeração" },
    { src: washer, title: "Manutenção de Máquina de Lavar", category: "Linha Branca" },
    { src: airConditioner, title: "Instalação de Ar Condicionado", category: "Climatização" },
    { src: stove, title: "Conserto de Fogão", category: "Cozinha" },
    { src: microwave, title: "Reparo de Micro-ondas", category: "Cozinha" },
    { src: tv, title: "Conserto de TV", category: "Eletrônicos" },
    { src: blender, title: "Manutenção de Liquidificador", category: "Pequenos Eletros" },
    { src: computer, title: "Reparo de Computador", category: "Informática" },
    { src: iron, title: "Conserto de Ferro de Passar", category: "Pequenos Eletros" },
    { src: iceMaker, title: "Instalação de Máquina de Gelo", category: "Refrigeração" },
    { src: rangeHood, title: "Manutenção de Coifa", category: "Cozinha" },
    { src: refrigerator, title: "Troca de Peças", category: "Manutenção" },
  ];

  const categories = ["Todos", ...Array.from(new Set(images.map(img => img.category)))];
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredImages = activeCategory === "Todos" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Galeria de Serviços
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
            Confira os trabalhos realizados pelos nossos profissionais parceiros. Qualidade e excelência em cada serviço.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 bg-background border-b border-border sticky top-0 z-10 backdrop-blur-sm bg-background/95">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-primary rounded-full text-xs text-primary-foreground mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <img
            src={selectedImage}
            alt="Imagem ampliada"
            className="max-w-full max-h-full object-contain rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
