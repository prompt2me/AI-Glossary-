import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // Determine base path for GitHub Pages or other hosting environments
  const getBase = () => {
    // 1. Explicit base path passed by GitHub Actions (e.g. via configure-pages)
    if (process.env.BASE_PATH) {
      const bp = process.env.BASE_PATH;
      return bp.endsWith('/') ? bp : `${bp}/`;
    }
    // 2. Automated detection from GitHub repository name (e.g. "username/ai-glossary")
    if (process.env.GITHUB_REPOSITORY) {
      const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
      if (repoName && !repoName.endsWith('.github.io')) {
        return `/${repoName}/`;
      }
      return '/';
    }
    // 3. Fallback to relative path for generic hosting or local previews
    return './';
  };

  return {
    base: getBase(),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
