import { categories, Category, Subcategory } from "@/data/categories";

export interface SearchResult {
  type: "category" | "subcategory";
  id: string;
  name: string;
  slug: string;
  parentCategory?: Category;
  category?: Category;
  subcategory?: Subcategory;
  matchedKeywords: string[];
}

// Keywords relacionados para melhorar a busca
const keywordMappings: Record<string, string[]> = {
  // Compressor relaciona com vários equipamentos
  compressor: ["geladeira", "ar-condicionado", "ar-split", "maquina-lavar-roupas", "climatizadores"],
  
  // Vazamento
  vazamento: ["geladeira", "hidraulica", "ar-split", "encanador", "dreno-entupido"],
  
  // Motor
  motor: ["mecanica-geral", "motor-2t-4t", "maquina-lavar-roupas", "bomba-fonte"],
  
  // Refrigeração
  refrigeracao: ["geladeira", "ar-split", "ar-janela", "ar-portatil", "bebedouro-purificador"],
  frio: ["geladeira", "ar-split", "ar-janela", "ar-portatil", "climatizadores"],
  
  // Elétrica
  eletrica: ["eletrica-residencial", "eletrica-auto", "eletricista", "eletrica-moto"],
  curto: ["eletricista", "eletrica-residencial", "sos-emergencial"],
  
  // Água
  agua: ["hidraulica", "encanador", "limpeza-caixa", "desentupimento", "bebedouro-purificador"],
  
  // Ruído/Barulho
  ruido: ["geladeira", "maquina-lavar-roupas", "ar-split", "ventilador"],
  barulho: ["geladeira", "maquina-lavar-roupas", "ar-split", "ventilador"],
  
  // Tela/Display
  tela: ["celular", "tv", "computador", "tablet", "smartwatch"],
  display: ["celular", "tv", "computador", "tablet", "smartwatch", "painel-digital"],
  
  // Bateria
  bateria: ["celular", "computador", "eletrica-auto", "baterias-litio", "smartwatch"],
  
  // Limpeza
  limpeza: ["limpeza-caixa", "limpeza-tecnica", "lavagem-higienizacao", "aspirador-robo"],
  
  // Emergência
  emergencia: ["sos-emergencial", "chaveiro", "desentupimento", "encanador", "eletricista"],
  urgente: ["sos-emergencial", "chaveiro", "desentupimento", "encanador", "eletricista"],
  
  // Instalação
  instalacao: ["ar-split", "ar-janela", "eletrica-residencial", "iluminacao-inteligente", "cameras-seguranca"],
};

// Normaliza texto para busca (remove acentos, lowercase)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Busca inteligente que cruza categorias e subcategorias
export function searchCategories(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = normalizeText(query);
  const results: SearchResult[] = [];
  const addedIds = new Set<string>();

  // Primeiro, verifica se há keywords mapeados
  const mappedSubcategoryIds: string[] = [];
  Object.entries(keywordMappings).forEach(([keyword, subcategoryIds]) => {
    if (normalizedQuery.includes(normalizeText(keyword)) || normalizeText(keyword).includes(normalizedQuery)) {
      mappedSubcategoryIds.push(...subcategoryIds);
    }
  });

  // Busca em todas as categorias e subcategorias
  categories.forEach((category) => {
    const normalizedCategoryName = normalizeText(category.name);
    const normalizedCategoryDesc = normalizeText(category.description);

    // Match na categoria principal
    if (normalizedCategoryName.includes(normalizedQuery) || normalizedCategoryDesc.includes(normalizedQuery)) {
      if (!addedIds.has(category.id)) {
        results.push({
          type: "category",
          id: category.id,
          name: category.name,
          slug: category.slug,
          category,
          matchedKeywords: [query],
        });
        addedIds.add(category.id);
      }
    }

    // Match nas subcategorias
    category.subcategories.forEach((subcategory) => {
      const normalizedSubName = normalizeText(subcategory.name);
      
      // Match direto no nome da subcategoria
      const directMatch = normalizedSubName.includes(normalizedQuery);
      
      // Match via keywords mapeados
      const keywordMatch = mappedSubcategoryIds.includes(subcategory.id);
      
      if ((directMatch || keywordMatch) && !addedIds.has(subcategory.id)) {
        const matchedKeywords: string[] = [];
        if (directMatch) matchedKeywords.push(query);
        if (keywordMatch) {
          Object.entries(keywordMappings).forEach(([keyword, ids]) => {
            if (ids.includes(subcategory.id) && 
                (normalizedQuery.includes(normalizeText(keyword)) || normalizeText(keyword).includes(normalizedQuery))) {
              matchedKeywords.push(keyword);
            }
          });
        }
        
        results.push({
          type: "subcategory",
          id: subcategory.id,
          name: subcategory.name,
          slug: subcategory.slug,
          parentCategory: category,
          subcategory,
          matchedKeywords,
        });
        addedIds.add(subcategory.id);
      }
    });
  });

  // Ordena: categorias primeiro, depois subcategorias; match direto primeiro
  return results.sort((a, b) => {
    // Categorias vêm primeiro
    if (a.type === "category" && b.type === "subcategory") return -1;
    if (a.type === "subcategory" && b.type === "category") return 1;
    
    // Match direto no nome vem primeiro
    const aDirectMatch = normalizeText(a.name).includes(normalizedQuery);
    const bDirectMatch = normalizeText(b.name).includes(normalizedQuery);
    if (aDirectMatch && !bDirectMatch) return -1;
    if (!aDirectMatch && bDirectMatch) return 1;
    
    return 0;
  }).slice(0, 15); // Limita a 15 resultados
}

// Sugestões populares para quando não há query
export function getPopularSearches(): string[] {
  return [
    "Geladeira",
    "Ar-condicionado",
    "Celular",
    "Eletricista",
    "Encanador",
    "Máquina de lavar",
    "TV",
    "Computador",
  ];
}

// Sugestões relacionadas baseadas no histórico ou contexto
export function getRelatedSuggestions(query: string): string[] {
  const normalizedQuery = normalizeText(query);
  const suggestions: string[] = [];
  
  // Sugestões baseadas em keywords similares
  Object.entries(keywordMappings).forEach(([keyword]) => {
    const normalizedKeyword = normalizeText(keyword);
    if (normalizedKeyword.startsWith(normalizedQuery.slice(0, 3)) && keyword !== query) {
      suggestions.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
    }
  });
  
  return suggestions.slice(0, 5);
}
