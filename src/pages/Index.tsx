import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import NearbyProfessionals from "@/components/NearbyProfessionals";
import Manufacturers from "@/components/Manufacturers";
import Testimonials from "@/components/Testimonials";
import BlogPosts from "@/components/BlogPosts";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
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
