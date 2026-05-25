import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import NearbyProfessionals from "@/components/NearbyProfessionals";
import Manufacturers from "@/components/Manufacturers";
import Testimonials from "@/components/Testimonials";
import BlogPosts from "@/components/BlogPosts";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Conserto de Eletrodomésticos"
        description="Técnicos especializados em conserto de geladeira, fogão, máquina de lavar, micro-ondas e ar na sua região. Orçamento grátis."
        canonical="/"
        keywords="conserto de eletrodomésticos, assistência técnica, reparo de geladeira, conserto de máquina de lavar, manutenção de ar condicionado"
      />
      <Header />
      <main>
        <Hero />
        <Stats />
        <CategoriesCarousel />
        <NearbyProfessionals />
        <Manufacturers />
        <Testimonials />
        <BlogPosts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
