import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import boundaries from 'eslint-plugin-boundaries'

export default defineConfig(
  { ignores: ['**/dist/**', '**/node_modules/**'] },

  // 1. Baseline for all TS/TSX
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: { globals: globals.browser },
  },

  // 2. React rules (apps only): paste the react-hooks and react-refresh
  //    blocks from the generated apps/fitness/eslint.config.js here,
  //    scoped with files: ['apps/*/src/**/*.{ts,tsx}'].
  //    Their setup syntax varies by plugin version, so copy, don't guess.

  // 3. Architecture boundaries
  {
    files: ['apps/*/src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        typescript: { project: ['apps/*/tsconfig.app.json'] },
      },
      'boundaries/elements': [
        { type: 'feature', pattern: 'apps/*/src/features/*', capture: ['app', 'feature'] },
        { type: 'shared',  pattern: 'apps/*/src/shared',     capture: ['app'] },
        { type: 'routes',  pattern: 'apps/*/src/routes',     capture: ['app'] },
        { type: 'root',    pattern: 'apps/*/src/*.{ts,tsx}', mode: 'file', capture: ['app'] },
      ],
    },
    rules: {
      'boundaries/element-types': ['error', {
        default: 'disallow',
        rules: [
          { from: 'feature', allow: ['shared'] },
          { from: 'routes',  allow: ['feature', 'shared'] },
          { from: 'root',    allow: ['routes', 'feature', 'shared'] },
          // no entry for 'shared': it can't import features or routes
        ],
      }],
    },
  },
)