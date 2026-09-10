import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import storybook from 'eslint-plugin-storybook'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
  // Global ignore patterns (replaces .eslintignore)
  {
    ignores: ['dist/', 'build/', 'node_modules/', '.storybook/', 'storybook-static/'],
  },

  // Base recommended configurations injected directly into the flat array
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Main configuration block for application files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
    },
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: true,
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
      'react-refresh/only-export-components': 'off',

      // @stylistic rules (replaces formatting rules removed from ESLint core)
      '@stylistic/indent': ['warn', 2],
      '@stylistic/semi': ['warn', 'never'],
      '@stylistic/quotes': ['warn', 'single'],
      '@stylistic/no-multi-spaces': 'warn',
      '@stylistic/eol-last': ['warn', 'always'],
      '@stylistic/arrow-parens': ['warn', 'as-needed'],
      '@stylistic/space-in-parens': ['warn', 'never'],
      '@stylistic/no-trailing-spaces': ['warn', { ignoreComments: true }],
      '@stylistic/key-spacing': ['warn', { beforeColon: false }],
      '@stylistic/comma-dangle': ['warn', 'always-multiline'],
      '@stylistic/operator-linebreak': ['warn', 'before'],
      '@stylistic/padding-line-between-statements': ['warn',
        { blankLine: 'always', prev: 'let', next: 'return' },
        { blankLine: 'always', prev: 'const', next: 'return' },
        { blankLine: 'always', prev: 'block-like', next: 'return' },
      ],
      '@stylistic/object-curly-newline': ['warn', {
        multiline: true,
        consistent: true,
        minProperties: Infinity,
      }],
      '@stylistic/jsx-quotes': ['warn', 'prefer-single'],
      '@stylistic/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],

      // typescript rules
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],

      // custom restriction rules
      'no-restricted-syntax': ['warn', {
        selector: 'TSEnumDeclaration',
        message: 'Use object look up instead',
      }],
      'no-restricted-imports': ['warn', {
        patterns: [{
          message: 'Use import from "common" instead.',
          group: ['lodash', 'lodash-es', 'classnames', 'weak-key'],
        }, {
          message: 'Use direct import, example "components".',
          group: [
            '**/../*',
            '**/../tools/*',
            '**/../hooks/*',
            '**/../Launcher/*',
            '**/../components/*',
            '**/../pages/*',
            '**/../screens/*',
            '**/../tests/*',
          ],
        }, {
          message: 'Use import from "locale", "router", "store" or "api" instead as ---| core |--- import.',
          group: [
            'i18next',
            'react-router-dom',
            'react-i18next',
          ],
        }, {
          message: 'Use component overrides from "components" instead as ---| components |--- import..',
          group: [
            '@emotion/react',
            '@emotion/styled',
            '@mui/material',
            'react-helmet-async',
          ],
        }],
      }],
    },
  },

  // Flat configuration for Storybook
  ...storybook.configs['flat/recommended'],

  // Overrides to bypass import restrictions for initialization files
  {
    files: [
      '**/components/**/*component.ts*',
      '**/tools/**/*.ts',
      '**/hooks/**/*.ts',
      '**/theme/**/*.ts*',
      '**/Launcher/**/*.ts*',
      '**/locale/**/*.ts*',
      '**/router/**/*.ts*',
      '**/store/**/*.ts*',
      '**/api/**/*.ts*',
    ],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
]
