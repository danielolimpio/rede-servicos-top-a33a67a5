import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import refrigerator from "@/assets/refrigerator.jpg";
import washer from "@/assets/washer.jpg";
import airConditioner from "@/assets/air-conditioner.jpg";

const Blog = () => {
  const featuredPost = {
    id: 1,
    title: "Como Prolongar a Vida Útil do Seu Refrigerador",
    excerpt: "Descubra as melhores práticas de manutenção preventiva para manter sua geladeira funcionando perfeitamente por mais tempo e economizar energia.",
    image: refrigerator,
    author: "Carlos Silva",
    date: "15 de Novembro, 2025",
    readTime: "5 min",
    category: "Manutenção Preventiva"
  };

  const posts = [
    {
      id: 2,
      title: "5 Sinais de que Sua Máquina de Lavar Precisa de Manutenção",
      excerpt: "Identifique problemas comuns antes que se tornem sérios e evite gastos desnecessários com substituições.",
      image: washer,
      author: "Marina Costa",
      date: "10 de Novembro, 2025",
      readTime: "4 min",
      category: "Linha Branca"
    },
    {
      id: 3,
      title: "Economia de Energia: Dicas para Usar o Ar Condicionado",
      excerpt: "Aprenda a usar seu ar condicionado de forma eficiente e reduza sua conta de energia em até 30%.",
      image: airConditioner,
      author: "Roberto Santos",
      date: "8 de Novembro, 2025",
      readTime: "6 min",
      category: "Climatização"
    },
    {
      id: 4,
      title: "Manutenção Preventiva: Economia a Longo Prazo",
      excerpt: "Por que investir em manutenção preventiva é muito mais econômico do que esperar quebrar.",
      image: refrigerator,
      author: "Ana Paula",
      date: "5 de Novembro, 2025",
      readTime: "5 min",
      category: "Dicas"
    },
    {
      id: 5,
      title: "Como Escolher o Técnico Certo para Seu Eletrodoméstico",
      excerpt: "Guia completo com critérios essenciais para escolher um profissional qualificado e confiável.",
      image: washer,
      author: "Pedro Oliveira",
      date: "1 de Novembro, 2025",
      readTime: "7 min",
      category: "Guias"
    },
    {
      id: 6,
      title: "Erros Comuns que Danificam Seus Eletrodomésticos",
      excerpt: "Evite esses erros simples que podem reduzir significativamente a vida útil dos seus aparelhos.",
      image: airConditioner,
      author: "Julia Fernandes",
      date: "28 de Outubro, 2025",
      readTime: "4 min",
      category: "Dicas"
    }
  ];

  const categories = ["Todos", "Manutenção Preventiva", "Linha Branca", "Climatização", "Dicas", "Guias"];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Blog - Dicas e Guias de Manutenção"
        description="Blog do Serviço Local com dicas, guias e informações sobre manutenção e cuidados com seus eletrodomésticos. Aprenda a economizar e prolongar a vida útil dos seus aparelhos."
        canonical="/blog"
        keywords="blog eletrodomésticos, dicas de manutenção, guias de conserto, economia de energia, cuidados com aparelhos"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Blog Serviço Local
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
            Dicas, guias e informações valiosas sobre manutenção e cuidados com seus eletrodomésticos.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 bg-card rounded-3xl overflow-hidden shadow-2xl border border-border hover:shadow-3xl transition-shadow duration-300">
            <div className="relative h-[400px] md:h-auto overflow-hidden group">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  Destaque
                </span>
              </div>
            </div>
            
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 w-fit">
                {featuredPost.category}
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{featuredPost.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
              
              <Button className="w-fit group">
                Ler Artigo Completo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full font-medium bg-card text-foreground border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Artigos Recentes</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article 
                key={post.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      Ler Mais
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary-dark">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Assine Nossa Newsletter
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Receba dicas exclusivas e novidades diretamente no seu email.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-6 py-3 rounded-full border-2 border-white/30 bg-white/20 text-white placeholder:text-white/90 focus:outline-none focus:border-white transition-colors"
            />
            <Button size="lg" variant="secondary" className="rounded-full px-8 whitespace-nowrap">
              Inscrever-se
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
