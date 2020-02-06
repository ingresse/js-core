'use strict';

/**
 * Ingresse's Requests Utilities
 */
const _handler = require('./utils/handler.util');
const _get     = require('./utils/get.util');
const _post    = require('./utils/post.util');
const _put     = require('./utils/put.util');
const _delete  = require('./utils/delete.util');
const _jsonp   = require('./utils/jsonp.util');

/**
 * Exporting
 */
module.exports = Object.assign(_handler, {
    get  : _get,
    post : _post,
    put  : _put,
    del  : _delete,
    jsonp: _jsonp,
});
