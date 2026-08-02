export default function DadosIndisponiveis({
  mensagem = "Não conseguimos buscar os dados da Caixa agora. Tente novamente em alguns minutos.",
}: {
  mensagem?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <p className="text-lg font-semibold">Resultado temporariamente indisponível</p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{mensagem}</p>
    </div>
  );
}
