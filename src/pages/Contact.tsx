import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Entraremos em contato em breve.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      content: ["Av. Julia Freire, 1200 - Expedicionários", "João Pessoa - PB, CEP 58.041-000"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Telefone",
      content: ["(12) 98251-9116", "Seg-Sex: 9h às 18h"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Mail,
      title: "Email",
      content: ["contato@servicolocal.com.br", "suporte@servicolocal.com.br"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      content: ["Seg-Sex: 9h às 18h", "Sáb-Dom: 10h às 17h"],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Entre em Contato
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
            Estamos aqui para ajudar você. Envie sua mensagem e responderemos o mais breve possível.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="group bg-card rounded-2xl p-6 text-center shadow-lg border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${info.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <info.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{info.title}</h3>
                {info.content.map((line, i) => (
                  <p key={i} className="text-sm text-muted-foreground">{line}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h2 className="text-3xl font-bold text-foreground mb-6">Envie sua Mensagem</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Seu nome"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                    Tipo de Serviço
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    <option value="">Selecione um serviço</option>
                    <option value="geladeira">Geladeira</option>
                    <option value="maquina-lavar">Máquina de Lavar</option>
                    <option value="ar-condicionado">Ar Condicionado</option>
                    <option value="fogao">Fogão</option>
                    <option value="microondas">Micro-ondas</option>
                    <option value="tv">TV</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    placeholder="Descreva seu problema ou dúvida..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full group">
                  Enviar Mensagem
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.0471929485917!2d-34.86265258523654!3d-7.133647594838896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ace839019311d1%3A0x8e1d1c9d6f8f4c5e!2sAv.%20J%C3%BAlia%20Freire%2C%201200%20-%20Torre%2C%20Jo%C3%A3o%20Pessoa%20-%20PB%2C%2058040-040!5e0!3m2!1spt-BR!2sbr!4v1647456789012!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Serviço Local"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Perguntas Frequentes</h2>
          
          <div className="space-y-4">
            {[
              {
                question: "Qual o prazo de resposta?",
                answer: "Respondemos todas as mensagens em até 24 horas úteis."
              },
              {
                question: "Vocês atendem em todo o Brasil?",
                answer: "Sim! Nossa plataforma conecta você a profissionais em todo o território nacional."
              },
              {
                question: "Como funciona o agendamento?",
                answer: "Após o contato, você será conectado diretamente com um profissional da sua região para agendar o serviço."
              },
              {
                question: "Há garantia nos serviços?",
                answer: "Cada profissional define sua própria política de garantia. Recomendamos verificar antes da contratação."
              }
            ].map((faq, index) => (
              <details 
                key={index}
                className="group bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <summary className="font-bold text-foreground cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
