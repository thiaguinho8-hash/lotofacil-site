import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Política de privacidade do ${SITE_NAME}: quais dados coletamos, uso de cookies e publicidade.`,
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-extrabold">Política de Privacidade</h1>
      <div className="flex flex-col gap-5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <p>Última atualização: {new Date().toLocaleDateString("pt-BR")}.</p>

        <section>
          <h2 className="mb-1 font-bold text-gray-900 dark:text-gray-100">1. Dados que coletamos</h2>
          <p>
            Coletamos apenas o e-mail ou WhatsApp que você nos fornece voluntariamente ao se
            cadastrar para receber avisos de resultado. Não pedimos CPF, dados bancários ou
            qualquer informação de pagamento.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-bold text-gray-900 dark:text-gray-100">2. Cookies e publicidade</h2>
          <p>
            Este site pode exibir anúncios fornecidos pelo Google AdSense. O Google e seus
            parceiros podem usar cookies para exibir anúncios com base em visitas anteriores suas
            a este e outros sites. Você pode desativar a publicidade personalizada acessando as{" "}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline dark:text-blue-400"
            >
              Configurações de anúncios do Google
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-bold text-gray-900 dark:text-gray-100">3. Links de afiliado</h2>
          <p>
            Alguns links deste site (como o botão &quot;Fazer minha aposta&quot;) são links de
            afiliado. Podemos receber uma comissão caso você clique e realize uma ação no site de
            destino, sem custo adicional para você.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-bold text-gray-900 dark:text-gray-100">4. Uso dos dados</h2>
          <p>
            O e-mail/WhatsApp cadastrado é usado exclusivamente para enviar avisos de novos
            resultados. Não vendemos nem compartilhamos esses dados com terceiros para fins de
            marketing. Você pode solicitar a remoção do seu cadastro a qualquer momento.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-bold text-gray-900 dark:text-gray-100">5. Contato</h2>
          <p>
            Dúvidas sobre privacidade? Escreva para{" "}
            <a href="mailto:contato@example.com" className="text-blue-700 hover:underline dark:text-blue-400">
              contato@example.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
