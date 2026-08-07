import { NextRequest, NextResponse } from "next/server";

// Consolida sinal de SEO no domínio próprio: o endereço antigo da Vercel
// continua funcionando tecnicamente, mas redireciona (308, permanente)
// pro domínio novo, preservando caminho, query string e método HTTP.
const DOMINIO_ANTIGO = "lotofacil-site-two.vercel.app";
const DOMINIO_NOVO = "lotofacilagora.com.br";

export function middleware(request: NextRequest) {
  if (request.headers.get("host") === DOMINIO_ANTIGO) {
    const url = new URL(request.url);
    url.protocol = "https:";
    url.host = DOMINIO_NOVO;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
