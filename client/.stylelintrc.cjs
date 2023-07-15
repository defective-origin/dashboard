module.exports = {
  extends: [
    'stylelint-config-standard-scss',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    indentation: 2,
    'color-hex-length': 'long',
    'color-hex-case': 'upper',
    'color-named': 'never',
    'color-no-invalid-hex': true,
    'string-quotes': 'single',
    'no-extra-semicolons': true,
    'no-eol-whitespace': true,
    'block-no-empty': null,
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'property-no-unknown': null,
    'declaration-block-single-line-max-declarations': null,
    'declaration-block-trailing-semicolon': 'always',
    'selector-pseudo-class-no-unknown': [true, {
      'ignorePseudoClasses': ['global', 'export']
    }],
  },
}
