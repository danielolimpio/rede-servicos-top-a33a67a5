import { Car, Bike, Home, Snowflake, Smartphone, Wind, Sofa, Wrench } from "lucide-react";

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: any;
  description: string;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    id: "automoveis",
    name: "Automóveis",
    slug: "automoveis",
    icon: Car,
    description: "Mecânica, Elétrica, Funilaria, Borracharia, Alinhamento, Acessórios",
    subcategories: [
      { id: "mecanica", name: "Mecânica", slug: "mecanica" },
      { id: "eletrica", name: "Elétrica", slug: "eletrica" },
      { id: "funilaria-pintura", name: "Funilaria e Pintura", slug: "funilaria-pintura" },
      { id: "borracharia", name: "Borracharia", slug: "borracharia" },
      { id: "alinhamento", name: "Alinhamento e Cambagem", slug: "alinhamento" },
      { id: "ar-automotivo", name: "Ar-condicionado automotivo", slug: "ar-automotivo" },
      { id: "acessorios-som", name: "Acessórios e Som", slug: "acessorios-som" },
      { id: "diagnostico", name: "Diagnóstico computadorizado", slug: "diagnostico" },
    ],
  },
  {
    id: "motos",
    name: "Motos",
    slug: "motos",
    icon: Bike,
    description: "Motor, Suspensão, Freios, Customização",
    subcategories: [
      { id: "motor", name: "Motor", slug: "motor" },
      { id: "freios-suspensao", name: "Freios e Suspensão", slug: "freios-suspensao" },
      { id: "eletrica-moto", name: "Elétrica", slug: "eletrica-moto" },
      { id: "funilaria-moto", name: "Funilaria", slug: "funilaria-moto" },
      { id: "customizacao", name: "Customização", slug: "customizacao" },
    ],
  },
  {
    id: "reformas-construcao",
    name: "Reformas & Construção",
    slug: "reformas-construcao",
    icon: Home,
    description: "Pintura, Revestimento, Marcenaria, Carpintaria, Hidráulica, Elétrica",
    subcategories: [
      { id: "pintura", name: "Pintura", slug: "pintura" },
      { id: "revestimento", name: "Revestimento", slug: "revestimento" },
      { id: "hidraulica", name: "Hidráulica", slug: "hidraulica" },
      { id: "eletrica-residencial", name: "Elétrica", slug: "eletrica-residencial" },
      { id: "marcenaria", name: "Marcenaria", slug: "marcenaria" },
      { id: "carpintaria", name: "Carpintaria", slug: "carpintaria" },
      { id: "drywall-gesso", name: "Drywall / Gesso", slug: "drywall-gesso" },
      { id: "reforma-banheiro", name: "Reforma de banheiro/cozinha", slug: "reforma-banheiro" },
    ],
  },
  {
    id: "eletrodomesticos",
    name: "Eletrodomésticos",
    slug: "eletrodomesticos",
    icon: Snowflake,
    description: "Geladeira, Máquina de Lavar, Micro-ondas, Fogão, Liquidificador, Café",
    subcategories: [
      { id: "geladeira", name: "Geladeira", slug: "geladeira" },
      { id: "maquina-lavar", name: "Máquina de Lavar", slug: "maquina-lavar" },
      { id: "micro-ondas", name: "Micro-ondas", slug: "micro-ondas" },
      { id: "fogao-cooktop", name: "Fogão e Cooktop", slug: "fogao-cooktop" },
      { id: "liquidificador", name: "Liquidificador / Processador", slug: "liquidificador" },
      { id: "ventilador", name: "Ventilador / Circulador", slug: "ventilador" },
      { id: "torradeira", name: "Torradeira / Sanduicheira", slug: "torradeira" },
      { id: "espremedor", name: "Espremedor de Frutas", slug: "espremedor" },
      { id: "maquina-cafe", name: "Máquina de Café", slug: "maquina-cafe" },
    ],
  },
  {
    id: "eletronicos",
    name: "Eletrônicos",
    slug: "eletronicos",
    icon: Smartphone,
    description: "Celular, Computador, TV, Som, Câmeras",
    subcategories: [
      { id: "celular", name: "Celular", slug: "celular" },
      { id: "computador", name: "Computador", slug: "computador" },
      { id: "tv", name: "TV", slug: "tv" },
      { id: "som-audio", name: "Som e Áudio", slug: "som-audio" },
      { id: "cameras-drones", name: "Câmeras e Drones", slug: "cameras-drones" },
    ],
  },
  {
    id: "climatizacao",
    name: "Climatização",
    slug: "climatizacao",
    icon: Wind,
    description: "Instalação, Manutenção, Limpeza, Vazamento",
    subcategories: [
      { id: "ar-split", name: "Ar-condicionado Split", slug: "ar-split" },
      { id: "ar-janela", name: "Janela / Portátil", slug: "ar-janela" },
      { id: "ar-automotivo", name: "Ar-condicionado automotivo", slug: "ar-automotivo" },
      { id: "ventilacao", name: "Ventilação / Exaustores", slug: "ventilacao" },
    ],
  },
  {
    id: "moveis-madeira",
    name: "Móveis & Madeira",
    slug: "moveis-madeira",
    icon: Sofa,
    description: "Conserto, Restauração, Estofamento, Marcenaria sob medida",
    subcategories: [
      { id: "conserto-moveis", name: "Conserto de móveis", slug: "conserto-moveis" },
      { id: "restauracao", name: "Restauração", slug: "restauracao" },
      { id: "estofamento", name: "Estofamento", slug: "estofamento" },
      { id: "moveis-planejados", name: "Móveis planejados", slug: "moveis-planejados" },
      { id: "moveis-rusticos", name: "Móveis rústicos / antiguidades", slug: "moveis-rusticos" },
    ],
  },
  {
    id: "servicos-gerais",
    name: "Serviços Gerais",
    slug: "servicos-gerais",
    icon: Wrench,
    description: "Chaveiro, Encanador, Eletricista, Serralheiro",
    subcategories: [
      { id: "chaveiro", name: "Chaveiro", slug: "chaveiro" },
      { id: "encanador", name: "Encanador", slug: "encanador" },
      { id: "eletricista", name: "Eletricista", slug: "eletricista" },
      { id: "serralheiro", name: "Serralheiro", slug: "serralheiro" },
      { id: "limpeza-caixa", name: "Limpeza de caixa d'água", slug: "limpeza-caixa" },
      { id: "desentupimento", name: "Desentupimento", slug: "desentupimento" },
    ],
  },
];
