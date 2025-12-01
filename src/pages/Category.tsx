import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories } from "@/data/categories";
import { mockProfessionals } from "@/data/professionals";
import { Star, MapPin, SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Category = () => {
  const { slug } = useParams();
  const category = categories.find((cat) => cat.slug === slug);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("distance");
  const [minRating, setMinRating] = useState("0");

  if (!category) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-3xl font-bold">Categoria não encontrada</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComponent = category.icon;

  // Filter professionals by category
  const filteredProfessionals = mockProfessionals.filter((prof) => {
    const categoryMatch = prof.category === category.name;
    const subcategoryMatch =
      selectedSubcategories.length === 0 ||
      prof.subcategories.some(sub => selectedSubcategories.includes(sub));
    const ratingMatch = prof.rating >= parseFloat(minRating);
    return categoryMatch && subcategoryMatch && ratingMatch;
  });

  // Sort professionals
  const sortedProfessionals = [...filteredProfessionals].sort((a, b) => {
    if (sortBy === "distance") {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const toggleSubcategory = (subcategoryName: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategoryName)
        ? prev.filter((s) => s !== subcategoryName)
        : [...prev, subcategoryName]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Subcategories */}
      <div>
        <h3 className="font-semibold mb-3">Subcategorias</h3>
        <div className="space-y-2">
          {category.subcategories.map((sub) => (
            <div key={sub.id} className="flex items-center space-x-2">
              <Checkbox
                id={sub.id}
                checked={selectedSubcategories.includes(sub.name)}
                onCheckedChange={() => toggleSubcategory(sub.name)}
              />
              <Label htmlFor={sub.id} className="cursor-pointer">
                {sub.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <h3 className="font-semibold mb-3">Avaliação Mínima</h3>
        <Select value={minRating} onValueChange={setMinRating}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Todas</SelectItem>
            <SelectItem value="3">⭐ 3.0+</SelectItem>
            <SelectItem value="4">⭐ 4.0+</SelectItem>
            <SelectItem value="4.5">⭐ 4.5+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="font-semibold mb-3">Ordenar por</h3>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Mais próximo</SelectItem>
            <SelectItem value="rating">Melhor avaliado</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Category Header */}
        <section className="bg-primary text-primary-foreground py-12 px-4">
          <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <IconComponent className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">{category.name}</h1>
                <p className="text-primary-foreground/80 mt-2">
                  {category.description}
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/90">
              {sortedProfessionals.length} profissionais encontrados
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar - Desktop */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <Card className="p-6 sticky top-4">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filtros
                  </h2>
                  <FilterContent />
                </Card>
              </aside>

              {/* Mobile Filter Button */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filtros e Ordenação
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Professionals List */}
              <div className="flex-1">
                <div className="grid grid-cols-1 gap-6">
                  {sortedProfessionals.map((professional) => (
                    <Card key={professional.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex gap-6">
                        <img
                          src={professional.photo}
                          alt={professional.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-bold mb-1">
                                {professional.name}
                              </h3>
                              <p className="text-muted-foreground">
                                {professional.category} • {professional.subcategories.join(", ")}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              <span className="font-bold">{professional.rating}</span>
                              <span className="text-muted-foreground text-sm">
                                ({professional.reviewCount})
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>{professional.distance} de você</span>
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1" asChild>
                              <a href={`/profissional/${professional.slug}`}>Ver perfil</a>
                            </Button>
                            <Button variant="outline" className="flex-1">
                              Entrar em contato
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                {sortedProfessionals.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Nenhum profissional encontrado com os filtros selecionados.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Category;
