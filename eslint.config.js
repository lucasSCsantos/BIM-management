import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import pluginImport from 'eslint-plugin-import';
import checkFile from 'eslint-plugin-check-file';
import prettier from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'src/components/ui/**/*', 'src/components/icons/**/*']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      pluginImport.flatConfigs.recommended,
      prettier,
    ],
    plugins: {
      'check-file': checkFile,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // Always try to resolve types under <root>@types
          project: './tsconfig.app.json', // 👈 Point this to the tsconfig file containing your paths!
        },
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/features/projects',
              from: './src/features',
              except: ['./projects'],
            },
            {
              target: './src/features/disciplines',
              from: './src/features',
              except: ['./disciplines'],
            },
            {
              target: './src/features/models',
              from: './src/features',
              except: ['./models'],
            },
            {
              target: './src/features/revisions',
              from: './src/features',
              except: ['./revisions'],
            },
            {
              target: './src/features/documents',
              from: './src/features',
              except: ['./documents'],
            },
            {
              target: './src/features/professionals',
              from: './src/features',
              except: ['./professionals'],
            },
            {
              target: './src/features',
              from: './src/app',
              message: 'Do not import features from app. Use the feature directly.',
            },
            {
              target: [
                './src/components',
                './src/hooks',
                './src/lib',
                './src/types',
                './src/utils',
              ],
              from: ['./src/features', './src/app'],
              message:
                'Do not import from features or app. Use the component, hook, lib, type, or util directly.',
            },
          ],
        },
      ],
      'check-file/filename-blocklist': [
        'error',
        {
          // Força o uso de .types.ts em vez de .type.ts
          '**/*.type.ts': '*.types.ts',

          // Força o uso de .store.ts no singular (bloqueia .stores.ts ou .store.ts com caminhos incorretos)
          '**/*.stores.ts': '*.store.ts',

          // Força o uso de .api.ts no singular
          '**/*.apis.ts': '*.api.ts',
        },
      ],
      'check-file/no-index': 'error',
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/components/**/*.{jsx,tsx}': 'PASCAL_CASE',

          'src/hooks/**/*.ts': 'CAMEL_CASE',

          'src/services/**/*.api.ts': 'KEBAB_CASE',
          'src/types/**/*.types.ts': 'KEBAB_CASE',
          'src/store/**/*.store.ts': 'KEBAB_CASE',
          'src/utils/**/*.ts': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
]);
