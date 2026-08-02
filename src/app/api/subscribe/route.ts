import { NextRequest, NextResponse } from "next/server";
import { salvarAssinante } from "@/lib/subscribers";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_REGEX = /^\+?\d{10,14}$/;

export async function POST(request: NextRequest) {
  let body: { contato?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const contato = body.contato?.trim();
  if (!contato) {
    return NextResponse.json({ error: "Informe um e-mail ou WhatsApp." }, { status: 400 });
  }

  let tipo: "email" | "whatsapp" | null = null;
  if (EMAIL_REGEX.test(contato)) {
    tipo = "email";
  } else if (WHATSAPP_REGEX.test(contato.replace(/[^\d+]/g, ""))) {
    tipo = "whatsapp";
  }

  if (!tipo) {
    return NextResponse.json(
      { error: "Use um e-mail válido ou um número de WhatsApp com DDD." },
      { status: 400 }
    );
  }

  try {
    await salvarAssinante(contato, tipo);
  } catch (error) {
    console.error("Erro ao salvar assinante:", error);
    return NextResponse.json(
      { error: "Não foi possível salvar agora. Tente novamente em instantes." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
