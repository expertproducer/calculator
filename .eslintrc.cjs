module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint','react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  env: { browser: true, es2021: true },
  ignorePatterns: ['dist','node_modules'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn'
  }
} 