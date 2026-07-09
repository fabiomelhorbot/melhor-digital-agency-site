# Melhor Digital Agency — Landing Page

## Arquivos
- `index.html` — página principal
- `styles.css` — estilos
- `script.js` — interações (menu mobile, animações, envio do formulário via Formspree)
- `sitemap.xml`, `robots.txt` — SEO técnico
- `CNAME` — domínio customizado para o GitHub Pages
- `assets/logo.svg`, `assets/favicon.svg` — logo placeholder (troque pelo real)

---

## Passo 1 — Substituir os assets que faltam

Não consigo acessar o Imgur nem baixar vídeos externos no meu ambiente, então usei placeholders. Substitua estes arquivos em `assets/` mantendo os mesmos nomes:

1. `assets/videosite.mp4` — vídeo de fundo do Hero
2. `assets/logo.svg` (ou troque a extensão no HTML para `.png`) — seu logo real
3. `assets/hero-poster.jpg` — frame estático do vídeo (melhora o LCP/Core Web Vitals)
4. `assets/og-image.jpg` — imagem 1200x630px para compartilhamento (WhatsApp, LinkedIn, Instagram)

---

## Passo 2 — Ativar o formulário (Formspree)

O formulário já está integrado via `fetch`, só falta o ID do form:

1. Crie uma conta em **https://formspree.io** usando o e-mail **melhordigitalagency@gmail.com**
2. Crie um novo formulário (New Form) — qualquer nome, ex: "Site — Diagnóstico Estratégico"
3. Formspree vai te dar uma URL tipo `https://formspree.io/f/xxxxxxxx`
4. No `index.html`, procure por:
   ```html
   <form class="contact-form" id="form-contato" action="https://formspree.io/f/SEU_FORM_ID" method="POST">
   ```
   e troque `SEU_FORM_ID` pelo ID real (ex: `xxxxxxxx`)
5. Publique o site, envie um teste pelo formulário e confirme o e-mail que o Formspree manda na primeira submissão (é uma verificação única, só na primeira vez)
6. Todo lead vai cair automaticamente na caixa de entrada de **melhordigitalagency@gmail.com**, com "responder" já indo direto pro e-mail que a pessoa digitou no campo (isso é automático, porque o campo se chama `email`)

Plano gratuito do Formspree cobre 50 envios/mês — dá pra acompanhar e fazer upgrade se o volume crescer.

---

## Passo 3 — Subir no GitHub Pages

1. Crie um repositório novo no GitHub (ex: `melhor-digital-agency-site`)
2. Suba todos os arquivos desta pasta (`index.html`, `styles.css`, `script.js`, `sitemap.xml`, `robots.txt`, `CNAME`, pasta `assets/`) na raiz do repositório — não dentro de subpasta
3. No repositório: **Settings → Pages**
4. Em "Build and deployment", escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`
5. Salve. Em 1–2 minutos o GitHub te dá uma URL tipo `https://seuusuario.github.io/melhor-digital-agency-site/`

---

## Passo 4 — Conectar o domínio próprio (melhordigitalagency.com.br) via Cloudflare

Como você já está migrando o domínio pro Cloudflare:

1. No Cloudflare, vá em **DNS** do domínio `melhordigitalagency.com.br`
2. Crie os registros:
   - Tipo `CNAME`, nome `www`, destino `seuusuario.github.io`, proxy **desativado (DNS only)** enquanto o GitHub valida o certificado (pode ativar o proxy depois)
   - Tipo `A`, nome `@` (raiz), apontando para os 4 IPs do GitHub Pages:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
3. No GitHub: **Settings → Pages → Custom domain**, digite `www.melhordigitalagency.com.br` e salve (isso confirma o arquivo `CNAME` do repositório)
4. Marque **Enforce HTTPS** assim que o certificado for emitido (leva alguns minutos a poucas horas)
5. Ajuste as URLs internas do site (que hoje apontam para `https://www.melhordigitalagency.com.br/`) — já estão certas no `index.html`, `sitemap.xml` e `robots.txt`; só confirme se bate com o domínio final

---

## Antes de publicar — checklist final
- [ ] Assets substituídos (vídeo, logo, poster, og-image)
- [ ] `SEU_FORM_ID` do Formspree preenchido no `index.html`
- [ ] Domínio confirmado em canonical, Open Graph, Twitter Card, Schema.org, sitemap e robots
- [ ] E-mail de contato no rodapé (`contato@melhordigitalagency.com.br`) — já está configurado como link `mailto:`; garanta que esse e-mail existe e está sendo monitorado (pode ser um alias redirecionando pro Gmail)
- [ ] Vídeo comprimido (H.264, idealmente abaixo de 6–8MB, 15–20s em loop)
- [ ] Teste real do formulário (envio + confirmação do Formspree)
- [ ] Rodar Lighthouse/PageSpeed Insights após publicar os assets finais

## SEO já implementado
- HTML semântico (`header`, `main`, `section`, `article`, `footer`), um único `<h1>`, hierarquia `h2`/`h3` correta
- Meta title, meta description, canonical, Open Graph e Twitter Cards
- Schema.org `Organization` + `LocalBusiness` em JSON-LD
- `alt` em todas as imagens, `sitemap.xml` e `robots.txt`
- Design 100% responsivo, animações leves (`prefers-reduced-motion` respeitado), foco visível no teclado
