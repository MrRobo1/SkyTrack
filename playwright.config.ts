import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Dossier où sont stockés les tests
  timeout: 30000, // Temps maximum pour chaque test
  retries: 2, // Réexécuter les tests échoués
  use: {
    headless: true, // Mode sans interface graphique
    baseURL: 'http://localhost:3000', // URL de ton application
  },
});