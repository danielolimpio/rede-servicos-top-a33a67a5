import { Car, Home, Zap, Wrench, Sofa, TreePine, Briefcase } from "lucide-react";

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  group?: string;
}

export interface Category {
  id: string;
  name: string;
  shortName?: string;
  slug: string;
  icon: any;
  description: string;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    id: "veiculos-transporte",
    name: "Veículos & Transporte",
    slug: "veiculos-transporte",
    icon: Car,
    description: "Carros, Motos, Mecânica, Elétrica, Funilaria, Veículos Elétricos",
    subcategories: [
      // Mecânica Automotiva
      { id: "mecanica-geral", name: "Mecânica geral de automóveis", slug: "mecanica-geral", group: "Mecânica Automotiva" },
      { id: "injecao-eletronica", name: "Injeção eletrônica automotiva", slug: "injecao-eletronica", group: "Mecânica Automotiva" },
      { id: "cambio-automatico", name: "Câmbio automático / CVT / Manual", slug: "cambio-automatico", group: "Mecânica Automotiva" },
      { id: "sistema-freios", name: "Sistema de freios (ABS, EBD)", slug: "sistema-freios", group: "Mecânica Automotiva" },
      { id: "suspensao-amortecedores", name: "Suspensão e amortecedores", slug: "suspensao-amortecedores", group: "Mecânica Automotiva" },
      { id: "direcao-hidraulica", name: "Direção hidráulica e elétrica", slug: "direcao-hidraulica", group: "Mecânica Automotiva" },
      { id: "motor-retifica", name: "Motor (retífica, montagem, diagnóstico)", slug: "motor-retifica", group: "Mecânica Automotiva" },
      { id: "correia-dentada", name: "Correia dentada e distribuição", slug: "correia-dentada", group: "Mecânica Automotiva" },
      { id: "embreagem-transmissao", name: "Embreagem e sistema de transmissão", slug: "embreagem-transmissao", group: "Mecânica Automotiva" },
      // Elétrica & Eletrônica Veicular
      { id: "eletrica-auto", name: "Elétrica automotiva (bateria, alternador, partida)", slug: "eletrica-auto", group: "Elétrica & Eletrônica Veicular" },
      { id: "diagnostico-computadorizado", name: "Diagnóstico computadorizado (scanner OBD2)", slug: "diagnostico-computadorizado", group: "Elétrica & Eletrônica Veicular" },
      { id: "central-multimidia", name: "Central multimídia e infotainment", slug: "central-multimidia", group: "Elétrica & Eletrônica Veicular" },
      { id: "rastreador-alarme", name: "Rastreador, alarme e bloqueador", slug: "rastreador-alarme", group: "Elétrica & Eletrônica Veicular" },
      { id: "sensores-adas", name: "Sensores e ADAS (câmera de ré, estacionamento)", slug: "sensores-adas", group: "Elétrica & Eletrônica Veicular" },
      { id: "programacao-chaves", name: "Programação de chaves e imobilizador", slug: "programacao-chaves", group: "Elétrica & Eletrônica Veicular" },
      // Climatização & Conforto
      { id: "ar-automotivo", name: "Ar-condicionado automotivo", slug: "ar-automotivo", group: "Climatização Veicular" },
      { id: "recarga-gas-auto", name: "Recarga de gás e limpeza de evaporador", slug: "recarga-gas-auto", group: "Climatização Veicular" },
      { id: "filtro-cabine", name: "Troca de filtro de cabine", slug: "filtro-cabine", group: "Climatização Veicular" },
      { id: "diagnostico-climatizacao", name: "Diagnóstico de climatização digital", slug: "diagnostico-climatizacao", group: "Climatização Veicular" },
      // Funilaria, Pintura & Estética
      { id: "funilaria-pintura", name: "Funilaria e pintura (martelinho de ouro)", slug: "funilaria-pintura", group: "Funilaria & Estética" },
      { id: "polimento-vitrificacao", name: "Polimento técnico e vitrificação", slug: "polimento-vitrificacao", group: "Funilaria & Estética" },
      { id: "lavagem-higienizacao", name: "Lavagem técnica e higienização interna", slug: "lavagem-higienizacao", group: "Funilaria & Estética" },
      { id: "estetica-detailing", name: "Estética automotiva (detailing)", slug: "estetica-detailing", group: "Funilaria & Estética" },
      { id: "insulfilm", name: "Insulfilm e películas de proteção", slug: "insulfilm", group: "Funilaria & Estética" },
      // Pneus & Alinhamento
      { id: "borracharia", name: "Borracharia (pneus, câmara, reparos)", slug: "borracharia", group: "Pneus & Alinhamento" },
      { id: "alinhamento-cambagem", name: "Balanceamento e alinhamento 3D", slug: "alinhamento-cambagem", group: "Pneus & Alinhamento" },
      { id: "rodas-acessorios", name: "Rodas e acessórios", slug: "rodas-acessorios", group: "Pneus & Alinhamento" },
      { id: "suspensao-ar", name: "Suspensão a ar e kits de elevação", slug: "suspensao-ar", group: "Pneus & Alinhamento" },
      // Motos
      { id: "motor-2t-4t", name: "Motor de moto (2T/4T)", slug: "motor-2t-4t", group: "Motos & Veículos Leves" },
      { id: "injecao-efi", name: "Injeção eletrônica moto (EFI/Carburador)", slug: "injecao-efi", group: "Motos & Veículos Leves" },
      { id: "freios-suspensao-moto", name: "Freios e suspensão para motos", slug: "freios-suspensao-moto", group: "Motos & Veículos Leves" },
      { id: "eletrica-moto", name: "Elétrica moto (partida, iluminação, CDI)", slug: "eletrica-moto", group: "Motos & Veículos Leves" },
      { id: "transmissao", name: "Transmissão (corrente, coroa, cardan)", slug: "transmissao", group: "Motos & Veículos Leves" },
      { id: "painel-digital", name: "Painel digital e instrumentos moto", slug: "painel-digital", group: "Motos & Veículos Leves" },
      { id: "customizacao", name: "Customização e estética para motos", slug: "customizacao", group: "Motos & Veículos Leves" },
      // Veículos Especiais & Emergentes
      { id: "veiculos-eletricos", name: "Veículos elétricos e híbridos", slug: "veiculos-eletricos", group: "Veículos Especiais" },
      { id: "baterias-litio", name: "Baterias de lítio e sistemas de recarga", slug: "baterias-litio", group: "Veículos Especiais" },
      { id: "carregadores-wallbox", name: "Instalação de carregadores Wallbox", slug: "carregadores-wallbox", group: "Veículos Especiais" },
      { id: "empilhadeiras", name: "Empilhadeiras e veículos industriais", slug: "empilhadeiras", group: "Veículos Especiais" },
      { id: "reboque-guincho", name: "Reboque e guincho técnico", slug: "reboque-guincho", group: "Veículos Especiais" },
    ],
  },
  {
    id: "casa-reforma",
    name: "Casa & Reforma",
    slug: "casa-reforma",
    icon: Home,
    description: "Reformas, Construção, Climatização, Hidráulica, Elétrica, Marcenaria",
    subcategories: [
      // Acabamentos & Revestimentos
      { id: "piso-ceramica", name: "Piso cerâmica e porcelanato", slug: "piso-ceramica", group: "Acabamentos & Revestimentos" },
      { id: "pisos", name: "Piso laminado, vinílico e cimento queimado", slug: "pisos", group: "Acabamentos & Revestimentos" },
      { id: "revestimento", name: "Revestimento (azulejo, pastilha, pedra)", slug: "revestimento", group: "Acabamentos & Revestimentos" },
      { id: "textura-grafiato", name: "Acabamento de textura e grafiato", slug: "textura-grafiato", group: "Acabamentos & Revestimentos" },
      { id: "pintura", name: "Pintura interna e externa", slug: "pintura", group: "Acabamentos & Revestimentos" },
      { id: "papel-parede", name: "Papel de parede e revestimento 3D", slug: "papel-parede", group: "Acabamentos & Revestimentos" },
      { id: "impermeabilizacao", name: "Impermeabilização de lajes e áreas molhadas", slug: "impermeabilizacao", group: "Acabamentos & Revestimentos" },
      // Estrutura & Drywall
      { id: "drywall-gesso", name: "Drywall / gesso acartonado", slug: "drywall-gesso", group: "Estrutura & Drywall" },
      { id: "forro", name: "Forro (PVC, gesso, lã de vidro)", slug: "forro", group: "Estrutura & Drywall" },
      { id: "divisorias", name: "Divisórias e paredes leves", slug: "divisorias", group: "Estrutura & Drywall" },
      { id: "nichos-sancas", name: "Nichos, sancas e iluminação embutida", slug: "nichos-sancas", group: "Estrutura & Drywall" },
      // Hidráulica & Saneamento
      { id: "hidraulica", name: "Hidráulica residencial e predial", slug: "hidraulica", group: "Hidráulica & Saneamento" },
      { id: "troca-tubulacoes", name: "Troca de tubulações e reparos", slug: "troca-tubulacoes", group: "Hidráulica & Saneamento" },
      { id: "dreno-entupido", name: "Dreno entupido e desentupimento especializado", slug: "dreno-entupido", group: "Hidráulica & Saneamento" },
      { id: "caixa-cisterna", name: "Instalação de caixas d'água e cisternas", slug: "caixa-cisterna", group: "Hidráulica & Saneamento" },
      { id: "aquecedor-agua", name: "Aquecedor de água (gás, solar, elétrico)", slug: "aquecedor-agua", group: "Hidráulica & Saneamento" },
      { id: "valvulas-registros", name: "Válvulas, registros e pressurizadores", slug: "valvulas-registros", group: "Hidráulica & Saneamento" },
      // Elétrica Residencial
      { id: "eletrica-residencial", name: "Elétrica residencial (baixa tensão)", slug: "eletrica-residencial", group: "Elétrica Residencial" },
      { id: "quadros-disjuntores", name: "Quadros de distribuição e disjuntores", slug: "quadros-disjuntores", group: "Elétrica Residencial" },
      { id: "iluminacao-inteligente", name: "Iluminação inteligente e automação residencial", slug: "iluminacao-inteligente", group: "Elétrica Residencial" },
      { id: "tomadas-interruptores", name: "Tomadas, interruptores e pontos de carga", slug: "tomadas-interruptores", group: "Elétrica Residencial" },
      { id: "spda-aterramento", name: "SPDA (para-raios) e aterramento", slug: "spda-aterramento", group: "Elétrica Residencial" },
      // Marcenaria & Carpintaria
      { id: "marcenaria", name: "Marcenaria sob medida (cozinhas, closets)", slug: "marcenaria", group: "Marcenaria & Carpintaria" },
      { id: "carpintaria", name: "Carpintaria de estruturas e acabamentos", slug: "carpintaria", group: "Marcenaria & Carpintaria" },
      { id: "portas-janelas", name: "Instalação de portas, janelas e molduras", slug: "portas-janelas", group: "Marcenaria & Carpintaria" },
      { id: "dobradicas-trilhos", name: "Dobradiças, trilhos e ferragens", slug: "dobradicas-trilhos", group: "Marcenaria & Carpintaria" },
      // Reformas Específicas
      { id: "reforma-banheiro", name: "Reforma completa de banheiro", slug: "reforma-banheiro", group: "Reformas Específicas" },
      { id: "reforma-cozinha", name: "Reforma de cozinha planejada", slug: "reforma-cozinha", group: "Reformas Específicas" },
      { id: "acessibilidade", name: "Adaptação para acessibilidade (NBR 9050)", slug: "acessibilidade", group: "Reformas Específicas" },
      { id: "home-office", name: "Home office e estúdios acústicos", slug: "home-office", group: "Reformas Específicas" },
      { id: "areas-externas", name: "Áreas externas e churrasqueiras", slug: "areas-externas", group: "Reformas Específicas" },
      // Esquadrias & Vidros
      { id: "serralheria", name: "Serralheria (alumínio, ferro, aço)", slug: "serralheria", group: "Esquadrias & Vidros" },
      { id: "vidro-temperado", name: "Vidro temperado e box para banheiro", slug: "vidro-temperado", group: "Esquadrias & Vidros" },
      { id: "porta-correr", name: "Porta de correr (trilhos, automatização)", slug: "porta-correr", group: "Esquadrias & Vidros" },
      { id: "persiana", name: "Persianas (motorizada/manual) e cortinas", slug: "persiana", group: "Esquadrias & Vidros" },
      { id: "vedacao", name: "Vedação e isolamento acústico/térmico", slug: "vedacao", group: "Esquadrias & Vidros" },
      // Climatização Residencial
      { id: "ar-split", name: "Ar-condicionado split (Hi-Wall, Cassete, Piso-teto)", slug: "ar-split", group: "Climatização Residencial" },
      { id: "ar-janela", name: "Ar-condicionado janela", slug: "ar-janela", group: "Climatização Residencial" },
      { id: "ar-portatil", name: "Ar-condicionado portátil", slug: "ar-portatil", group: "Climatização Residencial" },
      { id: "instalacao-ar", name: "Instalação, remoção e realocação de ar", slug: "instalacao-ar", group: "Climatização Residencial" },
      { id: "recarga-gas", name: "Recarga de gás refrigerante (R410A, R32)", slug: "recarga-gas", group: "Climatização Residencial" },
      { id: "higienizacao-ozonio", name: "Limpeza técnica e higienização com ozônio", slug: "higienizacao-ozonio", group: "Climatização Residencial" },
      { id: "manutencao-preventiva", name: "Manutenção preventiva e corretiva de ar", slug: "manutencao-preventiva", group: "Climatização Residencial" },
      { id: "troca-pecas-ar", name: "Troca de peças (placa, motor, compressor)", slug: "troca-pecas-ar", group: "Climatização Residencial" },
      { id: "controle-remoto-wifi", name: "Controle remoto / Wi-Fi e automação", slug: "controle-remoto-wifi", group: "Climatização Residencial" },
      { id: "unidade-externa", name: "Unidade externa (condensadora) e suporte", slug: "unidade-externa", group: "Climatização Residencial" },
      { id: "climatizadores", name: "Climatizadores evaporativos", slug: "climatizadores", group: "Climatização Residencial" },
    ],
  },
  {
    id: "eletrodomesticos-eletronicos",
    name: "Eletrodomésticos & Eletrônicos",
    slug: "eletrodomesticos-eletronicos",
    icon: Zap,
    description: "Linha Branca, Pequenos Eletros, TI, Celular, TV, IoT, Equipamentos Médicos",
    subcategories: [
      // Linha Branca
      { id: "geladeira", name: "Geladeira e freezer", slug: "geladeira", group: "Linha Branca" },
      { id: "maquina-lavar-roupas", name: "Máquina de lavar roupas (lava e seca, tanquinho)", slug: "maquina-lavar-roupas", group: "Linha Branca" },
      { id: "maquina-lavar-loucas", name: "Máquina de lavar louças", slug: "maquina-lavar-loucas", group: "Linha Branca" },
      { id: "fogao-cooktop", name: "Fogão, cooktop e forno embutido", slug: "fogao-cooktop", group: "Linha Branca" },
      { id: "secadora-roupas", name: "Secadora de roupas", slug: "secadora-roupas", group: "Linha Branca" },
      { id: "bebedouro-purificador", name: "Bebedouro e purificador de água", slug: "bebedouro-purificador", group: "Linha Branca" },
      { id: "exaustor-depurador", name: "Exaustor e depurador de cozinha", slug: "exaustor-depurador", group: "Linha Branca" },
      // Pequenos Eletrodomésticos
      { id: "micro-ondas", name: "Micro-ondas e forno elétrico", slug: "micro-ondas", group: "Pequenos Eletrodomésticos" },
      { id: "liquidificador-processador", name: "Liquidificador, processador e batedeira", slug: "liquidificador-processador", group: "Pequenos Eletrodomésticos" },
      { id: "maquina-cafe", name: "Cafeteira, máquina de café e espresso", slug: "maquina-cafe", group: "Pequenos Eletrodomésticos" },
      { id: "panela-pressao", name: "Panela de pressão elétrica e air fryer", slug: "panela-pressao", group: "Pequenos Eletrodomésticos" },
      { id: "aspirador-robo", name: "Aspirador de pó e robô aspirador", slug: "aspirador-robo", group: "Pequenos Eletrodomésticos" },
      { id: "umidificador", name: "Umidificador e desumidificador", slug: "umidificador", group: "Pequenos Eletrodomésticos" },
      { id: "ventilador", name: "Ventilador, aquecedor e torradeira", slug: "ventilador", group: "Pequenos Eletrodomésticos" },
      { id: "espremedor", name: "Espremedor, sanduicheira e grill", slug: "espremedor", group: "Pequenos Eletrodomésticos" },
      // Eletrônicos & TI
      { id: "celular", name: "Celular e smartphone (tela, bateria, software)", slug: "celular", group: "Eletrônicos & TI" },
      { id: "computador", name: "Computador (notebook/desktop)", slug: "computador", group: "Eletrônicos & TI" },
      { id: "tablet", name: "Tablet e e-readers", slug: "tablet", group: "Eletrônicos & TI" },
      { id: "tv", name: "TV (LED, OLED, QLED) e suportes", slug: "tv", group: "Eletrônicos & TI" },
      { id: "som-audio", name: "Som e áudio (home theater, soundbar)", slug: "som-audio", group: "Eletrônicos & TI" },
      { id: "impressora", name: "Impressora e multifuncional", slug: "impressora", group: "Eletrônicos & TI" },
      { id: "consoles", name: "Consoles (PlayStation, Xbox, Nintendo Switch)", slug: "consoles", group: "Eletrônicos & TI" },
      { id: "fones-ouvido", name: "Fones de ouvido e acessórios gamer", slug: "fones-ouvido", group: "Eletrônicos & TI" },
      { id: "smartwatch", name: "Smartwatch e wearables", slug: "smartwatch", group: "Eletrônicos & TI" },
      { id: "projetor", name: "Projetor e tela de projeção", slug: "projetor", group: "Eletrônicos & TI" },
      { id: "roteador-mesh", name: "Roteador, mesh Wi-Fi e repetidores", slug: "roteador-mesh", group: "Eletrônicos & TI" },
      { id: "cameras-seguranca", name: "Câmeras de segurança e DVR/NVR", slug: "cameras-seguranca", group: "Eletrônicos & TI" },
      { id: "eletrodomesticos-iot", name: "Eletrodomésticos inteligentes (IoT)", slug: "eletrodomesticos-iot", group: "Eletrônicos & TI" },
      // Saúde & Bem-estar em Casa
      { id: "equipamentos-medicos", name: "Equipamentos médicos domésticos", slug: "equipamentos-medicos", group: "Saúde & Bem-estar" },
      { id: "home-care", name: "Adequação para home care", slug: "home-care", group: "Saúde & Bem-estar" },
      { id: "purificadores-avancados", name: "Purificadores de ar e água avançados", slug: "purificadores-avancados", group: "Saúde & Bem-estar" },
    ],
  },
  {
    id: "servicos-tecnicos-emergencias",
    name: "Serviços Técnicos & Emergências",
    slug: "servicos-tecnicos-emergencias",
    icon: Wrench,
    description: "Encanador 24h, Eletricista, Chaveiro, Desentupimento, Automação, Energia Solar",
    subcategories: [
      // Emergência 24h
      { id: "encanador", name: "Encanador de emergência (vazamentos)", slug: "encanador", group: "Emergência 24h" },
      { id: "eletricista", name: "Eletricista 24h (curto, falta de energia)", slug: "eletricista", group: "Emergência 24h" },
      { id: "chaveiro", name: "Chaveiro residencial, automotivo e predial", slug: "chaveiro", group: "Emergência 24h" },
      { id: "serralheiro", name: "Serralheiro para portões e grades", slug: "serralheiro", group: "Emergência 24h" },
      { id: "desentupimento", name: "Desentupidora (hidrojateamento, vídeo inspeção)", slug: "desentupimento", group: "Emergência 24h" },
      { id: "sos-emergencial", name: "Atendimento emergencial residencial", slug: "sos-emergencial", group: "Emergência 24h" },
      // Automação & Segurança
      { id: "portoes-automaticos", name: "Portões e portas automáticas", slug: "portoes-automaticos", group: "Automação & Segurança" },
      { id: "fechaduras-inteligentes", name: "Fechaduras inteligentes e biométricas", slug: "fechaduras-inteligentes", group: "Automação & Segurança" },
      { id: "interfones", name: "Interfones e vídeo porteiro", slug: "interfones", group: "Automação & Segurança" },
      { id: "cerca-eletrica", name: "Cerca elétrica e sensores de presença", slug: "cerca-eletrica", group: "Automação & Segurança" },
      // Limpeza Técnica & Manutenção Predial
      { id: "limpeza-caixa", name: "Limpeza de caixa d'água e reservatórios", slug: "limpeza-caixa", group: "Limpeza Técnica" },
      { id: "cisterna-reservatorios", name: "Limpeza de cisterna e calhas", slug: "cisterna-reservatorios", group: "Limpeza Técnica" },
      { id: "dedetizacao", name: "Dedetização e controle de pragas", slug: "dedetizacao", group: "Limpeza Técnica" },
      { id: "limpeza-tecnica", name: "Limpeza pós-obra e higienização técnica", slug: "limpeza-tecnica", group: "Limpeza Técnica" },
      { id: "imperm-piscina", name: "Impermeabilização de lajes e piscinas", slug: "imperm-piscina", group: "Limpeza Técnica" },
      // Ferramentas & Locação
      { id: "furadeiras-parafusadeiras", name: "Locação de furadeiras e marteletes", slug: "furadeiras-parafusadeiras", group: "Ferramentas & Locação" },
      { id: "motosserras-rocadeiras", name: "Motosserras e roçadeiras", slug: "motosserras-rocadeiras", group: "Ferramentas & Locação" },
      { id: "geradores", name: "Geradores, compressores e inversores", slug: "geradores", group: "Ferramentas & Locação" },
      { id: "andaimes", name: "Plataformas elevatórias e andaimes", slug: "andaimes", group: "Ferramentas & Locação" },
      // Energia & Sustentabilidade
      { id: "painel-solar", name: "Instalador de painéis solares fotovoltaicos", slug: "painel-solar", group: "Energia & Sustentabilidade" },
      { id: "energia-eolica", name: "Técnico em energia eólica residencial", slug: "energia-eolica", group: "Energia & Sustentabilidade" },
      { id: "eficiencia-energetica", name: "Consultor de eficiência energética", slug: "eficiencia-energetica", group: "Energia & Sustentabilidade" },
      { id: "reciclagem-eletronicos", name: "Reciclagem de eletrônicos e logística reversa", slug: "reciclagem-eletronicos", group: "Energia & Sustentabilidade" },
    ],
  },
  {
    id: "moveis-artesanato",
    name: "Móveis & Artesanato",
    slug: "moveis-artesanato",
    icon: Sofa,
    description: "Conserto, Restauração, Estofamento, Marcenaria Artística, Instrumentos",
    subcategories: [
      // Conserto & Restauração
      { id: "conserto-moveis", name: "Conserto de móveis (cadeiras, mesas, armários)", slug: "conserto-moveis", group: "Conserto & Restauração" },
      { id: "restauracao", name: "Restauração completa (lixamento, verniz, laca)", slug: "restauracao", group: "Conserto & Restauração" },
      { id: "espelhos-vidros-moveis", name: "Troca de espelhos e vidros em móveis", slug: "espelhos-vidros-moveis", group: "Conserto & Restauração" },
      { id: "nivelamento", name: "Nivelamento e ajuste de portas/gavetas", slug: "nivelamento", group: "Conserto & Restauração" },
      // Estofados & Tecidos
      { id: "estofamento", name: "Estofamento de sofás, poltronas e bancos", slug: "estofamento", group: "Estofados & Tecidos" },
      { id: "espuma-molas", name: "Troca de espuma e molas", slug: "espuma-molas", group: "Estofados & Tecidos" },
      { id: "limpeza-estofados", name: "Limpeza técnica de estofados", slug: "limpeza-estofados", group: "Estofados & Tecidos" },
      { id: "customizacao-tecidos", name: "Customização de tecidos e costura reforçada", slug: "customizacao-tecidos", group: "Estofados & Tecidos" },
      // Personalização & Artesanato
      { id: "moveis-planejados", name: "Móveis planejados e sob medida", slug: "moveis-planejados", group: "Personalização & Artesanato" },
      { id: "marcenaria-artistica", name: "Marcenaria artística e artesanato em madeira", slug: "marcenaria-artistica", group: "Personalização & Artesanato" },
      { id: "customizacao-moveis", name: "Customização de móveis (pintura, adesivos)", slug: "customizacao-moveis", group: "Personalização & Artesanato" },
      { id: "instrumentos-musicais", name: "Restauração de instrumentos musicais", slug: "instrumentos-musicais", group: "Personalização & Artesanato" },
      { id: "cortinas-persianas", name: "Confecção e reparo de cortinas e persianas", slug: "cortinas-persianas", group: "Personalização & Artesanato" },
    ],
  },
  {
    id: "jardim-lazer-pet",
    name: "Jardim, Paisagismo & Pet",
    slug: "jardim-lazer-pet",
    icon: TreePine,
    description: "Irrigação, Paisagismo, Iluminação de jardim, Pet-services técnicos",
    subcategories: [
      // Irrigação & Automação
      { id: "regador-automatico", name: "Regador automático e programadores", slug: "regador-automatico", group: "Irrigação & Automação" },
      { id: "valvulas-solenoides", name: "Válvulas solenoides e controladores", slug: "valvulas-solenoides", group: "Irrigação & Automação" },
      { id: "sistema-gotejamento", name: "Sistema de gotejamento e microaspersão", slug: "sistema-gotejamento", group: "Irrigação & Automação" },
      { id: "bomba-fonte", name: "Bombas para fontes, lagos e piscinas", slug: "bomba-fonte", group: "Irrigação & Automação" },
      // Paisagismo & Iluminação
      { id: "projeto-jardim", name: "Projeto e manutenção de jardins", slug: "projeto-jardim", group: "Paisagismo & Iluminação" },
      { id: "podas-adubacao", name: "Podas, adubação e controle de pragas", slug: "podas-adubacao", group: "Paisagismo & Iluminação" },
      { id: "iluminacao-jardim", name: "Iluminação de jardim (LED, solar)", slug: "iluminacao-jardim", group: "Paisagismo & Iluminação" },
      { id: "jardim-vertical", name: "Cercas vivas e jardins verticais", slug: "jardim-vertical", group: "Paisagismo & Iluminação" },
      // Pet-services
      { id: "pet-services", name: "Banho e tosa técnica", slug: "pet-services", group: "Pet-services Técnicos" },
      { id: "cercas-pets", name: "Instalação de cercas e portões para pets", slug: "cercas-pets", group: "Pet-services Técnicos" },
      { id: "creche-pet", name: "Creche e hotel para animais (infraestrutura)", slug: "creche-pet", group: "Pet-services Técnicos" },
      { id: "acessorios-pets", name: "Acessórios e ambientes personalizados para pets", slug: "acessorios-pets", group: "Pet-services Técnicos" },
    ],
  },
  {
    id: "equipamentos-profissionais",
    name: "Negócios, Digital & B2B",
    slug: "equipamentos-profissionais",
    icon: Briefcase,
    description: "Freelancer Digital, Marketing, Dados, Facilities, Equipamentos Comerciais",
    subcategories: [
      // Desenvolvimento & Tecnologia
      { id: "dev-web", name: "Desenvolvedor Web (Front, Back, Full-stack)", slug: "dev-web", group: "Desenvolvimento & Tecnologia" },
      { id: "dev-mobile", name: "Desenvolvedor Mobile (iOS, Android, React Native)", slug: "dev-mobile", group: "Desenvolvimento & Tecnologia" },
      { id: "dev-wordpress", name: "Programador WordPress, Shopify, WooCommerce", slug: "dev-wordpress", group: "Desenvolvimento & Tecnologia" },
      { id: "apis-integracoes", name: "Especialista em APIs e integrações", slug: "apis-integracoes", group: "Desenvolvimento & Tecnologia" },
      { id: "qa-tester", name: "QA Tester e automação de testes", slug: "qa-tester", group: "Desenvolvimento & Tecnologia" },
      // Design & Criação
      { id: "web-designer", name: "Web Designer e UI/UX Designer", slug: "web-designer", group: "Design & Criação" },
      { id: "designer-grafico", name: "Designer Gráfico (logos, identidade visual)", slug: "designer-grafico", group: "Design & Criação" },
      { id: "editor-videos", name: "Criador e Editor de Vídeos (YouTube, Reels)", slug: "editor-videos", group: "Design & Criação" },
      { id: "motion-graphics", name: "Motion Graphics e animação 2D/3D", slug: "motion-graphics", group: "Design & Criação" },
      { id: "ilustrador", name: "Ilustrador digital e diretor de arte", slug: "ilustrador", group: "Design & Criação" },
      // Marketing Digital
      { id: "seo-local", name: "Especialista em SEO e SEO Local", slug: "seo-local", group: "Marketing Digital & Growth" },
      { id: "gestor-trafego", name: "Gestor de Tráfego (Google, Meta, TikTok Ads)", slug: "gestor-trafego", group: "Marketing Digital & Growth" },
      { id: "social-media", name: "Social Media e estrategista de conteúdo", slug: "social-media", group: "Marketing Digital & Growth" },
      { id: "copywriter", name: "Copywriter e redator publicitário", slug: "copywriter", group: "Marketing Digital & Growth" },
      { id: "email-marketing", name: "E-mail marketing e automação de vendas", slug: "email-marketing", group: "Marketing Digital & Growth" },
      // Dados & Infraestrutura
      { id: "analista-dados", name: "Analista de Dados e Business Intelligence", slug: "analista-dados", group: "Dados & Infraestrutura" },
      { id: "cientista-dados", name: "Cientista de Dados e Machine Learning", slug: "cientista-dados", group: "Dados & Infraestrutura" },
      { id: "admin-cloud", name: "Administrador de servidores e cloud (AWS, Azure)", slug: "admin-cloud", group: "Dados & Infraestrutura" },
      { id: "suporte-remoto", name: "Suporte técnico remoto e helpdesk", slug: "suporte-remoto", group: "Dados & Infraestrutura" },
      // Profissionais Autônomos
      { id: "tradutor", name: "Tradutor e intérprete", slug: "tradutor", group: "Profissionais Autônomos" },
      { id: "consultor-negocios", name: "Consultor de negócios e mentorias", slug: "consultor-negocios", group: "Profissionais Autônomos" },
      { id: "contador-freelancer", name: "Contador e assistente fiscal freelancer", slug: "contador-freelancer", group: "Profissionais Autônomos" },
      { id: "designer-apresentacoes", name: "Designer de apresentações e infoprodutos", slug: "designer-apresentacoes", group: "Profissionais Autônomos" },
      // Facilities & Predial
      { id: "facilities", name: "Gestão de facilities e terceirização", slug: "facilities", group: "Manutenção Predial & Facilities" },
      { id: "limpeza-comercial", name: "Limpeza comercial e zeladoria", slug: "limpeza-comercial", group: "Manutenção Predial & Facilities" },
      { id: "pmoc", name: "Manutenção preventiva de ar-condicionado (PMOC)", slug: "pmoc", group: "Manutenção Predial & Facilities" },
      { id: "controle-acesso", name: "Controle de acesso e portaria técnica", slug: "controle-acesso", group: "Manutenção Predial & Facilities" },
      // TI Corporativa
      { id: "suporte-empresarial", name: "Suporte técnico empresarial", slug: "suporte-empresarial", group: "TI Corporativa" },
      { id: "redes-cabeamento", name: "Instalação de redes e cabeamento estruturado", slug: "redes-cabeamento", group: "TI Corporativa" },
      { id: "seguranca-informacao", name: "Segurança da informação e backup em nuvem", slug: "seguranca-informacao", group: "TI Corporativa" },
      { id: "transformacao-digital", name: "Consultoria em transformação digital", slug: "transformacao-digital", group: "TI Corporativa" },
      // Equipamentos Comerciais
      { id: "maquinas-cartao", name: "Manutenção de máquinas de cartão e PDV", slug: "maquinas-cartao", group: "Equipamentos Comerciais" },
      { id: "balancas-pdv", name: "Balanças, etiquetadoras e sistemas de estoque", slug: "balancas-pdv", group: "Equipamentos Comerciais" },
      { id: "cftv-corporativo", name: "Câmeras de segurança corporativa e CFTV", slug: "cftv-corporativo", group: "Equipamentos Comerciais" },
      { id: "nobreaks-industriais", name: "Nobreaks e estabilizadores industriais", slug: "nobreaks-industriais", group: "Equipamentos Comerciais" },
      // Lavanderia & Oficinas
      { id: "lavadoras-industriais", name: "Lavadoras e secadoras industriais", slug: "lavadoras-industriais", group: "Lavanderia & Oficinas" },
      { id: "calandras", name: "Calandras e prensas térmicas", slug: "calandras", group: "Lavanderia & Oficinas" },
      { id: "dosadores-automaticos", name: "Dosadores automáticos de lavanderia", slug: "dosadores-automaticos", group: "Lavanderia & Oficinas" },
      { id: "compressores", name: "Compressores de ar e ferramentas pneumáticas", slug: "compressores", group: "Lavanderia & Oficinas" },
      { id: "inversores-solda", name: "Inversores de solda e equipamentos de oficina", slug: "inversores-solda", group: "Lavanderia & Oficinas" },
    ],
  },
];
