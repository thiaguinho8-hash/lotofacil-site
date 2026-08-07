import type { Metadata } from "next";
import Link from "next/link";
import AffiliateButton from "@/components/AffiliateButton";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Como jogar na Lotofácil: regras, preço da aposta e como apostar",
  description:
    "Entenda como jogar na Lotofácil: quantos números escolher, quanto custa a aposta, faixas de premiação, Teimosinha, bolão e onde apostar.",
};

const FAIXAS = [
  { acertos: "15 números", descricao: "Prêmio principal. Se ninguém acertar, o valor acumula para o próximo concurso." },
  { acertos: "14 números", descricao: "Segunda maior faixa de premiação." },
  { acertos: "13 números", descricao: "Premiação intermediária, com muito mais ganhadores que as faixas acima." },
  { acertos: "12 números", descricao: "Premiação menor, mas com alta frequência de ganhadores." },
  { acertos: "11 números", descricao: "Faixa de entrada — a mais fácil de acertar, com o maior número de ganhadores." },
];

export default function ComoJogarPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">

      <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl">Como jogar na Lotofácil</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        Um resumo prático das regras — para as condições completas e valores atualizados,
        confira sempre o site oficial das Loterias CAIXA antes de apostar.
      </p>

      <section className="mb-8">
        <h2 className="mb-2 text-lg font-bold">O que é a Lotofácil</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          A Lotofácil é uma loteria da Caixa Econômica Federal em que o apostador escolhe de 15
          a 20 números dentre os 25 disponíveis (01 a 25). No sorteio, 15 números são sorteados
          e você ganha se acertar de 11 a 15 deles. É considerada uma das loterias mais fáceis de
          ganhar algum prêmio, justamente por dar chance a partir de 11 acertos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-lg font-bold">Passo a passo para apostar</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          <li>Escolha entre 15 e 20 números de 01 a 25 (quanto mais números, maior o custo e a chance de ganhar).</li>
          <li>Faça a aposta em uma casa lotérica ou pelo site/app oficial das Loterias CAIXA.</li>
          <li>Acompanhe o sorteio — geralmente por volta das 20h, de segunda a sábado.</li>
          <li>Confira o resultado aqui no site ou use nosso <Link href="/lotofacil/conferidor" className="text-forest hover:underline dark:text-gold">conferidor</Link>.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold">Faixas de premiação</h2>
        <ul className="flex flex-col gap-3">
          {FAIXAS.map((faixa) => (
            <li key={faixa.acertos} className="rounded-xl border border-gray-200 p-4 text-sm dark:border-gray-800">
              <p className="font-semibold">{faixa.acertos}</p>
              <p className="text-gray-600 dark:text-gray-300">{faixa.descricao}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Os valores em reais mudam a cada concurso, de acordo com a arrecadação. Veja os valores
          reais do último sorteio na <Link href="/lotofacil/resultado-de-hoje" className="text-forest hover:underline dark:text-gold">página de resultado</Link>.
        </p>
      </section>

      <AdSlot id="ad-como-jogar" label="Espaço publicitário" className="my-8 h-24 w-full" />

      <section className="mb-8">
        <h2 className="mb-2 text-lg font-bold">Teimosinha e bolão</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          A <strong>Teimosinha</strong> repete o mesmo jogo automaticamente por vários concursos
          seguidos, sem precisar apostar de novo toda vez. O <strong>bolão</strong> permite
          juntar várias pessoas em uma aposta maior, dividindo o custo e o prêmio proporcionalmente
          entre os participantes — normalmente organizado por casas lotéricas.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-gold/10 p-5 text-center dark:border-gray-800 dark:bg-gold/20">
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          Pronto para apostar? Faça sua fé em bons números.
        </p>
        <AffiliateButton />
      </section>
    </div>
  );
}
