import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LotofacilTabs from "@/components/LotofacilTabs";
import AdSlot from "@/components/AdSlot";
import AffiliateButton from "@/components/AffiliateButton";
import { BLOG_POSTS, getBlogPost } from "@/lib/blogPosts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/lotofacil/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.description },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    url: `${SITE_URL}/lotofacil/blog/${post.slug}`,
    author: { "@type": "Organization", name: SITE_NAME },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LotofacilTabs active="blog" />

      <nav aria-label="breadcrumb" className="mb-4 text-sm text-gray-500">
        <Link href="/lotofacil/blog" className="hover:underline">
          Blog
        </Link>{" "}
        / {post.title}
      </nav>

      <h1 className="mb-6 text-2xl font-extrabold sm:text-3xl">{post.title}</h1>

      <div className="flex flex-col gap-8">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-2 text-lg font-bold">{section.heading}</h2>
            <div className="flex flex-col gap-3">
              {section.paragraphs.map((paragrafo, i) => (
                <p key={i} className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {paragrafo}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <AdSlot id={`ad-blog-${post.slug}`} label="Espaço publicitário" className="my-10 h-24 w-full" />

      <section className="rounded-2xl border border-gray-200 bg-gold/10 p-5 text-center dark:border-gray-800 dark:bg-gold/20">
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">Pronto para apostar?</p>
        <AffiliateButton />
      </section>

      <p className="mt-10 text-xs text-gray-400 dark:text-gray-600">
        {SITE_NAME} não é o site oficial da Caixa Econômica Federal. Este conteúdo é informativo
        e não constitui garantia de resultado — a Lotofácil é um jogo de azar.
      </p>
    </div>
  );
}
