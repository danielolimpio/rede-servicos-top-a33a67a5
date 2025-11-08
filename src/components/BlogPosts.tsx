import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const BlogPosts = () => {
  const posts = [
    {
      title: "Como Reparar um Fogão a Gás em Casa",
      date: "26 de maio de 2025",
      excerpt: "Se os queimadores do seu fogão não acendem, você pode resolver o problema seguindo alguns passos simples...",
      tags: ["Reparo", "Fogão"],
      category: "Dicas",
    },
    {
      title: "10 Sinais de que Seu Microondas Precisa de Reparo",
      date: "24 de maio de 2025",
      excerpt: "Ruídos estranhos, aquecimento irregular ou porta com problemas são sinais claros de que seu microondas...",
      tags: ["Microondas", "Manutenção"],
      category: "Guias",
    },
    {
      title: "Guia de Reparo de Geladeira: Problemas Comuns",
      date: "22 de maio de 2025",
      excerpt: "Geladeira não gelando? Vazamento de água? Conheça os problemas mais comuns e suas soluções...",
      tags: ["Geladeira", "Reparo"],
      category: "Dicas",
    },
    {
      title: "Manutenção Preventiva de Eletrodomésticos",
      date: "20 de maio de 2025",
      excerpt: "Aprenda a prolongar a vida útil dos seus eletrodomésticos com manutenção preventiva regular...",
      tags: ["Manutenção", "Dicas"],
      category: "Guias",
    },
    {
      title: "Por Que Contratar um Profissional para Reparos?",
      date: "18 de maio de 2025",
      excerpt: "Descubra por que contar com um técnico qualificado pode economizar tempo e dinheiro a longo prazo...",
      tags: ["Profissional", "Reparo"],
      category: "Informações",
    },
    {
      title: "Como Instalar Corretamente uma Máquina de Lavar",
      date: "15 de maio de 2025",
      excerpt: "Instalação correta previne vazamentos e prolonga a vida útil do equipamento. Veja o passo a passo...",
      tags: ["Instalação", "Máquina de Lavar"],
      category: "Guias",
    },
  ];

  return (
    <section className="bg-muted py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Últimos Artigos do Blog
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {posts.map((post, index) => (
            <article key={index} className="bg-background rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 bg-gradient-to-br from-primary to-secondary"></div>
              <div className="p-6">
                <span className="text-xs font-semibold text-secondary uppercase">{post.category}</span>
                <h3 className="text-lg font-bold text-foreground mt-2 mb-3">{post.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3 w-3" />
                  <span>{post.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="secondary" className="rounded-full px-8">
            VER TODOS OS ARTIGOS
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
