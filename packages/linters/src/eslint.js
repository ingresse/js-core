'use strict';

/**
 * Ingresse's ESLint Configuration
 */
const eslint = {
    extends: 'react-app',
    rules  : {
        'jsx-quotes': ['error','prefer-double'],
        'react/prop-types': [1],
        'react/no-unused-prop-types': [1],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/require-default-props': [1],
        'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],

        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        indent: ['error', 4],
        'max-len': ['error', { 'code': 150 }],
        'arrow-parens': ['error', 'always'],
        'arrow-spacing': 'error',
        'keyword-spacing': ['error', { 'after': true }],
        'space-before-blocks': 'error',
        'object-curly-spacing': ['error', 'always'],

        'no-var': 'error',
        'no-alert': 'warn',
        'no-console': ['error', { 'allow': ['warn', 'error'] }],
        'no-extra-semi': 'error',
        'no-multi-spaces': ['error', { 'exceptions': { 'VariableDeclarator': true } }],
        'no-const-assign': 'error',
        'no-confusing-arrow': 'error',
        'no-duplicate-imports': 'error',
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
        'padding-line-between-statements': [
            'error',
            { 'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*'},
            { 'blankLine': 'any',    'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var']}
        ],
        'newline-before-return': 'error',
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always'
        }]
    }
};

/**
 * Exporting
 */
module.exports = eslint;
