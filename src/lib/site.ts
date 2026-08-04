export const SITE_NAME = "Resultado Lotofácil";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

// Não existe programa de afiliados legítimo/autorizado pela Caixa para a
// Lotofácil (é loteria federal, monopólio da Caixa) — sites que oferecem
// comissão de indicação nesse nicho não têm credencial comprovada de casa
// lotérica licenciada, então o botão de apostar linka direto pro site
// oficial, sem comissão. Se aparecer uma variável de ambiente configurada
// no futuro, ela tem prioridade (ex: um programa de afiliado que venha a
// ser validado como legítimo).
export const AFFILIATE_URL =
  process.env.NEXT_PUBLIC_AFFILIATE_URL || "https://www.loteriasonline.caixa.gov.br/";
