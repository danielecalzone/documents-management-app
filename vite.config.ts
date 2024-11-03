import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'documents-management-app',
        short_name: 'documents-management',
        description: 'documents management web application',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/add-icon.svg',
            type: 'image/svg+xml',
          },
          {
            src: '/bell-alarm-icon.svg',
            type: 'image/svg+xml',
          },
          {
            src: '/documents-icon.svg',
            type: 'image/svg+xml',
          },
          {
            src: '/grid-icon.svg',
            type: 'image/svg+xml',
          },
          {
            src: '/list-icon.svg',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'http-cache',
            },
          },
        ],
        swDest: 'dist/sw.js',
      },
    }),
  ],
});
