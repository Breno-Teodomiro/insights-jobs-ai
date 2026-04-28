---
description: Deploy na Vercel via CLI
---

# Deploy na Vercel

## Pré-requisitos
1. Ter o Vercel CLI instalado: `npm i -g vercel`
2. Estar logado na Vercel: `npx vercel login`

## Passos para Deploy

### 1. Deploy de Preview (teste)
```bash
npx vercel
```
- Gera um link temporário para testar
- Não afeta o site em produção

### 2. Deploy em Produção
```bash
npx vercel --prod
```
- Publica no site oficial
- URL: https://insights-jobs-ai.vercel.app

### 3. Deploy com Build Limpo (recomendado se houver erros)
```bash
npx vercel --prod --force
```
- Ignora cache de build anterior
- Útil quando o build anterior falhou

## Verificar Status do Deploy
```bash
npx vercel list
```

## Variáveis de Ambiente (se necessário configurar)
```bash
npx vercel env add NEXT_PUBLIC_APP_URL
npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
npx vercel env add CLERK_SECRET_KEY
```
