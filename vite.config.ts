import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  /**
   * GitHub Pages:
   * - User/Org pages repo: <name>.github.io  -> base should be '/'
   * - Project pages repo:  <repo>            -> base should be '/<repo>/'
   */
  base: (() => {
    const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
    const isActions = process.env.GITHUB_ACTIONS === 'true';

    if (!isActions || !repo) return '/';
    if (repo.endsWith('.github.io')) return '/';
    return `/${repo}/`;
  })(),
  // Для GitHub Pages без Actions: собираем в /docs и включаем "Deploy from a branch".
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
