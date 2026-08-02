import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "last-concurso.json");

/**
 * Guarda o último número de concurso processado pelo cron, para não
 * revalidar/notificar de novo se o cron rodar mais de uma vez sem que um
 * novo resultado tenha saído. Baseado em arquivo local — funciona bem
 * localmente; em produção serverless (Vercel) o filesystem não é
 * persistente entre invocações, então na prática cada disparo do cron
 * volta a comparar contra "nenhum" e revalida de novo. Isso é inofensivo
 * (revalidação é idempotente), só reduz a otimização de pular trabalho
 * repetido. Trocar por KV/Redis se isso importar em produção.
 */
export async function getUltimoConcursoProcessado(): Promise<number | null> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const data = JSON.parse(raw);
    return typeof data.numero === "number" ? data.numero : null;
  } catch {
    return null;
  }
}

export async function setUltimoConcursoProcessado(numero: number): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify({ numero }, null, 2), "utf-8");
}
