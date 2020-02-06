'use strict';

/**
 * Ingresse's ESLint Configuration
 */
const eslint = {
    extends: 'react-app',
    rules  : {
        'no-alert': 1,
    },
    semi   : [
        2,
        'always'
    ],
    quotes : [
        2,
        'single'
    ],
};

/**
 * Exporting
 */
module.exports = eslint;
