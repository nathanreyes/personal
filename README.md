# personal

My personal site — [nathanreyes.com](https://nathanreyes.com).

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).
Static pages are served from Cloudflare Workers assets; only the contact form
reaches the Worker.

## Develop

Requires Node 22+ (see `.nvmrc`).

```sh
npm install
npm run dev        # astro dev  -> http://localhost:4321
npm run build      # -> dist/
npm run preview    # serve the built site
npm run check      # type-check .astro / .ts
npx wrangler dev   # run the built site behind the Worker
```

## Deploy

```sh
npm run deploy     # astro build && wrangler deploy
```

`wrangler.jsonc` declares the custom domains, so deploying reconciles routes
against that file — a domain added only in the dashboard is dropped on the next
deploy. After changing bindings, regenerate types with `npm run cf-typegen`.

The contact form emails `CONTACT_EMAIL`; that address must be verified as a
Cloudflare Email Routing destination before the first send. Submissions are
capped per visitor IP by the `CONTACT_RATE_LIMIT` binding.

A [Turnstile](https://developers.cloudflare.com/turnstile/) widget guards the
form, and the Worker verifies its token before it sends. The contact page
loads Turnstile's script; no other page ships JavaScript. The sitekey is public
and lives in `src/pages/contact.astro`. The secret is a Worker secret:

```sh
npx wrangler secret put TURNSTILE_SECRET
```

The Worker only accepts tokens issued on the hostnames in
`TURNSTILE_HOSTNAMES` (`wrangler.jsonc`). For local runs, put
`TURNSTILE_SECRET` and `TURNSTILE_HOSTNAMES=localhost` in `.dev.vars`.

## Content

Blog posts are markdown in `src/content/blog/`, validated by the schema in
`src/content.config.ts`:

```yaml
---
title: 'Post title'
date: 2026-01-31
summary: 'Shown on the blog index.'
cover: 'https://…' # optional
draft: false # omit to publish
---
```

Projects live in `src/data/projects.ts`, typed by the `Project` interface.
