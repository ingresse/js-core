/**
 * Base
 */
const injector = require('../injector');

/**
 * Browser JS Injection
 *
 * @param {string}          id      - TAG ID attribute
 * @param {string|function} content - TAG Content
 * @param {string}          target  - TAG Name to be inserted into
 *
 * @return {Promise} injection status
 */
function js({
    id      = '',
    target  = 'head',
    src     = undefined,
    content = undefined,
    ...rest
}) {
    return injector({
        tag    : 'script',
        content: content,
        id,
        target,
        src,
        ...rest
    });
}

/**
 * Exporting
 */
module.exports = js;
