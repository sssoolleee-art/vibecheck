import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'vibecheck',
  brand: {
    displayName: '바이브체크',
    primaryColor: '#7C3AED',
    icon: 'https://raw.githubusercontent.com/sssoolleee-art/assets/main/icon.png',
  },
  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'vite',
      build: 'vite build',
    },
  },
  permissions: [],
});
