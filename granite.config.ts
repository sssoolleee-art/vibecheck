import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'desireindex',
  brand: {
    displayName: '욕망 지수',
    primaryColor: '#C0392B',
    icon: 'https://static.toss.im/appsintoss/27863/f3b58c21-4cff-416b-aff4-490e884f3427.png',
  },
  web: {
    host: 'localhost',
    port: 5184,
    commands: {
      dev: 'vite',
      build: 'vite build',
    },
  },
  permissions: [],
});
