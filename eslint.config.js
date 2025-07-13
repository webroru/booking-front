import vue from 'eslint-plugin-vue';

export default [
    {
        files: ['**/*.js', '**/*.vue'],
        plugins: {
            vue,
        },
        extends: [
            'plugin:vue/vue3-essential',
            'eslint:recommended',
        ],
        rules: {
            'vue/multi-word-component-names': 'off',
            'semi': ['error', 'always'],
            'vue/script-indent': ['error', 2, { baseIndent: 1 }],
        },
    },
];