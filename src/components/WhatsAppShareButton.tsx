export default function WhatsAppShareButton({
  texto,
  className = "",
}: {
  texto: string;
  className?: string;
}) {
  const href = `https://wa.me/?text=${encodeURIComponent(texto)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-sm transition duration-150 ease-out hover:bg-[#1fb955] hover:shadow-md active:scale-[0.98] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.15-1.35a9.96 9.96 0 0 0 4.89 1.28h.01c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm0 18.15c-1.53 0-3.03-.41-4.34-1.19l-.31-.18-3.06.8.82-2.98-.2-.31a8.14 8.14 0 0 1-1.26-4.38c0-4.52 3.68-8.19 8.2-8.19s8.2 3.67 8.2 8.19-3.68 8.19-8.2 8.19Zm4.5-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.04 0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.51.59.19 1.12.16 1.55.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.08.15-1.18-.06-.1-.22-.16-.47-.28Z" />
      </svg>
      Compartilhar
    </a>
  );
}
