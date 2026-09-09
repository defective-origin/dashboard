import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
  // global folder ignoring (instead of .eslintignore)
  {
    ignores: ['dist/', 'node_modules/', 'coverage/'],
  },

  // basic recommended rules and environment for all JS/TS files
  {
    files: ['**/*.{js,ts}'],
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
      // base recommendations
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.reduce((acc, config) => ({ ...acc, ...config.rules }), {}),

      // logical rules TypeScript
      '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],

      // @stylistic rules (formatting rules removed from the ESLint core and old ts plugin)
      '@stylistic/indent': ['warn', 2],
      '@stylistic/semi': ['warn', 'never'],
      '@stylistic/quotes': ['warn', 'single'],
      '@stylistic/no-multi-spaces': 'warn',
      '@stylistic/eol-last': ['warn', 'always'],
      '@stylistic/arrow-parens': ['warn', 'as-needed'],
      '@stylistic/space-in-parens': ['warn', 'never'],
      '@stylistic/no-trailing-spaces': ['warn', { ignoreComments: true }],
      '@stylistic/key-spacing': ['warn', { beforeColon: false }],
      '@stylistic/operator-linebreak': ['warn', 'before'],
      '@stylistic/object-curly-newline': ['warn', {
        multiline: true,
        consistent: true,
        minProperties: Infinity,
      }],
      '@stylistic/comma-dangle': ['warn', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      }],
      '@stylistic/padding-line-between-statements': ['warn',
        { blankLine: 'always', prev: 'let', next: 'return' },
        { blankLine: 'always', prev: 'const', next: 'return' },
        { blankLine: 'always', prev: 'block-like', next: 'return' },
      ],
    },
  },
]
