import type { NextConfig } from "next";

// Cabeçalhos de segurança básicos. CSP completa fica de fora de propósito:
// o site usa script inline (tema escuro) e vai carregar AdSense, o que exige
// uma política mais elaborada pra não quebrar anúncios.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
