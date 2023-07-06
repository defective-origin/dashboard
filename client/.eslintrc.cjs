module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',

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

    // typescript
    '@typescript-eslint/no-empty-function': 'off',

    // react
    'jsx-quotes': ['warn', 'prefer-single'],

    // custom
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'TSEnumDeclaration',
        message: 'Use object look up instead',
      },
    ],
    'no-restricted-imports': [
      'warn',
      {
        patterns: [
          {
            group: ['lodash', 'lodash-es', 'classnames', 'weak-key'],
            message: 'Use import from "common" instead.',
          },
          {
            group: [
              '**/../*',
              '**/../common/*',
              '**/../Launcher/*',
              '**/../components/*',
              '**/../pages/*',
              '**/../screens/*',
              '**/../tests/*',
            ],
            message: 'Use direct import, example "components".',
          },
          {
            group: [
              'locale',
              'store',
              'api',
              'i18next',
              '@reach/router',
              'react-i18next',
            ],
            message: 'Use import from "Launcher" instead.',
          },
          {
            group: [
              '@emotion/react',
              '@emotion/styled',
              '@mui/material',
              'react-helmet',
            ],
            message: 'Use component overrides from "components".',
          },
        ],
      },
    ],
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
