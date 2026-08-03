import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getUltimoResultadoSemCache } from "@/lib/caixa";
import { getUltimoConcursoProcessado, setUltimoConcursoProcessado } from "@/lib/lastConcurso";
import { notificarNovoResultado } from "@/lib/notify";

export const dynamic = "force-dynamic";

function autorizado(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // Sem CRON_SECRET configurado: permite apenas em desenvolvimento local.
    // Em produção, a ausência da variável bloqueia a rota (fail-closed).
    return process.env.NODE_ENV !== "production";
  }
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!autorizado(request)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const ultimo = await getUltimoResultadoSemCache();
  const processadoAnteriormente = await getUltimoConcursoProcessado();
  const houveNovoResultado = ultimo.numero !== processadoAnteriormente;

  if (houveNovoResultado) {
    revalidatePath("/");
    revalidatePath(`/lotofacil/${ultimo.numero}`);
    revalidatePath("/lotofacil/resultado-de-hoje");
    revalidatePath("/lotofacil/todos-resultados");
    revalidatePath("/lotofacil/estatisticas");
    revalidatePath("/lotofacil/conferidor");
    revalidatePath("/sitemap.xml");

    await setUltimoConcursoProcessado(ultimo.numero);
    await notificarNovoResultado(ultimo).catch((error) =>
      console.error("Falha ao notificar assinantes:", error)
    );
  }

  return NextResponse.json({
    ok: true,
    concursoAtual: ultimo.numero,
    novoResultado: houveNovoResultado,
  });
}
