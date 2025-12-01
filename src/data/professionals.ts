export interface Review {
  id: string;
  clientName: string;
  clientPhoto: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

export interface Professional {
  id: string;
  name: string;
  slug: string;
  photo: string;
  logo?: string;
  cnpj?: string;
  category: string;
  subcategories: string[];
  rating: number;
  reviewCount: number;
  location: {
    state: string;
    city: string;
    neighborhood: string;
  };
  serviceRadius: number;
  distance: string;
  phone: string;
  whatsapp: string;
  email: string;
  description: string;
  specialties: string[];
  workPhotos: string[];
  reviews: Review[];
  experienceYears: number;
  verified: boolean;
}

export const mockProfessionals: Professional[] = [
  {
    id: "1",
    name: "Carlos Silva",
    slug: "carlos-silva-eletrodomesticos-sp",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    category: "Eletrodomésticos & Eletrônicos",
    subcategories: ["Geladeira", "Máquina de Lavar Roupas", "Micro-ondas"],
    rating: 4.8,
    reviewCount: 127,
    location: {
      state: "SP",
      city: "São Paulo",
      neighborhood: "Vila Mariana",
    },
    serviceRadius: 15,
    distance: "1.2 km",
    phone: "(11) 98765-4321",
    whatsapp: "5511987654321",
    email: "carlos.silva@email.com",
    description: "Técnico especializado em eletrodomésticos com mais de 10 anos de experiência. Atendimento rápido e garantia de 90 dias em todos os serviços. Trabalho com as principais marcas do mercado.",
    specialties: ["Conserto de geladeiras", "Troca de compressor", "Manutenção preventiva", "Vazamento de gás"],
    experienceYears: 10,
    verified: true,
    workPhotos: [
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800",
    ],
    reviews: [
      {
        id: "r1",
        clientName: "Maria Ferreira",
        clientPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        rating: 5,
        comment: "Excelente profissional! Consertou minha geladeira rapidamente e o preço foi justo. Super recomendo!",
        date: "2024-11-15",
        service: "Conserto de geladeira",
      },
      {
        id: "r2",
        clientName: "Carlos Oliveira",
        clientPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        rating: 5,
        comment: "Pontual, educado e muito competente. Resolveu o problema da máquina de lavar em menos de uma hora.",
        date: "2024-11-10",
        service: "Máquina de lavar",
      },
      {
        id: "r3",
        clientName: "Ana Paula",
        clientPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        rating: 4,
        comment: "Bom atendimento e serviço de qualidade. Voltarei a chamar quando precisar.",
        date: "2024-11-05",
        service: "Micro-ondas",
      },
    ],
  },
  {
    id: "2",
    name: "Maria Santos",
    slug: "maria-santos-eletronicos-sp",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    category: "Eletrodomésticos & Eletrônicos",
    subcategories: ["Celular", "Tablet", "Smartwatch"],
    rating: 4.9,
    reviewCount: 203,
    location: {
      state: "SP",
      city: "São Paulo",
      neighborhood: "Vila Mariana",
    },
    serviceRadius: 12,
    distance: "0.8 km",
    phone: "(11) 91234-5678",
    whatsapp: "5511912345678",
    email: "maria.santos@email.com",
    description: "Especialista em manutenção de celulares e tablets. Troca de tela, bateria, e reparos em geral. Peças originais e garantia.",
    specialties: ["Troca de tela", "Troca de bateria", "Reparo de software", "Desbloqueio"],
    experienceYears: 7,
    verified: true,
    workPhotos: [
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    ],
    reviews: [
      {
        id: "r4",
        clientName: "Roberto Lima",
        clientPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        rating: 5,
        comment: "Trocou a tela do meu celular em 30 minutos. Serviço impecável!",
        date: "2024-11-20",
        service: "Troca de tela",
      },
    ],
  },
  {
    id: "3",
    name: "João Oliveira",
    slug: "joao-oliveira-climatizacao-sp",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    category: "Casa & Reforma",
    subcategories: ["Ar-condicionado Split", "Manutenção preventiva", "Recarga de gás"],
    rating: 4.7,
    reviewCount: 89,
    location: {
      state: "SP",
      city: "São Paulo",
      neighborhood: "Vila Mariana",
    },
    serviceRadius: 20,
    distance: "2.1 km",
    phone: "(11) 97777-8888",
    whatsapp: "5511977778888",
    email: "joao.oliveira@email.com",
    description: "Especialista em instalação e manutenção de ar-condicionado. Atendimento residencial e comercial com equipamentos de última geração.",
    specialties: ["Instalação de split", "Limpeza completa", "Recarga de gás refrigerante", "Manutenção preventiva"],
    experienceYears: 8,
    verified: true,
    workPhotos: [
      "https://images.unsplash.com/photo-1631545806609-2e8d78bf7ae2?w=800",
      "https://images.unsplash.com/photo-1585814525033-e76fa0fc03eb?w=800",
    ],
    reviews: [
      {
        id: "r5",
        clientName: "Fernanda Costa",
        clientPhoto: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
        rating: 5,
        comment: "Instalou meu ar-condicionado perfeitamente. Muito profissional e caprichoso no trabalho.",
        date: "2024-11-18",
        service: "Instalação de split",
      },
    ],
  },
  {
    id: "4",
    name: "Ana Costa",
    slug: "ana-costa-reformas-sp",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    category: "Casa & Reforma",
    subcategories: ["Pintura", "Revestimento", "Drywall / gesso"],
    rating: 4.9,
    reviewCount: 156,
    location: {
      state: "SP",
      city: "São Paulo",
      neighborhood: "Vila Mariana",
    },
    serviceRadius: 18,
    distance: "1.5 km",
    phone: "(11) 96666-7777",
    whatsapp: "5511966667777",
    email: "ana.costa@email.com",
    description: "Pintora profissional com especialização em texturas e acabamentos especiais. Trabalho limpo e organizado.",
    specialties: ["Pintura residencial", "Textura", "Grafiato", "Massa corrida"],
    experienceYears: 12,
    verified: true,
    workPhotos: [
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
    ],
    reviews: [
      {
        id: "r6",
        clientName: "Paulo Souza",
        clientPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
        rating: 5,
        comment: "Pintou minha casa toda. Trabalho muito bem feito e limpo. Recomendo!",
        date: "2024-11-12",
        service: "Pintura residencial",
      },
    ],
  },
  {
    id: "5",
    name: "Pedro Almeida",
    slug: "pedro-almeida-mecanica-sp",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    category: "Veículos & Transporte",
    subcategories: ["Mecânica geral", "Injeção eletrônica", "Suspensão e amortecedores"],
    rating: 4.6,
    reviewCount: 94,
    location: {
      state: "SP",
      city: "São Paulo",
      neighborhood: "Vila Mariana",
    },
    serviceRadius: 10,
    distance: "3.2 km",
    phone: "(11) 95555-6666",
    whatsapp: "5511955556666",
    email: "pedro.almeida@email.com",
    description: "Mecânico automotivo com certificação nas principais marcas. Oficina equipada com scanner automotivo e ferramentas especializadas.",
    specialties: ["Diagnóstico eletrônico", "Troca de óleo", "Revisão completa", "Sistema de freios"],
    experienceYears: 15,
    verified: true,
    workPhotos: [
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800",
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800",
    ],
    reviews: [
      {
        id: "r7",
        clientName: "Luiza Martins",
        clientPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
        rating: 5,
        comment: "Ótimo mecânico! Explicou todo o problema do carro e o serviço foi impecável.",
        date: "2024-11-08",
        service: "Revisão completa",
      },
    ],
  },
  {
    id: "6",
    name: "Fernanda Lima",
    slug: "fernanda-lima-moveis-sp",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    category: "Móveis & Artesanato",
    subcategories: ["Estofamento", "Restauração", "Conserto de móveis"],
    rating: 4.8,
    reviewCount: 112,
    location: {
      state: "SP",
      city: "São Paulo",
      neighborhood: "Vila Mariana",
    },
    serviceRadius: 25,
    distance: "1.9 km",
    phone: "(11) 94444-5555",
    whatsapp: "5511944445555",
    email: "fernanda.lima@email.com",
    description: "Especialista em restauração e estofamento de móveis. Trabalho artesanal com atenção aos detalhes.",
    specialties: ["Estofamento de sofás", "Restauração de madeira", "Troca de espuma", "Reforma de cadeiras"],
    experienceYears: 9,
    verified: true,
    workPhotos: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800",
    ],
    reviews: [
      {
        id: "r8",
        clientName: "Ricardo Santos",
        clientPhoto: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100",
        rating: 5,
        comment: "Reformou meu sofá antigo que estava para jogar fora. Ficou novo! Trabalho excepcional.",
        date: "2024-11-01",
        service: "Estofamento de sofá",
      },
    ],
  },
];
