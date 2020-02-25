/**
 * Base
 */
import injector from'../injector';

/**
 * Browser JS Injection
 *
 * @param {string}          id      - TAG ID attribute
 * @param {string|function} content - TAG Content
 * @param {string}          target  - TAG Name to be inserted into
 *
 * @return {Promise} injection status
 */
function js(options) {
    const {
        id      = '',
        target  = 'head',
        src     = undefined,
        content = undefined,
        ...rest
    } = (options || {});

    return injector({
        tag    : 'script',
        content: content,
        id,
        target,
        src,
        ...(rest || {})
    });
}

/**
 * Exporting
 */
export default js;
