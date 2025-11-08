import { ThumbsUp, Calendar, Users, Wrench } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: ThumbsUp,
      value: "100%",
      label: "Garantia de Satisfação",
    },
    {
      icon: Calendar,
      value: "10",
      label: "Anos no Mercado",
    },
    {
      icon: Users,
      value: "2.954",
      label: "Clientes Felizes",
    },
    {
      icon: Wrench,
      value: "3.597",
      label: "Equipamentos Reparados",
    },
  ];

  return (
    <section className="bg-background py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-secondary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
