import type { Metadata } from "next";
import LotofacilTabs from "@/components/LotofacilTabs";
import AdSlot from "@/components/AdSlot";
import BlogFiltro from "@/components/BlogFiltro";
import { BLOG_POSTS } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "Blog — dicas, bolão, probabilidade e estatísticas da Lotofácil",
  description:
    "Artigos sobre como funciona o bolão, as chances reais de ganhar, fechamento, concursos especiais e estatísticas da Lotofácil.",
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <LotofacilTabs active="blog" />

      <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-gold-deep dark:text-gold">
        Blog
      </p>
      <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl">
        Sem fórmula mágica, só o que os números realmente dizem
      </h1>
      <p className="mb-10 max-w-2xl text-gray-600 dark:text-gray-300">
        Artigos sobre bolão, probabilidade, fechamento e estatísticas da Lotofácil — escritos
        pra te ajudar a entender o jogo, não pra vender uma estratégia infalível que não existe.
      </p>

      <BlogFiltro posts={BLOG_POSTS} />

      <AdSlot id="ad-blog-index" label="Espaço publicitário" className="my-10 h-24 w-full" />
    </div>
  );
}
