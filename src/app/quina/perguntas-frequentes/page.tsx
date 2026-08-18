import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Perguntas frequentes sobre a Quina (FAQ)",
  description:
    "Tire suas dúvidas sobre a Quina: que horas sai o resultado, como funciona, quanto se ganha por faixa de acerto e mais.",
};

const FAQ = [
  {
    pergunta: "A que horas sai o resultado da Quina?",
    resposta:
      "O sorteio costuma acontecer por volta das 20h (horário de Brasília), de segunda a sábado, no Espaço da Sorte, em São Paulo. O resultado aparece aqui no site poucos minutos depois de divulgado pela Caixa.",
  },
  {
    pergunta: "Como funciona a Quina?",
    resposta:
      "Você escolhe de 5 a 15 números entre 01 e 80. No sorteio, 5 números são sorteados e você ganha algum prêmio se acertar 2, 3, 4 ou 5 deles. Quanto mais números você marca na aposta, maior o custo e a chance de acertar mais números.",
  },
  {
    pergunta: "Quanto se ganha por faixa de acerto?",
    resposta:
      "A Quina paga prêmio para quem acerta de 2 a 5 números. O valor de cada faixa muda a cada concurso, de acordo com a arrecadação e o número de ganhadores — quem acerta os 5 números leva o prêmio principal (a Quina), e as faixas de 4, 3 e 2 acertos recebem valores menores. Os valores exatos do último sorteio ficam disponíveis na página de resultado de cada concurso.",
  },
  {
    pergunta: "Quantos dias por semana tem sorteio da Quina?",
    resposta: "Seis dias por semana: de segunda a sábado. Não há sorteio aos domingos.",
  },
  {
    pergunta: "O que acontece se ninguém acertar as 5 dezenas?",
    resposta:
      "O prêmio da faixa principal acumula e é somado ao prêmio do próximo concurso, aumentando o valor a ser distribuído.",
  },
  {
    pergunta: "Existe desconto de Imposto de Renda sobre o prêmio da Quina?",
    resposta:
      "Sim, prêmios acima de um valor mínimo definido pela Receita Federal têm Imposto de Renda retido na fonte automaticamente pela Caixa no momento do pagamento. Os valores e faixas de isenção podem mudar — consulte as regras atualizadas no site da Receita Federal ou da Caixa antes de apostar.",
  },
  {
    pergunta: "Onde posso apostar na Quina?",
    resposta:
      "Em qualquer casa lotérica credenciada pela Caixa ou pelo site/aplicativo oficial das Loterias CAIXA. Este site não vende apostas nem processa pagamentos.",
  },
];

export default function PerguntasFrequentesQuinaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.resposta,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="breadcrumb" className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          Início
        </Link>{" "}
        /{" "}
        <Link href="/quina" className="hover:underline">
          Quina
        </Link>{" "}
        / Perguntas frequentes
      </nav>

      <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl">Perguntas frequentes sobre a Quina</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        As dúvidas mais comuns de quem joga na Quina, respondidas direto ao ponto.
      </p>

      <div className="flex flex-col divide-y divide-gray-200 rounded-xl border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
        {FAQ.map((item) => (
          <details key={item.pergunta} className="group p-4 open:bg-paper-dim dark:open:bg-forest-deep/30">
            <summary className="cursor-pointer list-none font-semibold marker:content-none">
              <span className="flex items-center justify-between gap-3">
                {item.pergunta}
                <span className="shrink-0 text-forest transition group-open:rotate-45 dark:text-gold" aria-hidden="true">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{item.resposta}</p>
          </details>
        ))}
      </div>

      <AdSlot id="ad-quina-faq" label="Espaço publicitário" className="mt-8 h-24 w-full" />

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-600">
        Página informativa e independente — sem vínculo com a Caixa Econômica Federal. Ver{" "}
        <Link href="/sobre" className="hover:underline">
          mais sobre o site
        </Link>
        .
      </p>
    </div>
  );
}
