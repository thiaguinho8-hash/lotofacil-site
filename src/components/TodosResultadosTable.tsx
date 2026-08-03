"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ResultadoLotofacil, formatarDezenas } from "@/lib/caixa";

function extrairAno(dataApuracao: string): string {
  const partes = dataApuracao.split("/");
  return partes[2] ?? "";
}

export default function TodosResultadosTable({
  resultados,
}: {
  resultados: ResultadoLotofacil[];
}) {
  const anos = useMemo(() => {
    const unicos = Array.from(new Set(resultados.map((r) => extrairAno(r.dataApuracao))));
    return unicos.sort((a, b) => Number(b) - Number(a));
  }, [resultados]);

  const [ano, setAno] = useState("todos");
  const [busca, setBusca] = useState("");

  const filtrados = resultados.filter((r) => {
    const bateAno = ano === "todos" || extrairAno(r.dataApuracao) === ano;
    const bateBusca = busca.trim() === "" || String(r.numero).includes(busca.trim());
    return bateAno && bateBusca;
  });

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex items-center gap-2 text-sm">
          Ano:
          <select
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-forest focus:outline-none dark:border-gray-700 dark:bg-forest-deep/30"
          >
            <option value="todos">Todos</option>
            {anos.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por número do concurso"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-forest focus:outline-none dark:border-gray-700 dark:bg-forest-deep/30"
        />
      </div>

      {filtrados.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhum concurso encontrado com esse filtro.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-paper-dim text-left dark:bg-forest-deep/30">
              <tr>
                <th className="px-4 py-2 font-semibold">Concurso</th>
                <th className="px-4 py-2 font-semibold">Data</th>
                <th className="px-4 py-2 font-semibold">Dezenas</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((r) => (
                <tr
                  key={r.numero}
                  className="border-t border-gray-100 transition-colors hover:bg-paper-dim dark:border-gray-800 dark:hover:bg-forest-deep/40"
                >
                  <td className="px-4 py-2">
                    <Link href={`/lotofacil/${r.numero}`} className="font-semibold text-forest hover:underline dark:text-gold">
                      {r.numero}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{r.dataApuracao}</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    {formatarDezenas(r.listaDezenas).map((n) => String(n).padStart(2, "0")).join(" - ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
