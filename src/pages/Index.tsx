import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CategoriesGrid from "@/components/CategoriesGrid";
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
        <CategoriesGrid />
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
