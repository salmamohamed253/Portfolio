/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { stripPending } from './build/strip-pending.ts';

/**
 * GitHub Pages serves a project site from https://<user>.github.io/<repo>/,
 * so asset URLs must be prefixed with the repository name (case-sensitive).
 * A repository named <user>.github.io is a user site served from the root.
 *
 * Resolution order:
 *   1. BASE_PATH, if set (e.g. BASE_PATH=/ for a custom domain).
 *   2. The repository name from GITHUB_REPOSITORY, set automatically in GitHub Actions.
 *   3. '/Portfolio/' for local builds.
 */
export function resolveBase(env: NodeJS.ProcessEnv = process.env): string {
  if (env.BASE_PATH) return env.BASE_PATH;
  const repo = env.GITHUB_REPOSITORY?.split('/')[1];
  if (repo) return repo.toLowerCase().endsWith('.github.io') ? '/' : `/${repo}/`;
  return '/Portfolio/';
}

const base = resolveBase();

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
