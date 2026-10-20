import type { Plugin } from 'vite';

/**
 * Pending entries are hidden in production, but their text would still be
 * bundled. This plugin blanks the string arguments of `pending('...')` calls
 * in src/data during production builds so open questions never ship.
 */
const PENDING_CALL = /\bpending\(\s*'(?:\\.|[^'\\])*'(?:\s*,\s*'(?:\\.|[^'\\])*')?\s*\)/g;

export function stripPending(): Plugin {
  return {
    name: 'strip-pending',
    apply: 'build',
    enforce: 'pre',
    transform(code, id) {
      if (!/\/src\/data\/[^/]+\.ts$/.test(id) || id.endsWith('.test.ts')) return null;
      return { code: code.replace(PENDING_CALL, "pending('')"), map: null };
    },
  };
}
