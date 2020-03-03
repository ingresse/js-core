/**
 * Base
 */
import injector from'../injector';

/**
 * Browser CSS Injection
 *
 * @param {string} id      - TAG ID attribute
 * @param {string} href    - TAG Hyper reference
 * @param {string} content - TAG Content Style
 *
 * @return {Promise} injection status
 */
function css(options) {
    const {
        id      = '',
        target  = 'head',
        content = undefined,
        href    = undefined,
        rel     = 'stylesheet',
        type    = 'text/css',
        ...rest
    } = (options || {});

    return injector({
        tag    : (href ? 'link' : (content ? 'style' : '')),
        content: (href ? '' : (content || '')),
        id,
        target,
        href,
        rel,
        type,
        ...rest
    });
}

/**
 * Exporting
 */
export default css;
