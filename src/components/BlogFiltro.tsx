"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BlogPost,
  CATEGORIAS_BLOG,
  formatarDataPost,
  tempoLeituraMin,
} from "@/lib/blogPosts";

function CardPost({ post, destaque = false }: { post: BlogPost; destaque?: boolean }) {
  return (
    <Link
      href={`/lotofacil/blog/${post.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-forest/12 bg-paper-dim/60 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md dark:border-gold/10 dark:bg-forest-deep/20"
    >
      <span className="inline-flex w-fit items-center rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold-deep dark:bg-gold/20 dark:text-gold-bright">
        {post.categoria}
      </span>
      <h2
        className={`font-display font-semibold leading-snug text-ink transition-colors group-hover:text-forest dark:text-paper dark:group-hover:text-gold-bright ${
          destaque ? "text-2xl sm:text-3xl" : "text-lg"
        }`}
      >
        {post.title}
      </h2>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        {post.description}
      </p>
      <p className="mt-auto text-xs font-medium text-gray-500 dark:text-gray-400">
        {formatarDataPost(post.publishedAt)} · {tempoLeituraMin(post)} min de leitura
      </p>
    </Link>
  );
}

export default function BlogFiltro({ posts }: { posts: BlogPost[] }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);

  const filtrados = useMemo(
    () => (categoriaAtiva ? posts.filter((p) => p.categoria === categoriaAtiva) : posts),
    [posts, categoriaAtiva]
  );

  const [destaque, ...resto] = filtrados;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategoriaAtiva(null)}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
            categoriaAtiva === null
              ? "bg-forest text-white dark:bg-gold dark:text-ink"
              : "bg-paper-dim text-gray-700 hover:bg-gold/15 dark:bg-forest-deep/30 dark:text-gray-300"
          }`}
        >
          Todos
        </button>
        {CATEGORIAS_BLOG.map((categoria) => (
          <button
            key={categoria}
            type="button"
            onClick={() => setCategoriaAtiva(categoria)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              categoriaAtiva === categoria
                ? "bg-forest text-white dark:bg-gold dark:text-ink"
                : "bg-paper-dim text-gray-700 hover:bg-gold/15 dark:bg-forest-deep/30 dark:text-gray-300"
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>

      {filtrados.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Nenhum artigo nessa categoria ainda.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {destaque && <CardPost post={destaque} destaque />}
          {resto.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {resto.map((post) => (
                <CardPost key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
