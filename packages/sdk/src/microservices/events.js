/**
 * Base
 */
import {
    get,
    generic,
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
 * Generic MS Requests
 *
 * @param {string} path
 * @param {object} settings
 *
 * @returns {Promise}
 */
function request(
    path,
    settings
) {
    return generic(path, defaultSettings(settings));
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

    return get(
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
    return get(
        `/${id}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const events = {
    defaultSettings,
    request,

    list,
    details,
};

/**
 * Exporting
 */
export default events;
