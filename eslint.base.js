import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'


export const createBaseConfig = (customIgnores = []) => defineConfig(
  // global folder ignoring (instead of .eslintignore)
  {
    ignores: ['dist/', 'node_modules/', 'eslint.config.js', ...customIgnores],
  },

  // Base recommended configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // basic recommended rules and environment for all JS/TS files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
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
        ...globals.node, // includes support for the Node.js server-side environment.
        ...globals.jest, // to prevent ESLint from complaining about the test functions `describe`, `test`, and `expect`
      },
    },
    rules: {
      // typescript rules
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
      '@typescript-eslint/no-unused-vars': [
        "warn",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        },
      ],

      // custom restriction rules
      'no-restricted-syntax': ['warn', {
        selector: 'TSEnumDeclaration',
        message: 'Use object look up instead',
      }],

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
      '@stylistic/object-curly-newline': ['warn', {
        multiline: true,
        consistent: true,
        minProperties: Infinity,
      }],
      '@stylistic/padding-line-between-statements': ['warn',
        { blankLine: 'always', prev: 'let', next: 'return' },
        { blankLine: 'always', prev: 'const', next: 'return' },
        { blankLine: 'always', prev: 'block-like', next: 'return' },
      ],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: { delimiter: 'none' },
        singleline: { delimiter: 'semi', requireLast: false },
        multilineDetection: 'brackets',
      }],
    },
  }
)
