/**
 * Base
 */
import {
    get as getter,
} from '../request/request.js';

/**
 * Formatters
 */
import {
    events as listFormatter,
} from '../formatters';

/**
 * Get Microservice Default Settings
 *
 * @param {object} settings
 *
 * @returns {object}
 */
function defaultSettings(settings = {}) {
    return {
        microservice    : 'event',
        withoutApiKey   : true,
        withoutUserToken: true,
        ...settings,
    };
}

/**
 * Event Microservice List Getter
 *
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function list(
    query,
    settings
) {
    const {
        size,
        pageSize,
        page,
        offset,
        ...rest
    } = (query || {});
    const _page   = parseInt((page || 1), 10);
    const _size   = parseInt((size || pageSize || 10), 10);
    const _offset = Math.round(_size * (_page - 1));

    function formatter(_response) {
        try {
            return listFormatter(
                _response,
                _offset,
                _size
            );

        } catch (e) {
            return _response;
        }
    }

    return getter(
        `/search/producer`,
        {
            ...rest,
            offset: _offset,
            size  : _size,
        },
        defaultSettings({
            withFormatter: formatter,
            ...(settings || {}),
        })
    );
}

/**
 * Event Microservice Getter
 *
 * @param {string} id - Event ID
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function details(
    id,
    query,
    settings
) {
    return getter(
        `/${id}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const events = {
    list,
    details,
};

/**
 * Exporting
 */
export default events;
