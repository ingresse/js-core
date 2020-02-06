'use strict';

/**
 * Ingresse Injector Utility
 */
const _handler = require('./utils/handler.util');
const _js      = require('./utils/js.util');

/**
 * Exporting
 */
module.exports = Object.assign(_handler, {
    js: _js,
});
