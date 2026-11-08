/**
 * Serializa JSON-LD pra ir dentro de <script>. JSON.stringify não escapa "<",
 * então um valor vindo de API de terceiros contendo "</script>" fecharia a
 * tag e injetaria HTML. Escapar "<" como \u003c mantém o JSON válido e seguro.
 */
export function serializarJsonLd(dados: unknown): string {
  return JSON.stringify(dados).replace(/</g, "\u003c");
}
