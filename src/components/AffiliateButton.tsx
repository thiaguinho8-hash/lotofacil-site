import { AFFILIATE_URL } from "@/lib/site";

export default function AffiliateButton({ className = "" }: { className?: string }) {
  if (!AFFILIATE_URL) return null;

  return (
    <a
      href={AFFILIATE_URL}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-sm transition duration-150 ease-out hover:bg-amber-700 hover:shadow-md active:scale-[0.98] ${className}`}
    >
      Fazer minha aposta
    </a>
  );
}
