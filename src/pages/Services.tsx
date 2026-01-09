import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { 
  Refrigerator, 
  Waves, 
  Wind, 
  Zap, 
  Monitor, 
  Blend, 
  ChefHat,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Conserto de Geladeiras",
      slug: "geladeira",
      description: "Especialistas em manutenção e reparo de refrigeradores de todas as marcas. Diagnóstico preciso e solução rápida.",
      icon: Refrigerator,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Reparo de Máquinas de Lavar",
      slug: "maquina-de-lavar",
      description: "Técnicos especializados em lavadoras e secadoras. Manutenção preventiva e corretiva com garantia.",
      icon: Waves,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Manutenção de Ar Condicionado",
      slug: "ar-condicionado",
      description: "Instalação, limpeza e reparo de sistemas de climatização. Atendimento residencial e comercial.",
      icon: Wind,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Conserto de Fogões",
      slug: "fogao",
      description: "Reparo de fogões e cooktops elétricos e a gás. Troca de componentes e manutenção completa.",
      icon: ChefHat,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Reparo de Micro-ondas",
      slug: "microondas",
      description: "Especialistas em micro-ondas de todas as marcas. Conserto rápido e eficiente com peças originais.",
      icon: Zap,
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 6,
      title: "Conserto de TVs",
      slug: "tv",
      description: "Manutenção de TVs LED, LCD, Plasma e Smart TVs. Reparo de tela, placa e sistema.",
      icon: Monitor,
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: 7,
      title: "Reparo de Liquidificadores",
      slug: "liquidificador",
      description: "Conserto e manutenção de liquidificadores e processadores. Troca de peças e motores.",
      icon: Blend,
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 8,
      title: "Outros Eletrodomésticos",
      slug: "outros",
      description: "Atendemos diversos tipos de eletrodomésticos. Consulte-nos para mais informações.",
      icon: Sparkles,
      color: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Serviços de Conserto de Eletrodomésticos"
        description="Conheça todos os serviços de conserto e manutenção de eletrodomésticos: geladeira, máquina de lavar, ar condicionado, fogão, micro-ondas, TV e mais. Profissionais qualificados."
        canonical="/servicos"
        keywords="serviços de conserto, manutenção de eletrodomésticos, reparo de geladeira, conserto de fogão, assistência técnica, técnicos especializados"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Nossos Serviços
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-fade-in">
              Soluções completas para todos os seus eletrodomésticos. Profissionais qualificados prontos para atender você.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                {/* CTA */}
                <Link to={`/servicos/${service.slug}`}>
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  >
                    Saiba Mais
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary-dark">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Precisa de Ajuda com Seu Eletrodoméstico?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Nossa equipe de especialistas está pronta para resolver seu problema de forma rápida e eficiente.
          </p>
          <Link to="/contato">
            <Button size="lg" variant="secondary" className="rounded-full text-lg px-8">
              Entre em Contato
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
