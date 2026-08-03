"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TermoGlossario } from "@/lib/glossario";

export default function GlossarioBusca({ termos }: { termos: TermoGlossario[] }) {
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return termos;
    return termos.filter(
      (t) => t.termo.toLowerCase().includes(q) || t.definicao.toLowerCase().includes(q)
    );
  }, [termos, busca]);

  return (
    <div>
      <input
        type="search"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar um termo (ex: bolão, cota, teimosinha)"
        aria-label="Buscar termo no glossário"
        className="mb-8 w-full rounded-full border border-forest/20 bg-paper-dim px-5 py-3 text-sm transition-colors focus:border-forest focus:outline-none dark:border-gold/15 dark:bg-forest-deep/20"
      />

      {filtrados.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Nenhum termo encontrado pra &ldquo;{busca}&rdquo;.
        </p>
      ) : (
        <dl className="flex flex-col gap-6">
          {filtrados.map((t) => (
            <div
              key={t.termo}
              className="border-b border-forest/10 pb-6 last:border-0 dark:border-gold/10"
            >
              <dt className="font-display text-lg font-bold text-forest dark:text-gold-bright">
                {t.termo}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {t.definicao}
                {t.linkRelacionado && (
                  <>
                    {" "}
                    <Link
                      href={t.linkRelacionado.href}
                      className="font-semibold text-forest hover:underline dark:text-gold"
                    >
                      {t.linkRelacionado.label} →
                    </Link>
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
