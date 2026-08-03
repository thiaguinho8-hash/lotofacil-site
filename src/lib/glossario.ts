export interface TermoGlossario {
  termo: string;
  definicao: string;
  linkRelacionado?: { href: string; label: string };
}

export const GLOSSARIO: TermoGlossario[] = [
  {
    termo: "Acumulado",
    definicao:
      "Quando ninguém acerta os 15 números em um concurso, o valor que seria pago nessa faixa soma-se ao prêmio do próximo concurso.",
    linkRelacionado: {
      href: "/lotofacil/blog/concursos-especiais-da-lotofacil",
      label: "Como o prêmio acumula",
    },
  },
  {
    termo: "Aposta múltipla",
    definicao:
      "Aposta em que se marca mais de 15 números (até o máximo de 20). Cobre mais combinações e aumenta as chances, mas custa mais caro.",
    linkRelacionado: {
      href: "/lotofacil/blog/probabilidade-de-ganhar-na-lotofacil",
      label: "Como isso muda as chances",
    },
  },
  {
    termo: "Aposta simples",
    definicao: "Aposta com o mínimo de 15 números marcados — a opção mais barata pra jogar.",
  },
  {
    termo: "Bolão",
    definicao:
      "Grupo de pessoas que se junta pra fazer uma aposta maior, dividindo o custo (em cotas) e o prêmio proporcionalmente entre os participantes.",
    linkRelacionado: { href: "/lotofacil/bolao", label: "Calculadora de bolão" },
  },
  {
    termo: "Casa lotérica",
    definicao:
      "Estabelecimento credenciado pela Caixa Econômica Federal onde é possível fazer apostas presencialmente.",
  },
  {
    termo: "Concurso",
    definicao:
      "Cada sorteio da Lotofácil recebe um número sequencial (o concurso). Os sorteios acontecem de segunda a sexta às 21h e aos domingos às 11h.",
  },
  {
    termo: "Concurso especial",
    definicao:
      "Edições em datas comemorativas (como a Lotofácil da Independência) com prêmios costumeiramente maiores que os concursos regulares.",
    linkRelacionado: {
      href: "/lotofacil/blog/concursos-especiais-da-lotofacil",
      label: "Como funcionam os concursos especiais",
    },
  },
  {
    termo: "Cota",
    definicao:
      "Cada parte de um bolão. Quem entra com mais cotas paga mais e recebe uma fatia maior do prêmio, se ganhar.",
  },
  {
    termo: "Dezena",
    definicao: "Cada um dos números de 01 a 25 que podem ser marcados na aposta.",
  },
  {
    termo: "Fechamento",
    definicao:
      "Técnica de marcar um grupo maior de números e organizá-los em várias apostas de 15 números, de forma calculada, pra cobrir mais combinações dentro desse grupo.",
    linkRelacionado: {
      href: "/lotofacil/blog/fechamento-da-lotofacil-como-funciona",
      label: "Como funciona o fechamento",
    },
  },
  {
    termo: "Faixa de premiação",
    definicao:
      "A Lotofácil paga em 5 faixas, de acordo com quantos números você acertou: 11, 12, 13, 14 ou 15 pontos.",
  },
  {
    termo: "Número atrasado",
    definicao:
      "Dezena que está há mais concursos sem ser sorteada. Não influencia a chance do próximo sorteio — cada concurso é independente.",
    linkRelacionado: { href: "/lotofacil/estatisticas", label: "Ver números atrasados" },
  },
  {
    termo: "Prêmio estimado",
    definicao:
      "Valor aproximado que será pago na faixa principal (15 acertos) do próximo concurso, calculado antes do sorteio acontecer.",
  },
  {
    termo: "Rateio",
    definicao:
      "Divisão do valor total de uma faixa de premiação entre todos os apostadores que acertaram aquela quantidade de números naquele concurso.",
  },
  {
    termo: "Teimosinha",
    definicao:
      "Opção que repete automaticamente a mesma aposta por vários concursos seguidos, sem precisar apostar de novo toda vez.",
  },
  {
    termo: "Volante",
    definicao: "O cartão (físico ou digital) onde o apostador marca os números escolhidos.",
  },
];
