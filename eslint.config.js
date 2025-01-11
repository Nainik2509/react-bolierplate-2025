import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/build',
      '**/node_modules',
      '**/dist',
      '**/server',
      '**/.env',
      '**/.env.local',
      '**/.env.*.local',
      '**/npm-debug.log*',
      '**/yarn-debug.log*',
      '**/yarn-error.log*',
      '**/pnpm-debug.log*',
      '**/.idea',
      '**/.DS_Store',
      '**/.history',
      '**/.vscode',
      '**/*.suo',
      '**/*.ntvs*',
      '**/*.njsproj',
      '**/*.sln',
      '**/*.sw?',
      '**/*.pem',
      '**/*.pub',
      '**/*.zip',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      react,
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'import/no-extraneous-dependencies': ['off'],
      'no-underscore-dangle': 'off',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'], // NodeJs || ReactJS built-in modules OR External modules (external to the project)
            'internal', // Internal modules (inside the project)
            'parent', // Parent directories' modules (outside the project)
            'sibling', // Sibling modules (inside the same or nested directories)
            'index', // Index file in the current directory
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];
