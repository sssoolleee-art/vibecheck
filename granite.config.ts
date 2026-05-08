import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'vibecheck',
  brand: {
    displayName: '바이브체크',
    primaryColor: '#7C3AED',
    icon: 'https://static.toss.im/appsintoss/27863/632933b5-c722-4b43-b879-00874e9ead34.png',
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
