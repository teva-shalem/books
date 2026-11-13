/* eslint-disable @typescript-eslint/no-magic-numbers */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@stylistic'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
  ],
  rules: {
    /* JavaScript rules */
    'line-comment-position': 2,
    'vars-on-top': 2,
    'require-await': 2,
    'prefer-template': 2,
    'prefer-destructuring': 2,
    'prefer-const': 2,
    'prefer-arrow-callback': 2,
    'object-shorthand': 2,
    'no-var': 2,
    'no-useless-return': 2,
    'no-useless-rename': 2,
    'no-useless-concat': 2,
    '@typescript-eslint/no-unused-expressions': 2,
    'no-unneeded-ternary': 2,
    'no-undef-init': 2,
    'no-throw-literal': 2,
    '@typescript-eslint/no-shadow': 2,
    'no-multi-assign': 2,
    'no-return-assign': 2,
    'no-param-reassign': 2,
    'no-negated-condition': 2,
    '@typescript-eslint/no-magic-numbers': [2, {ignore: [0, 1]}],
    'no-loop-func': 2,
    'no-lonely-if': 2,
    'no-lone-blocks': 2,
    'no-implicit-globals': 2,
    'no-implicit-coercion': 2,
    'no-extend-native': 2,
    'no-eq-null': 2,
    'no-else-return': 2,
    'no-console': 2,
    'no-alert': 2,
    'multiline-comment-style': 2,
    '@typescript-eslint/init-declarations': 2,
    'func-style': 2,
    'eqeqeq': 2,
    'dot-notation': 2,
    'default-case': 2,
    'consistent-return': 2,
    'capitalized-comments': 2,
    'camelcase': 2,
    'require-atomic-updates': 2,
    '@typescript-eslint/no-use-before-define': 2,
    'no-template-curly-in-string': 2,
    'no-self-compare': 2,
    'no-promise-executor-return': 2,
    'no-new-native-nonconstructor': 2,
    'no-duplicate-imports': 2,
    'no-await-in-loop': 2,
    'array-callback-return': 2,
    /* TypeScript rules */
    
    /* Stylistic rules */
    '@stylistic/array-bracket-spacing': 2,
    '@stylistic/semi': [2, 'never'],
    '@stylistic/comma-dangle': [2, 'always-multiline'],
  },
  overrides: [
    {
      files: ['scripts/**/*'],
      rules: {
        'no-console': 0,
      },
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/init-declarations': 0,
      },
    },
    {
      files: ['**/*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
    {
      files: ['**/*.vue'],
      extends: [
        'plugin:vue/essential',
      ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
      },
      rules: {
        'vue/multi-word-component-names': 0,
      },
    },
  ],
}
