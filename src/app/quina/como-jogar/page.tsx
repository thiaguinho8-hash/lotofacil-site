import type { Metadata } from "next";
import Link from "next/link";
import AffiliateButton from "@/components/AffiliateButton";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Como jogar na Quina: regras, preço da aposta e como apostar",
  description:
    "Entenda como jogar na Quina: quantos números escolher, quanto custa a aposta, faixas de premiação e onde apostar.",
};

const FAIXAS = [
  { acertos: "5 números (Quina)", descricao: "Prêmio principal. Se ninguém acertar, o valor acumula para o próximo concurso." },
  { acertos: "4 números (Quadra)", descricao: "Segunda maior faixa de premiação." },
  { acertos: "3 números (Terno)", descricao: "Premiação intermediária, com mais ganhadores que a Quadra." },
  { acertos: "2 números (Duque)", descricao: "Faixa de entrada — a mais fácil de acertar, com o maior número de ganhadores." },
];

export default function ComoJogarQuinaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav aria-label="breadcrumb" className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          Início
        </Link>{" "}
        /{" "}
        <Link href="/quina" className="hover:underline">
          Quina
        </Link>{" "}
        / Como jogar
      </nav>

      <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl">Como jogar na Quina</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        Um resumo prático das regras — para as condições completas e valores atualizados,
        confira sempre o site oficial das Loterias CAIXA antes de apostar.
      </p>

      <section className="mb-8">
        <h2 className="mb-2 text-lg font-bold">O que é a Quina</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          A Quina é uma loteria da Caixa Econômica Federal em que o apostador escolhe de 5 a 15
          números dentre os 80 disponíveis (01 a 80). No sorteio, 5 números são sorteados e você
          ganha se acertar 2, 3, 4 ou os 5 números (a chamada &quot;Quina&quot;). Quanto mais
          números marcados na aposta, maior o custo e a chance de acertar mais números.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-lg font-bold">Passo a passo para apostar</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          <li>Escolha entre 5 e 15 números de 01 a 80 (quanto mais números, maior o custo e a chance de ganhar).</li>
          <li>Faça a aposta em uma casa lotérica ou pelo site/app oficial das Loterias CAIXA.</li>
          <li>Acompanhe o sorteio — geralmente por volta das 20h, de segunda a sábado.</li>
          <li>Confira o resultado aqui no site ou use nosso <Link href="/quina/conferidor" className="text-forest hover:underline dark:text-gold">conferidor</Link>.</li>
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
          reais do último sorteio na <Link href="/quina/resultado-de-hoje" className="text-forest hover:underline dark:text-gold">página de resultado</Link>.
        </p>
      </section>

      <AdSlot id="ad-quina-como-jogar" label="Espaço publicitário" className="my-8 h-24 w-full" />

      <section className="rounded-2xl border border-gray-200 bg-gold/10 p-5 text-center dark:border-gray-800 dark:bg-gold/20">
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          Pronto para apostar? Faça sua fé em bons números.
        </p>
        <AffiliateButton />
      </section>
    </div>
  );
}
