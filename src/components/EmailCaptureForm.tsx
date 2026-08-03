"use client";

import { useId, useState, FormEvent } from "react";

export default function EmailCaptureForm() {
  const inputId = useId();
  const [contato, setContato] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [erro, setErro] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setErro("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contato }),
      });
      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao cadastrar.");
        setStatus("error");
        return;
      }

      setStatus("ok");
      setContato("");
    } catch {
      setErro("Erro de conexão. Tente novamente.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
        Cadastrado! Você vai receber o resultado assim que sair.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <label htmlFor={inputId} className="sr-only">
        E-mail ou WhatsApp
      </label>
      <input
        id={inputId}
        type="text"
        required
        value={contato}
        onChange={(e) => setContato(e.target.value)}
        placeholder="Seu e-mail ou WhatsApp com DDD"
        className="flex-1 rounded-full border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-forest focus:outline-none dark:border-gray-700 dark:bg-forest-deep/30"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white transition duration-150 ease-out hover:bg-gold-deep hover:shadow-md active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100"
      >
        {status === "loading" ? "Enviando..." : "Receber resultado"}
      </button>
      {status === "error" && <p className="text-sm text-red-600 sm:ml-2 sm:self-center">{erro}</p>}
    </form>
  );
}
