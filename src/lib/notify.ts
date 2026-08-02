import { ResultadoLotofacil, formatarDezenas } from "@/lib/caixa";
import { SITE_URL } from "@/lib/site";

/**
 * Dispara notificação de novo resultado para a lista de assinantes, se um
 * provedor de e-mail estiver configurado via RESEND_API_KEY. Sem isso,
 * vira um no-op silencioso — deixa o gancho pronto sem forçar dependência
 * de um provedor específico (briefing não define um).
 */
export async function notificarNovoResultado(resultado: ResultadoLotofacil): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const remetente = process.env.NOTIFICATION_FROM_EMAIL;
  if (!apiKey || !remetente) return;

  const dezenas = formatarDezenas(resultado.listaDezenas).join(", ");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: remetente,
      to: [remetente], // TODO: trocar pela lista real de assinantes (ver lib/subscribers.ts)
      subject: `Resultado Lotofácil ${resultado.numero} saiu!`,
      html: `<p>Concurso ${resultado.numero} (${resultado.dataApuracao}): ${dezenas}</p><p><a href="${SITE_URL}/lotofacil/${resultado.numero}">Ver resultado completo</a></p>`,
    }),
  });
}
