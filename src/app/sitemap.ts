import type { MetadataRoute } from "next";
import { getUltimoResultado } from "@/lib/caixa";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { SITE_URL } from "@/lib/site";

// Quantos concursos antigos incluir no sitemap (as páginas continuam
// acessíveis e indexáveis além disso, só não entram na listagem do XML).
const CONCURSOS_NO_SITEMAP = 200;

// Se a API da Caixa estiver fora do ar no momento do build, o sitemap sai
// só com as páginas fixas (catch abaixo); com revalidate, ele se completa
// sozinho depois, sem precisar de novo deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paginasFixas: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/lotofacil/resultado-de-hoje`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/lotofacil/todos-resultados`, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/lotofacil/estatisticas`, changeFrequency: "daily", priority: 0.6 },
    { url: `${SITE_URL}/lotofacil/conferidor`, changeFrequency: "daily", priority: 0.6 },
    { url: `${SITE_URL}/lotofacil/bolao`, changeFrequency: "daily", priority: 0.6 },
    { url: `${SITE_URL}/lotofacil/como-jogar`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/lotofacil/perguntas-frequentes`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/lotofacil/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/lotofacil/glossario`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/sobre`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/politica-de-privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const paginasDeBlog: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/lotofacil/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  let paginasDeConcurso: MetadataRoute.Sitemap = [];
  try {
    const ultimo = await getUltimoResultado();
    paginasDeConcurso = Array.from({ length: CONCURSOS_NO_SITEMAP }, (_, i) => {
      const numero = ultimo.numero - i;
      return numero > 0
        ? { url: `${SITE_URL}/lotofacil/${numero}`, changeFrequency: "never" as const, priority: 0.5 }
        : null;
    }).filter((entry): entry is NonNullable<typeof entry> => entry !== null);
  } catch {
    paginasDeConcurso = [];
  }

  return [...paginasFixas, ...paginasDeBlog, ...paginasDeConcurso];
}
