export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  categoria: string;
  sections: BlogSection[];
}

// Pauta definida a partir dos temas mais recorrentes em blogs e portais sobre
// Lotofácil (bolão, probabilidade, fechamento, prêmios especiais, estatística
// de números). Conteúdo escrito para ser honesto sobre o que é aleatório —
// evitamos qualquer promessa de "estratégia infalível", o que também ajuda a
// manter o site alinhado às políticas de conteúdo de anúncios sobre loteria.
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "bolao-da-lotofacil-como-funciona",
    title: "Bolão da Lotofácil: como funciona, vantagens e como organizar o seu",
    description:
      "Entenda como funciona um bolão da Lotofácil, como a divisão de cotas e prêmios funciona na prática e os cuidados para organizar o seu com segurança.",
    publishedAt: "2026-08-02",
    categoria: "Bolão",
    sections: [
      {
        heading: "O que é um bolão",
        paragraphs: [
          "Bolão é quando um grupo de pessoas se junta para fazer uma aposta maior do que faria sozinho, dividindo o custo entre todos os participantes (as chamadas cotas). Com o dinheiro reunido, dá para marcar mais números do que o mínimo de 15 — o que aumenta bastante o número de combinações cobertas pela aposta.",
          "Se o bolão for premiado, o valor do prêmio é dividido proporcionalmente entre as cotas: quem entrou com mais cotas recebe uma fatia maior.",
        ],
      },
      {
        heading: "Por que o bolão aumenta a chance de premiação",
        paragraphs: [
          "A Lotofácil permite apostas de 15 até 20 números. Quanto mais números marcados em uma única aposta, mais combinações de 15 dezenas essa aposta cobre ao mesmo tempo — e por isso a chance de acertar alguma faixa de premiação sobe bastante. O problema é que o custo de uma aposta com mais números também cresce rápido, o que na prática inviabiliza pra maioria das pessoas jogar sozinha com 18, 19 ou 20 números.",
          "O bolão resolve exatamente esse problema: divide esse custo maior entre várias pessoas, tornando acessível uma aposta que sozinho seria cara demais.",
        ],
      },
      {
        heading: "Cuidados para organizar um bolão",
        paragraphs: [
          "Registre por escrito (mesmo que só num grupo de WhatsApp com print) quem são todos os participantes, quantas cotas cada um comprou e o valor pago — isso evita discussão em caso de prêmio.",
          "Guarde o comprovante da aposta original em local que todos os participantes tenham acesso ou saibam onde está.",
          "Prefira organizar bolões com pessoas de confiança (familiares, colegas de trabalho) ou por meio de casas lotéricas que já oferecem bolões oficiais organizados.",
          "Combine antecipadamente o que acontece se alguém quiser sair do grupo antes do sorteio.",
        ],
      },
    ],
  },
  {
    slug: "probabilidade-de-ganhar-na-lotofacil",
    title: "Qual a probabilidade de ganhar na Lotofácil? Entenda as chances reais",
    description:
      "As chances reais de acertar 11, 12, 13, 14 e 15 números na Lotofácil, explicadas de forma simples — e por que resultados passados não influenciam o próximo sorteio.",
    publishedAt: "2026-08-02",
    categoria: "Probabilidade",
    sections: [
      {
        heading: "As chances por faixa de acerto",
        paragraphs: [
          "Numa aposta simples de 15 números (a mínima), existem 3.268.760 combinações possíveis de 15 dezenas entre as 25 disponíveis — e sua aposta é só uma delas. É por isso que acertar os 15 pontos é difícil.",
          "Mas a Lotofácil paga a partir de 11 acertos, e essa faixa de entrada é bem mais acessível: segundo dados historicamente divulgados pela própria Caixa, as chances aproximadas numa aposta de 15 números são de cerca de 1 em 3,3 milhões para os 15 pontos, 1 em 21,7 mil para 14 pontos, 1 em 691 para 13 pontos, 1 em 60 para 12 pontos e cerca de 1 em 11 para 11 pontos.",
          "Ou seja: a chance de ganhar algum prêmio (mesmo que pequeno, na faixa de 11 acertos) é bem maior do que a chance de levar o prêmio principal — o que explica por que tanta gente recebe algum valor de volta quase toda vez que joga.",
        ],
      },
      {
        heading: "Marcar mais números muda as chances?",
        paragraphs: [
          "Sim — cada número extra marcado (até o máximo de 20) aumenta a quantidade de combinações de 15 dezenas cobertas pela sua aposta, o que melhora as chances em todas as faixas. O custo da aposta também sobe proporcionalmente, então vale calcular se compensa jogar sozinho com mais números ou organizar um bolão.",
        ],
      },
      {
        heading: "Por que o sorteio anterior não muda suas chances",
        paragraphs: [
          "Cada sorteio da Lotofácil é um evento independente: as bolinhas não guardam memória do que saiu antes. Um número que não sai há 50 concursos não está mais nem menos propenso a sair no próximo sorteio do que um número que saiu na semana passada — matematicamente, todas as dezenas têm sempre a mesma chance a cada novo sorteio.",
          "Isso é conhecido como a falácia do apostador: a crença de que resultados passados influenciam resultados futuros em eventos aleatórios independentes. Vale ter isso em mente ao olhar tabelas de frequência ou de números atrasados — elas são curiosas e ajudam a entender o histórico, mas não preveem o próximo resultado.",
        ],
      },
    ],
  },
  {
    slug: "fechamento-da-lotofacil-como-funciona",
    title: "Fechamento da Lotofácil: o que é e como funciona essa técnica",
    description:
      "Entenda o que é fechamento na Lotofácil, como a técnica organiza apostas com mais de 15 números e o que considerar antes de usar.",
    publishedAt: "2026-08-02",
    categoria: "Estratégia",
    sections: [
      {
        heading: "O que é fechamento",
        paragraphs: [
          "Fechamento é o nome dado à técnica de escolher um grupo maior de números (por exemplo, 18 ou 20 dezenas) e organizar esse grupo em várias apostas de 15 números, de forma calculada, para garantir um certo nível mínimo de acerto caso uma quantidade determinada desses números seja sorteada.",
          "Existem fechamentos 'garantidos' (matematicamente calculados para assegurar uma faixa mínima de prêmio sob certas condições) e fechamentos 'não garantidos', que só reduzem o número de combinações de forma aproximada, sem garantia formal.",
        ],
      },
      {
        heading: "Vale a pena?",
        paragraphs: [
          "Um fechamento bem calculado é, na prática, uma forma organizada de apostar em mais combinações — o efeito prático é parecido com o de um bolão, mas controlado por uma única pessoa (ou grupo) que escolhe previamente os números em que confia.",
          "O ponto de atenção é o custo: várias apostas de 15 números juntas custam a soma de cada uma delas, então o investimento cresce rápido. Antes de montar um fechamento maior, vale simular o custo total e comparar com organizar um bolão, que costuma ser mais barato por pessoa.",
        ],
      },
      {
        heading: "Fechamento não é garantia de vitória",
        paragraphs: [
          "É importante ter clareza: o fechamento organiza melhor as apostas dentro do grupo de números que você escolheu, mas não aumenta a chance de esses números específicos serem sorteados — isso continua sendo aleatório. A técnica só evita desperdiçar dinheiro com combinações redundantes dentro do seu próprio grupo de dezenas.",
        ],
      },
    ],
  },
  {
    slug: "concursos-especiais-da-lotofacil",
    title: "Concursos especiais da Lotofácil: como funcionam os prêmios maiores",
    description:
      "Lotofácil da Independência, de São João e outros concursos especiais: como funcionam, por que os prêmios costumam ser maiores e como o acumulado funciona.",
    publishedAt: "2026-08-02",
    categoria: "Prêmios",
    sections: [
      {
        heading: "O que são os concursos especiais",
        paragraphs: [
          "Além dos sorteios regulares (de segunda a sábado), a Lotofácil costuma ter concursos especiais em datas comemorativas — os mais conhecidos são a Lotofácil da Independência e a Lotofácil de São João. Esses concursos costumam ter prêmios maiores e regras um pouco diferentes das apostas comuns.",
          "As datas, valores e regras específicas de cada edição especial mudam a cada ano, então o ideal é sempre conferir o comunicado oficial mais recente no site da Caixa antes de apostar em um concurso especial.",
        ],
      },
      {
        heading: "Como o prêmio acumula",
        paragraphs: [
          "Quando ninguém acerta os 15 números em um concurso, o valor que seria pago nessa faixa principal soma-se ao prêmio do próximo concurso — é o chamado acumulado. Em concursos especiais, esse mecanismo de acumulação combinado com uma arrecadação maior (mais gente aposta em datas especiais) costuma resultar nos maiores prêmios do ano.",
          "Você pode acompanhar se o concurso atual acumulou e qual a estimativa do próximo prêmio direto na nossa página de cada concurso, logo abaixo do resultado.",
        ],
      },
    ],
  },
  {
    slug: "pares-impares-numeros-atrasados-o-que-diz-a-estatistica",
    title: "Pares, ímpares e números atrasados: o que a estatística realmente diz",
    description:
      "Muita gente escolhe números com base em paridade ou em quanto tempo uma dezena está sem sair. Veja o que isso realmente significa estatisticamente.",
    publishedAt: "2026-08-02",
    categoria: "Estatística",
    sections: [
      {
        heading: "Por que as pessoas olham pra isso",
        paragraphs: [
          "É comum ver apostadores evitando marcar só números pares, só ímpares, ou sequências óbvias como '01-02-03-04-05', e também comum ver gente priorizando números que estão há muito tempo sem sair (os chamados 'atrasados'). É um comportamento natural — buscar padrão em meio ao aleatório é algo que todo mundo faz.",
        ],
      },
      {
        heading: "O que isso muda nas suas chances",
        paragraphs: [
          "Estatisticamente, nada. Cada sorteio da Lotofácil é independente dos anteriores, então um número atrasado continua tendo exatamente a mesma probabilidade de sair que um número que saiu no concurso passado. O mesmo vale para a distribuição entre pares e ímpares: qualquer combinação de 15 números tem, matematicamente, a mesma chance de ser sorteada que qualquer outra.",
          "O que essas tabelas de frequência e atraso oferecem é curiosidade histórica e contexto sobre o que já aconteceu — não uma previsão do que vai acontecer.",
        ],
      },
      {
        heading: "Onde ver esses dados no site",
        paragraphs: [
          "Se você gosta de acompanhar esse tipo de dado por curiosidade (o que é legítimo e divertido), disponibilizamos a frequência de cada dezena e o número atrasados na página de estatísticas, sempre atualizada com os concursos mais recentes.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** Tempo de leitura estimado (~200 palavras por minuto), arredondado pra cima. */
export function tempoLeituraMin(post: BlogPost): number {
  const palavras = post.sections
    .flatMap((s) => s.paragraphs)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(palavras / 200));
}

export function formatarDataPost(iso: string): string {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

export const CATEGORIAS_BLOG: string[] = Array.from(
  new Set(BLOG_POSTS.map((post) => post.categoria))
);
