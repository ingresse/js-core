/**
 * Browser Element Injector handler
 *
 * @param {string} tag     - TAG Name of element to be injected
 * @param {string} id      - TAG ID attribute
 * @param {string} src     - TAG Content
 * @param {any}    content - TAG content
 * @param {string} target  - TAG Name to be inserted into
 *
 * @return {Promise} injection status
 */
function injector({
        tag     = '',
        id      = '',
        src     = '',
        href    = '',
        content = undefined,
        target  = 'body',
        ...rest
    }) {
    return new Promise((resolve, reject) => {
        if (!document ||
            (typeof document !== 'object') ||
            (typeof document.createElement !== 'function')) {
            return reject({
                code   : -1,
                message: 'injector:document-unable-to-create-tag',
            });
        }

        const isSourceURL = (src && typeof src === 'string');
        const isHrefURL   = (href && typeof href === 'string');

        if (!tag || (!isSourceURL && !isHrefURL && !content)) {
            return reject({
                code   : -1,
                message: 'injector:invalid-arguments',
            });
        }

        const targetFound = document.querySelectorAll(target);
        const targetRef   = ((!targetFound || !targetFound[0]) ? null : targetFound[0]);

        if (!targetRef ||
            (typeof targetRef !== 'object') ||
            (typeof targetRef.append !== 'function')) {
            return reject({
                code   : -1,
                message: 'injector:target-unable-to-append-element',
            });
        }

        let elementFound = (!id ? null : document.querySelector(`#${id}`));
        let elementChild = (!content ? '' : document.createTextNode(content));
        let elementRef   = (elementFound || document.createElement(tag));

        Object.keys(rest).map((attrKey) => {
            elementRef[attrKey] = rest[attrKey];
        });

        if (id) {
            elementRef.id = id;
        }

        if (isSourceURL) {
            elementRef.src = src;
        }

        if (isHrefURL) {
            elementRef.href = href;
        }

        if (elementChild) {
            elementRef.append(elementChild);
        }

        targetRef.append(elementRef);

        resolve(elementRef, targetRef);
    });
}

/**
 * Exporting
 */
module.exports = injector;
