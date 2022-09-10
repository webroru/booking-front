/* eslint-env node */
module.exports = {
  'root': true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'semi': ['error', 'always'],
    'vue/script-indent': ['error', 2, { 'baseIndent': 1 }],
  },
};
