import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Conheça o ${SITE_NAME}: o que é, de onde vêm os dados e como falar com a gente.`,
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-extrabold">Sobre o {SITE_NAME}</h1>
      <div className="flex flex-col gap-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <p>
          O {SITE_NAME} é um site independente criado para ajudar quem joga na Lotofácil a
          conferir o resultado mais recente rapidamente, sem precisar navegar em sites lentos ou
          cheios de anúncios intrusivos.
        </p>
        <p>
          Nossos dados vêm diretamente da API pública de loterias da Caixa Econômica Federal e
          são atualizados automaticamente assim que um novo sorteio é divulgado.
        </p>
        <p>
          <strong>Não temos qualquer vínculo com a Caixa Econômica Federal.</strong> Este site
          não vende apostas, não processa pagamentos e não tem acesso a dados bancários dos
          visitantes. Toda aposta deve ser feita exclusivamente pelos canais oficiais da Caixa.
        </p>
        <p>
          Dúvidas, sugestões ou correções? Escreva para{" "}
          <a href="mailto:contato@example.com" className="text-forest hover:underline dark:text-gold">
            contato@example.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
