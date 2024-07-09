// eslint-disable-next-line no-undef
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'off',

    // general
    indent: ['warn', 2],
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    'no-multi-spaces': 'warn',
    'eol-last': ['warn', 'always'],
    'arrow-parens': ['warn', 'as-needed'],
    'space-in-parens': ['warn', 'never'],
    'no-trailing-spaces': 'warn',
    'key-spacing': ['warn', { beforeColon: false }],
    'comma-dangle': ['warn', 'always-multiline'],
    'operator-linebreak': ['warn', 'before'],
    'padding-line-between-statements': ['warn',
      { blankLine: 'always', prev: 'let', next: 'return' },
      { blankLine: 'always', prev: 'const', next: 'return' },
      { blankLine: 'always', prev: 'block-like', next: 'return' },
    ],
    'object-curly-newline': ['warn', {
      multiline: true,
      consistent: true,
      minProperties: Infinity,
    }],

    // typescript
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],

    // react
    'jsx-quotes': ['warn', 'prefer-single'],

    // custom
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
          'react-helmet',
        ],
      }],
    }],
  },
  overrides: [
    // cancel the ban on imports for their initialization files
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
  ],
}
