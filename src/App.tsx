import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocationProvider } from "@/contexts/LocationContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import ServiceDetail from "./pages/ServiceDetail";
import Category from "./pages/Category";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProfessionalRegistration from "./pages/ProfessionalRegistration";
import EditProfessional from "./pages/EditProfessional";
import GalleryManagement from "./pages/GalleryManagement";
import AdminProfessionals from "./pages/AdminProfessionals";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LocationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/galeria" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/servicos/:slug" element={<ServiceDetail />} />
              <Route path="/categoria/:slug" element={<Category />} />
              <Route path="/profissional/:slug" element={<ProfessionalProfile />} />
              <Route path="/termos-de-uso" element={<TermsOfUse />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/painel" element={<Dashboard />} />
              <Route path="/painel/cadastro" element={<ProfessionalRegistration />} />
              <Route path="/cadastro" element={<ProfessionalRegistration />} />
              <Route path="/cadastro-profissional" element={<ProfessionalRegistration />} />
              <Route path="/painel/editar" element={<EditProfessional />} />
              <Route path="/painel/galeria" element={<GalleryManagement />} />
              <Route path="/admin/profissionais" element={<AdminProfessionals />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LocationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
