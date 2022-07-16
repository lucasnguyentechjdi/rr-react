module.exports = {
  root: true,
  extends: [
    '@react-native-community/eslint-config', // Default RN config
    'standard-with-typescript', // Installed in step 2
    'eslint-config-prettier', // Installed in step 3
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser', // Installed in step 2
  plugins: [
    '@typescript-eslint', // Installed in step 2
    'react', // Installed in step 1
    'react-native', // Installed in step 1
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json', // Required for Standard plugin
  },
  env: {
    'react-native/react-native': true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-use-before-define': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/rule-name': 'off',
    '@typescript-eslint/default-param-last': ['off'],
    indent: [2, 2, {SwitchCase: 1}],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error', {allow: ['arrowFunctions', 'generatorFunctions']}],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'snake_case', 'UPPER_CASE', 'PascalCase'],
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['off'],
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'linebreak-style': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {},
      'babel-plugin-root-import': {
        rootPathPrefix: '~Root',
        rootPathSuffix: 'src',
      },
      node: {
        paths: ['src'],
        extensions: ['ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
