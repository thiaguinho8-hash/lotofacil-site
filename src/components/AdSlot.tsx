/**
 * Placeholder de slot de anúncio. O id fica pronto para colar o snippet do
 * Google AdSense (<ins class="adsbygoogle" ...>) depois da aprovação —
 * nenhum código de anúncio real roda até isso ser preenchido.
 */
export default function AdSlot({
  id,
  label,
  className = "",
}: {
  id: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      id={id}
      data-ad-slot={id}
      aria-hidden="true"
      className={`flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400 dark:border-gray-700 dark:bg-gray-900 ${className}`}
    >
      {label}
    </div>
  );
}
