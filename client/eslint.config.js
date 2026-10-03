import { defineConfig } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import storybook from 'eslint-plugin-storybook'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import { createBaseConfig } from '../eslint.base.js'

export default defineConfig([
  ...createBaseConfig(['build/', '.storybook/', 'storybook-static/', '**/*.snap']),
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'off',
      '@stylistic/jsx-quotes': ['warn', 'prefer-single'],
      '@stylistic/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],

      'no-restricted-imports': ['warn', {
        patterns: [{
          message: 'Use direct import, example "components".',
          group: [
            '**/../*',
            '**/../App/*',
            '**/../components/*',
            '**/../screens/*',
            '**/../pages/*',
            '**/../hooks/*',
            '**/../theme/*',
            '**/../tools/*',
            '**/../router/*',
            '**/../locale/*',
            '**/../api/*',
          ],
        }, {
          message: 'Use import from "core" instead.',
          group: ['lodash', 'lodash-es', '@emotion/css', 'classnames', 'weak-key'],
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

  // Storybook configuration
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
])
