import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import iceMaker from "@/assets/ice-maker.jpg";

const ServiceDetail = () => {
  const { slug } = useParams();
  
  const services = [
    { title: "Conserto de Geladeira", slug: "conserto-de-geladeira", description: "Especialistas em manutenção e reparo de refrigeradores de todas as marcas." },
    { title: "Conserto de Fogão", slug: "conserto-de-fogao", description: "Reparo de fogões e cooktops elétricos e a gás." },
    { title: "Peças de Eletrodomésticos", slug: "pecas-de-eletrodomesticos", description: "Fornecemos peças originais e compatíveis para todos os eletrodomésticos." },
    { title: "Conserto de Microondas", slug: "conserto-de-microondas", description: "Especialistas em micro-ondas de todas as marcas." },
    { title: "Conserto de Máquina de Lavar", slug: "conserto-de-maquina-de-lavar", description: "Técnicos especializados em lavadoras e secadoras." },
    { title: "Conserto de Coifa", slug: "conserto-de-coifa", description: "Manutenção e reparo de coifas e depuradores." },
  ];

  const currentService = services.find(s => s.slug === slug) || services[0];

  const parts = [
    "Módulo de controle",
    "Motor ejetor",
    "Engrenagem ejetora",
    "Tubulação de alimentação",
    "Válvula de alimentação",
    "Termostato",
    "Válvula de entrada de água",
    "Interruptor de entrada de água",
    "Aquecedor do molde de gelo",
  ];

  const manufacturers = ["ARISTON", "Electrolux", "INDESIT", "SIEMENS"];

  return (
    <div className="min-h-screen">
      <SEO 
        title={`${currentService.title} - Assistência Técnica Especializada`}
        description={`${currentService.description} Orçamento grátis, atendimento rápido e peças originais. Encontre técnicos especializados na sua região.`}
        canonical={`/servicos/${currentService.slug}`}
        keywords={`${currentService.title.toLowerCase()}, assistência técnica, reparo, manutenção, técnico especializado, peças originais`}
      />
      <Header />

      <main className="py-8">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Serviços</span>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-bold text-foreground mb-4">Serviços</h3>
                <ul className="space-y-2">
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link
                        to={`/servicos/${service.slug}`}
                        className="text-secondary hover:underline text-sm block"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-primary text-primary-foreground rounded-lg p-8 mb-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={iceMaker}
                    alt={currentService.title}
                    className="w-48 h-48 object-contain"
                  />
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-4">{currentService.title}</h1>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <Button variant="secondary" size="lg" className="rounded-full">
                        PEDIR ORÇAMENTO GRÁTIS
                      </Button>
                      <p className="text-sm">ou ligue para <strong>(11) 1234-5678</strong></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-8 border border-border mb-8">
                <p className="text-muted-foreground mb-6">
                  Geladeiras são eletrodomésticos essenciais que são comumente encontrados em residências, 
                  aqueles que são manualmente instalados em uma geladeira e aqueles que estão integrados 
                  para produzir e armazenar gelo. A função de uma geladeira é bastante direta: ela transforma 
                  água em gelo. Sua função secundária é armazenar o gelo em cubos ou blocos até que estejam 
                  prontos para serem usados. A maioria de nossas residências prefere unidades geladeiras que 
                  possuem geladeiras. Modelos que não estão equipados com uma geladeira podem estar essencialmente 
                  desatualizados, adicionando uma geladeira que são então integradas para eficiência e funcionamento ideal.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">Peças Comuns:</h3>
                <ul className="space-y-2 mb-6">
                  {parts.map((part, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <ChevronRight className="h-4 w-4 text-secondary" />
                      {part}
                    </li>
                  ))}
                </ul>

                <p className="text-muted-foreground mb-6">
                  Todas essas peças precisam ser avaliadas uma a uma para que nossos especialistas 
                  prestem serviço profissional de reparo. Nossa empresa apenas torna isso possível 
                  fornecendo peças de qualidade, peças de reposição genuínas e muito mais acessíveis. 
                  Podemos entregar serviço imediato, qualquer que seja a marca e modelo da sua geladeira. 
                  Nossos técnicos usam apenas equipamentos de ponta e ferramentas ao fornecer reparo de 
                  geladeira em casa. Isso garante que as peças sejam feitas de maneira eficiente e que 
                  sua geladeira e refrigerador sejam garantidos para estarem seguros de maiores danos ou avarias. 
                  Melhor de tudo, essas peças são inexpensivas apesar de sua durabilidade e confiabilidade. 
                  Peças de reposição e reparos são muito acessíveis, você não precisa se preocupar em gastar 
                  além do seu orçamento.
                </p>

                <div className="flex flex-wrap gap-8 items-center justify-center py-6">
                  {manufacturers.map((brand, index) => (
                    <div key={index} className="text-xl font-bold text-muted-foreground">
                      {brand}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card rounded-lg p-8 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Entre em Contato</h2>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input placeholder="Nome" className="bg-muted border-border" />
                    </div>
                    <div>
                      <Input placeholder="Sobrenome" className="bg-muted border-border" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input type="email" placeholder="E-mail" className="bg-muted border-border" />
                    </div>
                    <div>
                      <Input type="tel" placeholder="Telefone" className="bg-muted border-border" />
                    </div>
                  </div>
                  <div>
                    <Textarea
                      placeholder="Mensagem"
                      rows={5}
                      className="bg-muted border-border resize-none"
                    />
                  </div>
                  <Button variant="secondary" size="lg" className="rounded-full px-8">
                    ENVIAR MENSAGEM
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
