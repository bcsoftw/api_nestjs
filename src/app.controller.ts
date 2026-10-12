import { Controller, Get, Header } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

const DOCS_URL = 'https://apinestjs-wine.vercel.app/docs';

const WELCOME_HTML = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>API NestJS</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --paper: #e9eef4;
      --ink: #14213d;
      --muted: #4a5878;
      --line: #c3cddc;
      --cobalt: #2f5bff;
      --cobalt-ink: #ffffff;
      --ok: #178a5c;
      --panel: #14213d;
      --panel-text: #dfe7f5;
      --panel-dim: #8e9dbd;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --paper: #0f1626;
        --ink: #e8edf7;
        --muted: #9aa8c7;
        --line: #26324d;
        --cobalt: #6c8cff;
        --cobalt-ink: #0f1626;
        --ok: #4fd1a0;
        --panel: #172036;
        --panel-text: #dfe7f5;
        --panel-dim: #7f8fb2;
      }
    }
    * { box-sizing: border-box; }
    html { -webkit-text-size-adjust: 100%; }
    body {
      margin: 0;
      background: var(--paper);
      color: var(--ink);
      font-family: 'Bricolage Grotesque', 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.55;
    }
    main {
      max-width: 960px;
      margin: 0 auto;
      padding: 72px 24px 56px;
    }
    h1 {
      font-size: clamp(2.6rem, 8vw, 5.2rem);
      line-height: 0.98;
      letter-spacing: -0.035em;
      font-weight: 800;
      margin: 0 0 20px;
    }
    .lead {
      font-size: 1.2rem;
      max-width: 52ch;
      color: var(--muted);
      margin: 0 0 32px;
    }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
    .btn {
      display: inline-block;
      padding: 14px 24px;
      border-radius: 6px;
      background: var(--cobalt);
      color: var(--cobalt-ink);
      font-weight: 600;
      font-size: 1rem;
      text-decoration: none;
    }
    .btn:hover { filter: brightness(1.08); }
    .btn:focus-visible, a:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; }
    .url { font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace; font-size: 0.9rem; color: var(--muted); }

    .request {
      margin: 56px 0 0;
      background: var(--panel);
      color: var(--panel-text);
      border-radius: 8px;
      padding: 22px 24px;
      font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
      font-size: 0.92rem;
      line-height: 1.7;
      overflow-x: auto;
    }
    .request .dim { color: var(--panel-dim); }
    .request .status { color: #5fe0aa; }

    h2 { font-size: 1.25rem; margin: 56px 0 4px; letter-spacing: -0.01em; }
    dl { margin: 0; border-top: 1px solid var(--line); }
    .row {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 16px;
      padding: 16px 0;
      border-bottom: 1px solid var(--line);
    }
    dt { font-weight: 600; }
    dd { margin: 0; color: var(--muted); max-width: 60ch; }
    footer { margin-top: 48px; color: var(--muted); font-size: 0.9rem; }
    @media (max-width: 560px) {
      main { padding-top: 48px; }
      .row { grid-template-columns: 1fr; gap: 2px; }
    }
  </style>
</head>
<body>
  <main>
    <h1>API NestJS</h1>
    <p class="lead">
      Registra usuarios, inicia sesión y consume los recursos protegidos con un token JWT.
      Todos los endpoints están documentados y se pueden probar desde el navegador.
    </p>
    <div class="actions">
      <a class="btn" href="${DOCS_URL}">Abrir documentación</a>
      <span class="url">${DOCS_URL}</span>
    </div>

    <pre class="request"><span class="dim">GET</span> /docs
<span class="dim">Host:</span> api-nestjs-beige.vercel.app
<span class="dim">Authorization:</span> Bearer &lt;tu_token_jwt&gt;

<span class="status">200 OK</span></pre>

    <h2>Con qué está construida</h2>
    <dl>
      <div class="row"><dt>NestJS</dt><dd>Framework de Node.js con TypeScript que organiza la API en módulos, controladores y servicios.</dd></div>
      <div class="row"><dt>JWT</dt><dd>Autenticación con tokens. Envíalo en la cabecera Authorization para acceder a las rutas protegidas.</dd></div>
      <div class="row"><dt>PostgreSQL</dt><dd>Base de datos relacional donde se guardan los datos.</dd></div>
      <div class="row"><dt>Prisma</dt><dd>ORM que define el esquema y ejecuta las consultas con tipado seguro.</dd></div>
      <div class="row"><dt>Swagger</dt><dd>Documentación interactiva: revisa cada endpoint y envía peticiones de prueba.</dd></div>
    </dl>

    <footer>¿Primera vez aquí? Abre la documentación, inicia sesión y usa el botón Authorize para pegar tu token.</footer>
  </main>
</body>
</html>`;

@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  welcome(): string {
    return WELCOME_HTML;
  }
}
