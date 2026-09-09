/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss',
  ],
  plugins: [
    '@stylistic/stylelint-plugin',
  ],

  // ignored folders directly within the config (instead of .stylelintignore)
  ignoreFiles: [
    'dist/**/*',
    'build/**/*',
    'node_modules/**/*',
  ],

  rules: {
    /* redefinition of logical rules */
    'color-hex-length': 'long',
    'color-named': 'never',
    'color-no-invalid-hex': true,
    'block-no-empty': null,
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'property-no-unknown': null,
    'declaration-block-single-line-max-declarations': null,
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['global', 'export'],
    }],

    // @stylistic (formatting rules removed from the StyleLint core)
    '@stylistic/indentation': 2,
    '@stylistic/color-hex-case': 'upper',
    '@stylistic/string-quotes': 'single',
    '@stylistic/no-extra-semicolons': true,
    '@stylistic/no-eol-whitespace': true,
    '@stylistic/declaration-block-trailing-semicolon': 'always',
  },
}
