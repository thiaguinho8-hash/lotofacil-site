import { ResultadoLotofacil, formatarDezenas } from "@/lib/caixa";

export interface FrequenciaDezena {
  dezena: number;
  vezes: number;
}

export function calcularFrequencias(resultados: ResultadoLotofacil[]): FrequenciaDezena[] {
  const contagem = new Map<number, number>();
  for (let n = 1; n <= 25; n++) contagem.set(n, 0);

  for (const resultado of resultados) {
    for (const dezena of formatarDezenas(resultado.listaDezenas)) {
      contagem.set(dezena, (contagem.get(dezena) ?? 0) + 1);
    }
  }

  return Array.from(contagem.entries())
    .map(([dezena, vezes]) => ({ dezena, vezes }))
    .sort((a, b) => b.vezes - a.vezes);
}
