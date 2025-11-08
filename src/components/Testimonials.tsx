const Testimonials = () => {
  const testimonials = [
    {
      name: "William Wallace",
      role: "Gerente",
      text: "Recomendo fortemente este centro de serviços. O melhor atendimento que já recebi de uma empresa de reparos. Se precisar novamente, vou contratar eles.",
      avatar: "WW",
    },
    {
      name: "Jennifer Allen",
      role: "Designer",
      text: "Profissionais extremamente competentes e prestativos. Resolveram meu problema rapidamente e com preço justo. Super recomendo!",
      avatar: "JA",
    },
    {
      name: "Richard Wallace",
      role: "Desenvolvedor",
      text: "Serviço de primeira qualidade. Técnicos muito educados e eficientes. Meu refrigerador ficou funcionando perfeitamente.",
      avatar: "RW",
    },
    {
      name: "Jennifer West",
      role: "Arquiteta",
      text: "Atendimento impecável do início ao fim. Resolveram o problema da minha máquina de lavar em tempo recorde. Muito satisfeita!",
      avatar: "JW",
    },
  ];

  return (
    <section className="bg-background py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Depoimentos de Clientes Felizes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-secondary"></div>
          <div className="w-2 h-2 rounded-full bg-muted"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
