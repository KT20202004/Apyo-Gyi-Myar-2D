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
