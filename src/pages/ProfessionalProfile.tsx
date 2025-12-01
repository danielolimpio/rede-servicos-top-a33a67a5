import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockProfessionals } from "@/data/professionals";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  CheckCircle2,
  Award,
  Shield,
  ChevronLeft
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ProfessionalProfile = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const professional = mockProfessionals.find(p => p.slug === slug);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  if (!professional) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Profissional não encontrado</h1>
          <Link to="/">
            <Button>Voltar para a página inicial</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá ${professional.name}, vi seu perfil no Serviço Local e gostaria de solicitar um orçamento.`);
    window.open(`https://wa.me/${professional.whatsapp}?text=${message}`, '_blank');
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui entraria a lógica de envio do formulário
    toast({
      title: "Mensagem enviada!",
      description: "O profissional receberá sua mensagem em breve.",
    });
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  const averageRating = professional.rating;
  const totalReviews = professional.reviewCount;

  return (
    <>
      <Helmet>
        <title>{professional.name} - {professional.category} em {professional.location.city} | Serviço Local</title>
        <meta name="description" content={`${professional.name} - ${professional.description.substring(0, 155)}. Atende em ${professional.location.neighborhood}, ${professional.location.city}. ${professional.experienceYears} anos de experiência.`} />
        <meta name="keywords" content={`${professional.name}, ${professional.category}, ${professional.subcategories.join(', ')}, ${professional.location.city}, ${professional.location.neighborhood}`} />
        <meta property="og:title" content={`${professional.name} - ${professional.category}`} />
        <meta property="og:description" content={professional.description} />
        <meta property="og:image" content={professional.photo} />
        <link rel="canonical" href={`https://servicolocal.com/profissional/${professional.slug}`} />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link to="/" className="text-muted-foreground hover:text-primary">Início</Link>
            <span className="text-muted-foreground">/</span>
            <Link to={`/categoria/${professional.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="text-muted-foreground hover:text-primary">
              {professional.category}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{professional.name}</span>
          </nav>

          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to={`/categoria/${professional.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar para {professional.category}
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header do Perfil */}
              <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img 
                    src={professional.photo} 
                    alt={professional.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{professional.name}</h1>
                        <p className="text-muted-foreground">{professional.category}</p>
                      </div>
                      {professional.verified && (
                        <Badge variant="secondary" className="gap-1">
                          <Shield className="h-3 w-3" />
                          Verificado
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{averageRating.toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground">({totalReviews} avaliações)</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{professional.experienceYears} anos de experiência</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">
                        {professional.location.neighborhood}, {professional.location.city} - {professional.location.state}
                      </span>
                      <span className="text-sm">• Raio de {professional.serviceRadius}km</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {professional.subcategories.map((sub) => (
                        <Badge key={sub} variant="outline">{sub}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Sobre */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Sobre</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {professional.description}
                </p>
                
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Especialidades
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {professional.specialties.map((specialty) => (
                    <div key={specialty} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{specialty}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Galeria de Trabalhos */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Portfólio</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {professional.workPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Trabalho ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                    />
                  ))}
                </div>
              </Card>

              {/* Avaliações */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Avaliações dos Clientes</h2>
                
                <div className="space-y-6">
                  {professional.reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.clientPhoto}
                          alt={review.clientName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold">{review.clientName}</p>
                              <p className="text-sm text-muted-foreground">{review.service}</p>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar de Contato */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
                {/* Botões de Contato Rápido */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Entre em Contato</h3>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full gap-2" 
                      size="lg"
                      onClick={handleWhatsApp}
                    >
                      <MessageCircle className="h-5 w-5" />
                      WhatsApp
                    </Button>

                    <Button 
                      variant="outline" 
                      className="w-full gap-2"
                      asChild
                    >
                      <a href={`tel:${professional.phone}`}>
                        <Phone className="h-5 w-5" />
                        {professional.phone}
                      </a>
                    </Button>

                    <Button 
                      variant="outline" 
                      className="w-full gap-2"
                      asChild
                    >
                      <a href={`mailto:${professional.email}`}>
                        <Mail className="h-5 w-5" />
                        E-mail
                      </a>
                    </Button>
                  </div>
                </Card>

                {/* Formulário de Contato */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Solicite um Orçamento</h3>
                  
                  <form onSubmit={handleSubmitContact} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        placeholder="Descreva o serviço que você precisa..."
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Enviar Mensagem
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProfessionalProfile;
