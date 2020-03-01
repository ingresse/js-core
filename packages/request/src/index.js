/**
 * Ingresse's Requests Utilities
 */
import request from './request';
import get     from './methods/get';
import post    from './methods/post';
import put     from './methods/put';
import del     from './methods/del';
import jsonp   from './methods/jsonp';

/**
 * Exporting
 */
export {
    request as default,
    get,
    post,
    put,
    del,
    jsonp,
};
