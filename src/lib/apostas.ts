/** Combinação simples C(n, k), usada para calcular quantas apostas de 15
 * dezenas uma aposta com mais números marcados equivale. */
export function combinacao(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  const kMin = Math.min(k, n - k);
  let resultado = 1;
  for (let i = 0; i < kMin; i++) {
    resultado = (resultado * (n - i)) / (i + 1);
  }
  return Math.round(resultado);
}

// Valor da aposta mínima (15 dezenas), vigente desde jul/2025. A Caixa pode
// reajustar esse valor a qualquer momento — sempre exibir como estimativa.
export const PRECO_APOSTA_MINIMA = 3.5;

export const DEZENAS_MIN = 15;
export const DEZENAS_MAX = 20;

/** Custo de uma aposta da Lotofácil com N dezenas marcadas (15 a 20). */
export function custoApostaLotofacil(dezenasMarcadas: number): number {
  return combinacao(dezenasMarcadas, 15) * PRECO_APOSTA_MINIMA;
}
