"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function alternar() {
    const proximoEscuro = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", proximoEscuro);
    document.documentElement.classList.toggle("light", !proximoEscuro);
    localStorage.setItem("theme", proximoEscuro ? "dark" : "light");
    setDark(proximoEscuro);
  }

  if (dark === null) {
    // Evita flash/mismatch entre o render do servidor e o tema real do cliente.
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
      className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:bg-paper-dim dark:hover:bg-forest-deep/50"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
