export interface Professional {
  id: string;
  name: string;
  photo: string;
  category: string;
  subcategory: string;
  rating: number;
  reviewCount: number;
  distance: string;
  city: string;
  state: string;
  neighborhood: string;
}

export const mockProfessionals: Professional[] = [
  {
    id: "1",
    name: "Carlos Silva",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    category: "Eletrodomésticos",
    subcategory: "Geladeira",
    rating: 4.8,
    reviewCount: 127,
    distance: "1.2 km",
    city: "São Paulo",
    state: "SP",
    neighborhood: "Vila Mariana",
  },
  {
    id: "2",
    name: "Maria Santos",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    category: "Eletrônicos",
    subcategory: "Celular",
    rating: 4.9,
    reviewCount: 203,
    distance: "0.8 km",
    city: "São Paulo",
    state: "SP",
    neighborhood: "Vila Mariana",
  },
  {
    id: "3",
    name: "João Oliveira",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    category: "Climatização",
    subcategory: "Ar-condicionado Split",
    rating: 4.7,
    reviewCount: 89,
    distance: "2.1 km",
    city: "São Paulo",
    state: "SP",
    neighborhood: "Vila Mariana",
  },
  {
    id: "4",
    name: "Ana Costa",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    category: "Reformas & Construção",
    subcategory: "Pintura",
    rating: 4.9,
    reviewCount: 156,
    distance: "1.5 km",
    city: "São Paulo",
    state: "SP",
    neighborhood: "Vila Mariana",
  },
  {
    id: "5",
    name: "Pedro Almeida",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    category: "Automóveis",
    subcategory: "Mecânica",
    rating: 4.6,
    reviewCount: 94,
    distance: "3.2 km",
    city: "São Paulo",
    state: "SP",
    neighborhood: "Vila Mariana",
  },
  {
    id: "6",
    name: "Fernanda Lima",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    category: "Móveis & Madeira",
    subcategory: "Estofamento",
    rating: 4.8,
    reviewCount: 112,
    distance: "1.9 km",
    city: "São Paulo",
    state: "SP",
    neighborhood: "Vila Mariana",
  },
];
