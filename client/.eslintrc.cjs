module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
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
    'arrow-parens': ['warn', 'always'],
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
          '**/../common/*',
          '**/../Launcher/*',
          '**/../components/*',
          '**/../pages/*',
          '**/../screens/*',
          '**/../tests/*',
        ],
      }, {
        message: 'Use import from "Launcher" instead.',
        group: [
          'locale',
          'store',
          'api',
          'i18next',
          '@reach/router',
          'react-i18next',
        ],
      }, {
        message: 'Use component overrides from "components".',
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
        '**/components/lib/**/*component.ts*',
        '**/common/tools/index.ts',
        '**/locale/locale.conf.ts',
        '**/Launcher/**/*.ts*',
      ],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
}