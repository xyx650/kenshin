module.exports = {
  extends: [
    require.resolve('@umijs/fabric/dist/eslint'),
    'plugin:react-hooks/recommended'
  ],
  rules: {
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-nested-ternary': 'off',
    'no-restricted-globals': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'no-console': 'off'
  }
}
