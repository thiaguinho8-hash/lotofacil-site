import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import EmailCaptureForm from "./EmailCaptureForm";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex flex-col gap-3 py-10">
          <h2 className="text-base font-bold tracking-tight">Receba o resultado no seu e-mail</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Um aviso simples assim que o sorteio sair, sem spam.
          </p>
          <EmailCaptureForm />
        </div>

        <div className="flex flex-col gap-4 border-t border-gray-200 py-6 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Dados obtidos da API oficial da Caixa Econômica Federal. {SITE_NAME} é um site
            independente de consulta rápida e não é o site oficial da Caixa.
          </p>
          <nav aria-label="Links institucionais" className="flex shrink-0 gap-4">
            <Link href="/sobre" className="transition-colors hover:text-blue-700 dark:hover:text-blue-400">
              Sobre
            </Link>
            <Link
              href="/politica-de-privacidade"
              className="transition-colors hover:text-blue-700 dark:hover:text-blue-400"
            >
              Política de privacidade
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
