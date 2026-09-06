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
  {
    slug: "teimosinha-da-lotofacil-como-funciona",
    title: "Teimosinha da Lotofácil: o que é e como jogar a mesma aposta em vários concursos",
    description:
      "Entenda como funciona a Teimosinha da Lotofácil, em quantos concursos dá pra repetir a mesma aposta de uma vez e como calcular o custo total antes de jogar.",
    publishedAt: "2026-09-02",
    categoria: "Como jogar",
    sections: [
      {
        heading: "O que é a Teimosinha",
        paragraphs: [
          "Teimosinha é o nome que a Caixa dá pra opção de repetir a mesma aposta automaticamente em vários concursos seguidos, sem precisar preencher um volante novo (ou refazer a aposta online) a cada sorteio. Você escolhe os números uma única vez e eles valem pra todos os concursos incluídos na Teimosinha.",
          "Funciona tanto nas casas lotéricas quanto pelo site oficial de Loterias Online da Caixa, e está disponível pra Lotofácil e pras outras loterias da Caixa.",
        ],
      },
      {
        heading: "Em quantos concursos dá pra jogar de uma vez",
        paragraphs: [
          "A Caixa permite repetir a mesma aposta por 2, 3, 4, 6, 8, 9, 12, 18 ou 24 concursos consecutivos — você escolhe uma dessas opções no momento de apostar.",
          "O valor total cobrado é simplesmente o preço da sua aposta multiplicado pela quantidade de concursos escolhida. Por exemplo, se você joga com 15 números (aposta mínima) e escolhe Teimosinha de 4 concursos, paga 4 vezes o valor de uma aposta simples de uma só vez.",
        ],
      },
      {
        heading: "Vale a pena usar?",
        paragraphs: [
          "A vantagem prática é conveniência: você não corre o risco de esquecer de apostar num concurso específico, e evita ter que ir toda semana até uma lotérica pra repetir os mesmos números. Nada muda nas chances de acerto — cada concurso dentro da Teimosinha continua sendo um sorteio independente, com a mesma probabilidade de sempre pra cada combinação.",
          "Antes de escolher quantos concursos incluir, vale calcular o custo total multiplicado — é fácil perder a noção do valor total quando a cobrança é feita de uma vez só.",
        ],
      },
    ],
  },
  {
    slug: "lotofacil-paga-imposto-de-renda",
    title: "Lotofácil paga imposto de renda? Veja quando e quanto incide",
    description:
      "Entenda a partir de quanto o prêmio da Lotofácil tem desconto de imposto de renda, qual a alíquota aplicada e como esse valor é descontado antes do pagamento.",
    publishedAt: "2026-09-02",
    categoria: "Prêmios",
    sections: [
      {
        heading: "Existe uma faixa isenta",
        paragraphs: [
          "Prêmios de loteria no Brasil (incluindo a Lotofácil) têm uma faixa de isenção: valores até R$ 2.112,00 não têm desconto de imposto de renda. Esse número corresponde à primeira faixa da tabela do IRPF e pode ser reajustado no futuro, então vale sempre confirmar o valor vigente na hora de calcular.",
        ],
      },
      {
        heading: "Acima disso, a alíquota é de 30%",
        paragraphs: [
          "Prêmios de loteria que ultrapassam a faixa isenta pagam 30% de imposto de renda, calculado só sobre a parte do valor que excede R$ 2.112,00 — não sobre o prêmio inteiro. Essa regra está prevista na Lei nº 13.756/2018.",
          "Por exemplo (valores simplificados, sem considerar o número exato do reajuste vigente): num prêmio de R$ 100.000, o imposto incide sobre R$ 97.888 (a diferença acima da faixa isenta), não sobre os R$ 100.000 inteiros.",
        ],
      },
      {
        heading: "O desconto já vem feito quando você recebe",
        paragraphs: [
          "Esse imposto é retido na fonte: a Caixa já desconta o valor automaticamente antes de pagar o prêmio, então quem ganha recebe o valor líquido, sem precisar calcular ou recolher nada por conta própria na hora.",
          "Ainda assim, o prêmio recebido deve ser informado na declaração anual do Imposto de Renda, no campo de rendimentos sujeitos à tributação exclusiva — mesmo já tendo sido tributado na fonte. Em caso de dúvida sobre a sua declaração específica, vale consultar um contador.",
        ],
      },
    ],
  },
  {
    slug: "prazo-para-resgatar-premio-da-lotofacil",
    title: "Prazo para resgatar prêmio da Lotofácil: até quando você pode receber",
    description:
      "O prazo pra resgatar um prêmio da Lotofácil é de 90 dias corridos após o sorteio. Veja o que acontece se esse prazo passar e onde retirar o dinheiro.",
    publishedAt: "2026-09-02",
    categoria: "Prêmios",
    sections: [
      {
        heading: "O prazo é de 90 dias corridos",
        paragraphs: [
          "Prêmios das Loterias Caixa — incluindo a Lotofácil — prescrevem em 90 dias corridos contados a partir da data do sorteio. O prazo é o mesmo pra apostas simples e pra bolões, e vale tanto pra apostas feitas em casa lotérica quanto pelos canais digitais da Caixa.",
          "É um prazo fixo em lei, sem prorrogação: não importa o valor do prêmio ou o motivo da demora, passado esse período não tem como reverter.",
        ],
      },
      {
        heading: "O que acontece se o prazo passar",
        paragraphs: [
          "Se o prêmio não for resgatado dentro dos 90 dias, o valor prescreve e é repassado integralmente ao FIES (Fundo de Financiamento Estudantil), conforme a Lei nº 13.756/2018 — não fica retido pela Caixa nem existe segunda chance de resgate depois disso.",
        ],
      },
      {
        heading: "Onde e como resgatar",
        paragraphs: [
          "Prêmios de valor menor costumam poder ser retirados direto em qualquer casa lotérica. Prêmios acima de um determinado valor (que muda periodicamente) só podem ser resgatados em agências da Caixa, com documento de identificação e o bilhete premiado em mãos.",
          "Assim que sair um resultado que te interessa, confira aqui no site se o seu jogo bateu e não deixe pra resgatar de última hora — sobretudo em bolão, onde é preciso combinar com todo o grupo com antecedência.",
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
