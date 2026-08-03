import type { Metadata } from "next";
import Link from "next/link";
import LotofacilTabs from "@/components/LotofacilTabs";
import AdSlot from "@/components/AdSlot";
import { BLOG_POSTS } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "Blog — dicas, bolão, probabilidade e estatísticas da Lotofácil",
  description:
    "Artigos sobre como funciona o bolão, as chances reais de ganhar, fechamento, concursos especiais e estatísticas da Lotofácil.",
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <LotofacilTabs active="blog" />

      <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl">Blog</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        Artigos sobre bolão, probabilidade, fechamento e estatísticas da Lotofácil, sem promessa
        de fórmula mágica — só o que os números realmente dizem.
      </p>

      <ul className="flex flex-col gap-4">
        {BLOG_POSTS.map((post) => (
          <li
            key={post.slug}
            className="rounded-xl border border-gray-200 p-5 transition-colors hover:border-gold/40 hover:bg-gold/10/40 dark:border-gray-800 dark:hover:border-forest-deep dark:hover:bg-forest-deep/20"
          >
            <Link href={`/lotofacil/blog/${post.slug}`} className="block">
              <h2 className="mb-1 font-bold transition-colors hover:text-forest dark:hover:text-gold">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      <AdSlot id="ad-blog-index" label="Espaço publicitário" className="my-10 h-24 w-full" />
    </div>
  );
}
