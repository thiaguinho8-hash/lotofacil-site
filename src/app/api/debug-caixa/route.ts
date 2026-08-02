import { NextResponse } from "next/server";

// Rota de diagnóstico TEMPORÁRIA — investigar por que a API da Caixa falha
// em produção na Vercel. Não expõe segredos, só o status/corpo bruto da
// resposta da Caixa vista pelo próprio servidor. Remover depois de resolvido.
export const dynamic = "force-dynamic";

export async function GET() {
  const url = "https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/";
  const tentativas = [];

  const variacoesHeaders: Record<string, string>[] = [
    {
      "User-Agent": "Mozilla/5.0 (compatible; LotofacilResultadosBot/1.0)",
      Accept: "application/json",
    },
    {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "application/json, text/plain, */*",
    },
  ];

  for (const [i, headers] of variacoesHeaders.entries()) {
    try {
      const inicio = Date.now();
      const response = await fetch(url, { headers, cache: "no-store" });
      const duracaoMs = Date.now() - inicio;
      const corpo = await response.text();

      tentativas.push({
        tentativa: i + 1,
        headersEnviados: headers,
        status: response.status,
        statusText: response.statusText,
        duracaoMs,
        responseHeaders: Object.fromEntries(response.headers.entries()),
        corpoPrimeiros500Chars: corpo.slice(0, 500),
      });
    } catch (error) {
      tentativas.push({
        tentativa: i + 1,
        headersEnviados: headers,
        erro: (error as Error).message,
        erroStack: (error as Error).stack,
      });
    }
  }

  return NextResponse.json({ url, tentativas });
}
