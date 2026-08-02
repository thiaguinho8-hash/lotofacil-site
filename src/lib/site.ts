export const SITE_NAME = "Resultado Lotofácil";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

// Link de afiliado configurável — trocar via variável de ambiente assim que
// um programa de afiliado for definido. Sem valor configurado, o botão some.
export const AFFILIATE_URL = process.env.NEXT_PUBLIC_AFFILIATE_URL || "";
