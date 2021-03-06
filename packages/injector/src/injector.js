/**
 * Browser Element Injector handler
 *
 * @param {string} tag     - TAG Name of element to be injected
 * @param {string} id      - TAG ID attribute
 * @param {string} src     - TAG Source reference
 * @param {string} href    - TAG Hyper reference
 * @param {any}    content - TAG Content
 * @param {string} target  - TAG Name to be inserted into
 *
 * @return {Promise} injection status
 */
function injector(options) {
    return new Promise((resolve, reject) => {
        try {
            const {
                tag     = '',
                id      = '',
                src     = '',
                href    = '',
                content = undefined,
                target  = 'body',
                ...rest
            } = (options || {});

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

            if (!tag) {
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

        } catch (erro) {
            reject(error);
        }
    });
}

/**
 * Exporting
 */
export default injector;
