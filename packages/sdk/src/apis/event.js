/**
 * Base
 */
import {
    get as getter,
} from '../request/request.js';

/**
 * Event API Attributes Getter
 *
 * @param {string} id - Event Identifier
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function attributes(
    id,
    query,
    settings
) {
    return getter(`/event/${id}/attributes`, query, settings);
}

/**
 * Event API Crew Getter
 *
 * @param {string} id - Event Identifier
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function crew(
    id,
    query,
    settings
) {
    return new Promise((resolve, reject) => {
        getter(`/event/${id}/crew`, query, settings)
        .then((response) => {
            const { team } = (response || {});
            const crew     = [];
            const crewIds  = [];

            (team || []).map((crewMember) => {
                const { user } = (crewMember || {});
                const { id }   = (user || {});

                if (!id) {
                    return false;
                }

                crew.push(user);
                crewIds.push(id);
            })

            resolve({
                crew   : (crew.length ? crew : null),
                crewIds: (crewIds.length ? crewIds : null),
            });
        })
        .catch(reject);
    });
}

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

        const {
            withCrew      : includeCrew,
            withAttributes: includeAttributes,
            ...originalSettings
        } = (settings || {});

        let promises        = [];
        let hasError        = null;
        let eventResponse   = null;
        let eventCrew       = null;
        let eventCrewIds    = null;
        let eventAttributes = null;

        promises.push(
            getter(`/event/${id}`, originalQuery, originalSettings)
            .then((response) => {
                eventResponse = response;
            })
            .catch((error) => {
                hasError = error;

                reject(error);
            })
        );

        if (withAttributes || includeAttributes) {
            promises.push(
                attributes(id, originalQuery, settings)
                .then((attributesResponse) => {
                    eventAttributes = (attributesResponse || null);
                })
                .catch(() => {})
            );
        }

        if (withCrew || includeCrew) {
            promises.push(
                crew(id, originalQuery, settings)
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
                .catch(() => {})
            )
        }

        Promise
        .all(promises)
        .finally(() => {
            if (hasError) {
                return reject(hasError);
            }

            resolve({
                ...(eventResponse || {}),
                crew      : eventCrew,
                crewIds   : eventCrewIds,
                attributes: ((eventResponse || {}).attributes || eventAttributes || null),
            });
        });
    });
}

/**
 * Reference
 */
const event = {
    get,
    crew,
    attributes,
};

/**
 * Exporting
 */
export default event;
