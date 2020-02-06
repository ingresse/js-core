'use strict';

/**
 * Ingresse's Requests Utilities
 */
const _request = require('./request');
const _get     = require('./methods/get');
const _post    = require('./methods/post');
const _put     = require('./methods/put');
const _delete  = require('./methods/delete');
const _jsonp   = require('./methods/jsonp');

/**
 * Exporting
 */
module.exports = Object.assign(_request, {
    get  : _get,
    post : _post,
    put  : _put,
    del  : _delete,
    jsonp: _jsonp,
});
