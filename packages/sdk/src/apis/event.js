/**
 * Base
 */
import {
    get as getter,
} from '../request/request.js';

/**
 * Event API Getter
 *
 * @param {string} id - Event Identifier
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function get(
    id,
    query,
    settings
) {
    return new Promise((resolve, reject) => {
        const {
            withCrew,
            withAttributes,
            ...originalQuery
        } = (query || {});

        let eventCrew       = null;
        let eventCrewIds    = null;
        let eventAttributes = null;

        function _getEvent() {
            getter(`/event/${id}`, originalQuery, settings)
            .catch(reject)
            .then((eventResponse) => {
                const eventData = {
                    ...(eventResponse || {}),
                    crew      : eventCrew,
                    crewIds   : eventCrewIds,
                    attributes: ((eventResponse || {}).attributes || eventAttributes || null),
                };

                resolve(eventData);
            });
        }

        if (!withAttributes || !withCrew) {
            return _getEvent();
        }

        const promises = [];

        if (withAttributes) {
            promises.push(
                getter(`/event/${id}/attributes`, originalQuery, settings)
                .then((attributesResponse) => {
                    eventAttributes = (attributesResponse || null);
                })
            );
        }

        if (withCrew) {
            promises.push(
                getter(`/event/${id}/crew`, originalQuery, settings)
                .then(({ team }) => {
                    const crew    = [];
                    const crewIds = [];

                    (team || []).map((crewMember) => {
                        const { user } = (crewMember || {});
                        const { id }   = (user || {});

                        if (!id) {
                            return false;
                        }

                        crew.push(user);
                        crewIds.push(id);
                    })

                    eventCrew    = (crew.length ? crew : null);
                    eventCrewIds = (crewIds.length ? crewIds : null);
                })
            )
        }

        Promise
        .all(promises)
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
