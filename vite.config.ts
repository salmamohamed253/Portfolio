/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { stripPending } from './build/strip-pending.ts';

/**
 * GitHub Pages serves a project site from https://<user>.github.io/<repo>/,
 * so every asset URL must be prefixed with the repository name. The repo is
 * "Portfolio" (case-sensitive). Override with BASE_PATH, e.g. BASE_PATH=/ for
 * a user site or a custom domain.
 */
const base = process.env.BASE_PATH ?? '/Portfolio/';

export default defineConfig({
  base,
  plugins: [react(), stripPending()],
  build: {
    target: 'es2022',
    sourcemap: false,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
