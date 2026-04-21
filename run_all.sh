#!/bin/bash
mkdir -p public
cat << 'SVGEOF' > public/logo.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#bg-grad)" />
  <g fill="#ffffff">
    <circle cx="200" cy="180" r="45" />
    <path d="M 140 380 Q 200 280 260 380 Z" />
    <circle cx="312" cy="180" r="45" />
    <path d="M 252 380 Q 312 280 372 380 Z" />
  </g>
  <text x="256" y="460" font-family="sans-serif" font-weight="bold" font-size="48" fill="#ffffff" text-anchor="middle">2D</text>
</svg>
SVGEOF
cp public/logo.svg public/icon-192x192.svg
cp public/logo.svg public/icon-512x512.svg

npm install -D vite-plugin-pwa

cat << 'JSEOF' > replace.cjs
const fs = require('fs');
let vite = fs.readFileSync('vite.config.ts', 'utf8');
vite = vite.replace(/import \{defineConfig, loadEnv\} from 'vite';/, "import {defineConfig, loadEnv} from 'vite';\nimport { VitePWA } from 'vite-plugin-pwa';");
vite = vite.replace(/plugins: \[react\(\), tailwindcss\(\)\],/, `plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['logo.svg', 'icon-192x192.svg', 'icon-512x512.svg'],
        manifest: {
          name: 'အပျိုကြီးများ 2D',
          short_name: 'အပျိုကြီးများ 2D',
          description: 'Mobile-first 2-digit lottery management system.',
          theme_color: '#ffffff',
          icons: [
            { src: 'icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
            { src: 'icon-512x512.svg', sizes: '512x512', type: 'image/svg+xml' },
            { src: 'icon-512x512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
          ]
        }
      })
    ],`);
fs.writeFileSync('vite.config.ts', vite);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<html lang="en">/, '<html lang="my">');
html = html.replace(/<meta name="viewport" content="width=device-width, initial-scale=1.0" \/>/, '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />\n    <meta name="theme-color" content="#ffffff" />\n    <link rel="icon" type="image/svg+xml" href="/logo.svg" />\n    <link rel="apple-touch-icon" href="/icon-192x192.svg" />');
html = html.replace(/<title>My Google AI Studio App<\/title>/, '<title>အပျိုကြီးများ 2D</title>');
fs.writeFileSync('index.html', html);
JSEOF
node replace.cjs
