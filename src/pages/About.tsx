import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Award, Users, Clock, ThumbsUp, Target, Heart, Shield } from "lucide-react";
import heroTechnician from "@/assets/hero-technician.jpg";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Confiabilidade",
      description: "Profissionais verificados e qualificados para garantir a segurança dos nossos clientes."
    },
    {
      icon: Heart,
      title: "Comprometimento",
      description: "Dedicação total em cada atendimento, buscando sempre a satisfação do cliente."
    },
    {
      icon: Target,
      title: "Excelência",
      description: "Padrão de qualidade superior em todos os serviços prestados."
    }
  ];

  const stats = [
    { icon: Users, number: "15.000+", label: "Clientes Atendidos" },
    { icon: Award, number: "98%", label: "Satisfação" },
    { icon: Clock, number: "10+", label: "Anos de Experiência" },
    { icon: ThumbsUp, number: "5.000+", label: "Avaliações Positivas" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Sobre Nós - Quem Somos"
        description="Conheça o Serviço Local: a maior plataforma de divulgação de profissionais autônomos em conserto de eletrodomésticos do Brasil. Nossa missão, valores e história."
        canonical="/sobre"
        keywords="sobre serviço local, quem somos, plataforma de técnicos, profissionais de eletrodomésticos, assistência técnica Brasil"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary py-24 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Sobre o Serviço Local
              </h1>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                Somos a maior plataforma de divulgação de profissionais autônomos especializados em conserto e manutenção de eletrodomésticos do Brasil.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Conectamos você aos melhores técnicos da sua região, facilitando o acesso a serviços de qualidade com transparência e confiança.
              </p>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <img 
                src={heroTechnician} 
                alt="Técnico profissional" 
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Nossa Missão</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Facilitar a conexão entre clientes e profissionais qualificados, proporcionando uma plataforma segura, 
              transparente e eficiente para divulgação de serviços de manutenção e reparo de eletrodomésticos.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Acreditamos que todos merecem acesso rápido a profissionais confiáveis, e trabalhamos incansavelmente 
              para tornar esse processo simples, seguro e satisfatório para ambas as partes.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Nossos Valores</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group bg-card rounded-2xl p-8 text-center shadow-lg border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Importante Saber</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                O <strong className="text-foreground">Serviço Local</strong> é uma plataforma de divulgação que conecta clientes a profissionais autônomos independentes. 
                Não prestamos os serviços diretamente e não temos controle sobre a qualidade, execução ou resultados dos trabalhos realizados.
              </p>
              <p>
                Cada profissional cadastrado é responsável pelos seus próprios serviços, preços, prazos e atendimento. 
                Recomendamos sempre verificar as avaliações e referências antes de contratar.
              </p>
              <p>
                Trabalhamos com filtros rigorosos para aceitar apenas profissionais responsáveis e reais em nossa plataforma, 
                mas a relação contratual é estabelecida diretamente entre o cliente e o prestador de serviço.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
