import circuitBg from "@/assets/circuit-background.jpg";

const Manufacturers = () => {
  const manufacturers = [
    { name: "INDESIT", logo: "INDESIT" },
    { name: "SIEMENS", logo: "SIEMENS" },
    { name: "Electrolux", logo: "Electrolux" },
    { name: "BOSCH", logo: "BOSCH" },
    { name: "ARISTON", logo: "ARISTON" },
  ];

  return (
    <section
      className="py-16 px-4 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${circuitBg})` }}
    >
      <div className="absolute inset-0 bg-foreground/70"></div>
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-background">Fabricantes</h2>
        <div className="flex flex-wrap items-center justify-center gap-12">
          {manufacturers.map((manufacturer, index) => (
            <div key={index} className="text-2xl font-bold text-background/80">
              {manufacturer.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manufacturers;
