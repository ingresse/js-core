/**
 * Base
 */
import injector from'../injector';

/**
 * Browser JS Injection
 *
 * @param {string} id      - TAG ID attribute
 * @param {string} target  - TAG Name to be inserted into
 * @param {string} src     - TAG Source reference
 * @param {any}    content - TAG Content
 *
 * @return {Promise} injection status
 */
function js(options) {
    const {
        id      = '',
        target  = 'body',
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
        ...rest
    });
}

/**
 * Exporting
 */
export default js;
