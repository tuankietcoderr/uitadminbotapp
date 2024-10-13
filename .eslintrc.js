const {plugins, ...prettierRules} = require('./.prettierrc.js');

module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['prettier', '@tanstack/query'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'prettier/prettier': ['error', prettierRules],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react-native/no-inline-styles': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-shadow': 'off',
    'react/no-unstable-nested-components': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/no-rest-destructuring': 'warn',
    '@tanstack/query/stable-query-client': 'error',
  },
};
