module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'always'],
    'semi-spacing': 'error',
    curly: ['error', 'multi-line'],
    'switch-colon-spacing': 'error',
    'no-fallthrough': ['off'],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true
      }
    ],
    'no-var': 'error',
    'no-unused-vars': ['error', { args: 'none' }],
    'prefer-const': 'error',
    'valid-jsdoc': [
      'error',
      {
        requireParamDescription: false,
        requireReturnDescription: false,
        requireReturn: false,
        prefer: { returns: 'return' }
      }
    ],
    'require-jsdoc': ['error', {
      'require': {
          'FunctionDeclaration': true,
          'MethodDefinition': true,
          'ClassDeclaration': true,
          'ArrowFunctionExpression': true,
          'FunctionExpression': true
      }
  }],
    'no-array-constructor': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'no-new-wrappers': 'error',
    'no-new-object': 'error',
    'quote-props': ['error', 'consistent'],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'no-throw-literal': 'error',
    'default-case': 'error',
    'class-methods-use-this': 'error',
    'no-with': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-invalid-this': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
    camelcase: ['error', { properties: 'never' }],
    'eol-last': 'error',
    'func-call-spacing': 'error',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'new-cap': 'error',
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'no-trailing-spaces': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        asyncArrow: 'always',
        anonymous: 'never',
        named: 'never'
      }
    ],
    'spaced-comment': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'rest-spread-spacing': 'error',
    'no-console': 'off',
    'class-methods-use-this': 'off',
  }
};
