# GTranslate Clone

A clone of Google Translate using React, Vite, and Jotai.

## Features

- [x] Speech-to-Text (STT) - Google Speech-to-Text API v2
- [x] Text-to-Speech (TTS) - Google Cloud Text-to-Speech
- [x] Translation - Google Cloud Translation API v3

## Development

Set up an environment file `.env` with the following content:

```env
VITE_API_BASE_URL=gtranslate_backend_api_url
```

Run development server:

```bash
pnpm install
pnpm dev
```

## Deployment

Setup a Cloudflare Account and deploy to Cloudflare Pages with the following environment variable as a secret:

- `CF_API_BASE_URL`: Backend API URL

Deploy to Cloudflare Pages:

```bash
pnpm build
pnpm deploy
```
