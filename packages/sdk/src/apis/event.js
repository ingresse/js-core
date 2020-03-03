/**
 * Base
 */
import { get as getter } from '../request/request.js';

/**
 * Event API Getter
 *
 * @param {string} id    - Event Identifier
 * @param {object} query
 *
 * @return {Promise}
 */
function get(id = '', query = {}) {
    return new Promise((resolve, reject) => {
        const {
            attributes,
            ...originalQuery
        } = (query || {});

        let eventAttributes = null;

        function _getEvent() {
            getter(`/event/${id}`, originalQuery)
            .catch(reject)
            .then((eventResponse) => {
                const eventData = {
                    ...(eventResponse || {}),
                    attributes: ((eventResponse || {}).attributes || eventAttributes || null),
                };

                resolve(eventData);
            });
        }

        if (!attributes) {
            return _getEvent();
        }

        getter(`/event/${id}/attributes`)
        .then((attributesResponse) => {
            eventAttributes = attributesResponse;
        })
        .finally(_getEvent);
    });
}

/**
 * Reference
 */
const event = {
    get,
};

/**
 * Exporting
 */
export default event;
