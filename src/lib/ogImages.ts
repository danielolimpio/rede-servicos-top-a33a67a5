// Mapeamento de slugs de serviço para imagens og:image 1216x640
export const serviceOgImages: Record<string, string> = {
  "conserto-de-geladeira": "/og-geladeira.jpg",
  geladeira: "/og-geladeira.jpg",
  "conserto-de-fogao": "/og-fogao.jpg",
  fogao: "/og-fogao.jpg",
  "conserto-de-maquina-de-lavar": "/og-maquina-lavar.jpg",
  "maquina-de-lavar": "/og-maquina-lavar.jpg",
  "conserto-de-microondas": "/og-microondas.jpg",
  microondas: "/og-microondas.jpg",
  "conserto-de-coifa": "/og-coifa.jpg",
  coifa: "/og-coifa.jpg",
  "pecas-de-eletrodomesticos": "/og-pecas.jpg",
};

export const getServiceOgImage = (slug?: string): string => {
  if (!slug) return "/og-services.jpg";
  return serviceOgImages[slug] ?? "/og-services.jpg";
};
