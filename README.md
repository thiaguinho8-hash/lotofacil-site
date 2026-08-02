# Resultado Lotofácil

Site em Next.js (App Router) que publica os resultados da Lotofácil automaticamente,
buscando os dados direto da API pública da Caixa Econômica Federal. Otimizado para
SEO, com pontos de monetização (AdSense, link de afiliado, captura de e-mail/WhatsApp)
já deixados prontos para configurar.

## Rodando localmente

Pré-requisito: Node.js 18+ (o projeto foi criado com Node 24).

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Copie `.env.example` para `.env.local` e ajuste conforme necessário (já existe um
`.env.local` de exemplo no repositório para desenvolvimento):

```bash
cp .env.example .env.local
```

Variáveis de ambiente:

| Variável | Obrigatória? | Descrição |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Sim (para SEO correto em produção) | URL pública do site, usada em `metadataBase`, sitemap e Schema.org. |
| `NEXT_PUBLIC_AFFILIATE_URL` | Não | Link do botão "Fazer minha aposta". Sem valor, o botão fica oculto. |
| `CRON_SECRET` | Recomendado em produção | Protege `/api/cron` contra chamadas externas. A Vercel envia esse valor automaticamente em cron jobs configurados no dashboard/`vercel.json`. |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` | Não | Se definidas, a captura de e-mail/WhatsApp salva na tabela `subscribers` do Supabase. Sem elas, cai num fallback local em `data/subscribers.json` (não persistente em produção serverless — configure antes de depender disso). |
| `RESEND_API_KEY` / `NOTIFICATION_FROM_EMAIL` | Não | Se definidas, `/api/cron` dispara um e-mail via [Resend](https://resend.com) quando sai resultado novo. |

## Estrutura de páginas

- `/` — resultado do concurso mais recente em destaque + últimos 10 concursos.
- `/lotofacil/[numero]` — página individual de cada concurso (ex: `/lotofacil/3750`), gerada sob demanda (ISR) e indexável.
- `/lotofacil/resultado-de-hoje` — redireciona para o concurso mais recente.
- `/lotofacil/todos-resultados` — tabela com os concursos recentes, filtro por ano e busca.
- `/lotofacil/estatisticas` — dezenas mais e menos sorteadas, com gráfico de barras.
- `/lotofacil/conferidor` — confira seus números contra o resultado mais recente.
- `/sobre` e `/politica-de-privacidade` — páginas institucionais (exigidas pelo Google AdSense).

## Sobre a fonte de dados

A API pública da Caixa (`https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/`)
foi testada em 2026-08-01 e está ativa, retornando o formato esperado (ver `src/lib/caixa.ts`).
A Caixa já mudou esse contrato no passado — se a API parar de responder ou mudar de formato,
o código lança `CaixaApiError` com uma mensagem explícita. Nesse cenário, considere como plano B:

- Buscar "loterias-caixa-api" no GitHub (scraper mantido pela comunidade).
- Ou o pacote npm `loterias-brasil` / similar.

Toda a lógica de acesso à API está isolada em `src/lib/caixa.ts`, então trocar a fonte de
dados significa reimplementar só esse arquivo.

## Automação de conteúdo (cron)

`src/app/api/cron/route.ts` verifica se saiu um resultado novo e, se sim, revalida a home,
a página do concurso, o sitemap e as páginas de listagem/estatísticas/conferidor via
`revalidatePath`, além de (opcionalmente) disparar notificação por e-mail.

O agendamento está em `vercel.json`, rodando às 20h15 (horário de Brasília = 23h15 UTC),
de segunda a sábado:

```json
{ "crons": [{ "path": "/api/cron", "schedule": "15 23 * * 1-6" }] }
```

Cron jobs da Vercel só ficam ativos após o deploy (não rodam com `next dev`). No plano
Hobby, cada cron pode disparar no máximo uma vez por dia — o agendamento acima já respeita
isso.

Para testar a rota manualmente:

```bash
curl http://localhost:3000/api/cron
```

## Deploy na Vercel

1. Suba este repositório para o GitHub (ou GitLab/Bitbucket).
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. Configure as variáveis de ambiente do projeto (aba **Environment Variables**) — pelo
   menos `NEXT_PUBLIC_SITE_URL` com o domínio final (ex: `https://seudominio.com.br`).
4. Deploy. O `vercel.json` já registra o cron job automaticamente.
5. Depois de aprovado no Google AdSense, cole o snippet oficial substituindo os placeholders
   `<div id="ad-...">` em `src/components/AdSlot.tsx` (ou envolva o componente com o script
   real do AdSense).

## Fora do escopo do MVP

Login de usuário, app mobile e outras loterias (Mega-Sena, Quina) não foram implementados —
a arquitetura (`src/lib/caixa.ts` parametrizado por `tipoJogo`/rota) permite adicionar depois,
mas o MVP atual cobre só Lotofácil, conforme o briefing original.
