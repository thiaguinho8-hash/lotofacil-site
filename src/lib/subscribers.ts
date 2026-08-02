import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json");

interface Subscriber {
  contato: string;
  tipo: "email" | "whatsapp";
  criadoEm: string;
}

/**
 * Salva um assinante. Usa Supabase se SUPABASE_URL/SUPABASE_ANON_KEY
 * estiverem configuradas (produção); caso contrário grava em
 * data/subscribers.json (funciona local e sem custo, mas não é persistente
 * em serverless na Vercel — trocar por Supabase ou Google Sheets antes de
 * depender disso em produção).
 */
export async function salvarAssinante(
  contato: string,
  tipo: "email" | "whatsapp"
): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    const response = await fetch(`${supabaseUrl}/rest/v1/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ contato, tipo, criado_em: new Date().toISOString() }),
    });

    if (!response.ok) {
      throw new Error(`Falha ao salvar assinante no Supabase: ${response.status}`);
    }
    return;
  }

  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });

  let atuais: Subscriber[] = [];
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    atuais = JSON.parse(raw);
  } catch {
    atuais = [];
  }

  atuais.push({ contato, tipo, criadoEm: new Date().toISOString() });
  await fs.writeFile(DATA_FILE, JSON.stringify(atuais, null, 2), "utf-8");
}
