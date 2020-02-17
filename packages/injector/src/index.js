'use strict';

/**
 * Ingresse Injector Utility
 */
const _injector = require('./injector');
const _js       = require('./methods/js');

/**
 * Exporting
 */
module.exports = Object.assign(_injector, {
    js: _js,
});
