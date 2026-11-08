import { formatarDezenas, formatarMoeda, type ResultadoLoteria } from "./loteriaCore";

function plural(n: number, singular: string, pluralForm: string): string {
  return n === 1 ? singular : pluralForm;
}

function listar(nums: number[]): string {
  const f = nums.map((n) => String(n).padStart(2, "0"));
  if (f.length <= 1) return f.join("");
  return `${f.slice(0, -1).join(", ")} e ${f[f.length - 1]}`;
}

/** Maior sequência de dezenas consecutivas (ex: 04-05-06) dentro das sorteadas. */
function maiorSequencia(ordenadas: number[]): number[] {
  let melhor: number[] = [];
  let atual: number[] = [];
  for (const n of ordenadas) {
    atual = atual.length > 0 && n === atual[atual.length - 1] + 1 ? [...atual, n] : [n];
    if (atual.length > melhor.length) melhor = atual;
  }
  return melhor;
}

/**
 * Parágrafos descritivos calculados só a partir do resultado (e do concurso
 * anterior, quando disponível) — nada inventado e nada preditivo.
 */
export function gerarAnaliseConcurso(
  resultado: ResultadoLoteria,
  anterior: ResultadoLoteria | null,
  nomeLoteria: string
): string[] {
  const dezenas = formatarDezenas(resultado.listaDezenas);
  const paragrafos: string[] = [];

  const pares = dezenas.filter((n) => n % 2 === 0).length;
  const impares = dezenas.length - pares;
  const soma = dezenas.reduce((a, n) => a + n, 0);
  let perfil = `No concurso ${resultado.numero} da ${nomeLoteria}, as ${dezenas.length} dezenas sorteadas incluíram ${pares} ${plural(pares, "número par", "números pares")} e ${impares} ${plural(impares, "ímpar", "ímpares")}. A soma das dezenas foi ${soma}, com a menor sendo ${String(dezenas[0]).padStart(2, "0")} e a maior ${String(dezenas[dezenas.length - 1]).padStart(2, "0")}.`;
  const seq = maiorSequencia(dezenas);
  if (seq.length >= 2) {
    perfil += ` A maior sequência de dezenas consecutivas foi ${listar(seq)}.`;
  }
  paragrafos.push(perfil);

  if (anterior) {
    const anteriores = new Set(formatarDezenas(anterior.listaDezenas));
    const repetidas = dezenas.filter((n) => anteriores.has(n));
    if (repetidas.length === 0) {
      paragrafos.push(
        `Nenhuma dezena se repetiu em relação ao concurso anterior (${anterior.numero}).`
      );
    } else {
      paragrafos.push(
        `Em relação ao concurso anterior (${anterior.numero}), ${repetidas.length} ${plural(repetidas.length, "dezena se repetiu", "dezenas se repetiram")}: ${listar(repetidas)}.`
      );
    }
  }

  const faixas = resultado.listaRateioPremio;
  if (faixas.length > 0) {
    const principal = faixas.reduce((a, b) => (b.faixa < a.faixa ? b : a));
    if (principal.numeroDeGanhadores > 0) {
      paragrafos.push(
        `A faixa principal (${principal.descricaoFaixa}) teve ${principal.numeroDeGanhadores.toLocaleString("pt-BR")} ${plural(principal.numeroDeGanhadores, "ganhador", "ganhadores")}, com prêmio de ${formatarMoeda(principal.valorPremio)} por aposta vencedora.`
      );
    } else if (resultado.acumulado) {
      paragrafos.push(
        `Ninguém acertou a faixa principal (${principal.descricaoFaixa}), então o prêmio acumulou${resultado.valorAcumuladoProximoConcurso > 0 ? `: ${formatarMoeda(resultado.valorAcumuladoProximoConcurso)} acumulados para o próximo concurso` : ""}.`
      );
    }
  }

  if (resultado.valorArrecadado > 0) {
    paragrafos.push(`A arrecadação total do concurso foi de ${formatarMoeda(resultado.valorArrecadado)}.`);
  }

  return paragrafos;
}
