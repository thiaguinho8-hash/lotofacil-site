import { ResultadoLotofacil, formatarDezenas } from "@/lib/caixa";
import { listarAssinantesEmail } from "@/lib/subscribers";
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

  const destinatarios = await listarAssinantesEmail();
  if (destinatarios.length === 0) return;

  const dezenas = formatarDezenas(resultado.listaDezenas).join(", ");
  const assunto = `Resultado Lotofácil ${resultado.numero} saiu!`;
  const html = `<p>Concurso ${resultado.numero} (${resultado.dataApuracao}): ${dezenas}</p><p><a href="${SITE_URL}/lotofacil/${resultado.numero}">Ver resultado completo</a></p>`;

  // Um envio por destinatário (não usa "to" com todos juntos) para não
  // expor o e-mail de um assinante para os outros.
  await Promise.all(
    destinatarios.map((destinatario) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: remetente,
          to: [destinatario],
          subject: assunto,
          html,
        }),
      }).catch((error) => console.error(`Falha ao notificar ${destinatario}:`, error))
    )
  );
}
