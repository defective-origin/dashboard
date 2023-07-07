module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'color-hex-length': 'long',
    'color-hex-case': 'upper',
    'color-no-hex': false,
    'color-no-invalid-hex': true,
    'string-quotes': 'single',
    'no-extra-semicolons': true,
    'block-no-empty': false,
  },
}
