/**
 * Base
 */
import { get, put, post } from '../../request/request.js';
import { defaultSettings, request } from './base.js';

/**
 * Adapters
 */
import { events as adapters } from '../../adapters';

/**
 * Event Microservice List Getter
 *
 * @param {object} [query]
 * @param {object} [settings]
 * @param {object} [user]
 *
 * @returns {Promise}
 */
function list(
    query,
    settings,
    user
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
            return adapters.list(
                _response,
                _offset,
                _size,
                user
            );

        } catch (e) {
            return _response;
        }
    }

    return get(
        '/search/producer',
        {
            ...rest,
            offset: _offset,
            size  : _size,
        },
        defaultSettings({
            withAdapter: formatter,
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
 * @param {object} [user]
 *
 * @returns {Promise}
 */
function details(
    id,
    query,
    settings,
    user
) {
    function detailsAdapter(eventResponse) {
        return adapters.details(eventResponse, user);
    }

    return get(
        `/${id}`,
        query,
        defaultSettings({
            withAdapter: detailsAdapter,
            ...(settings || {})
        })
    );
}

/**
 * Event Microservice Update
 *
 * @param {string} id         - event ID
 * @param {object} body       - event data
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function update(
    id,
    body = {},
    query,
    settings
) {
    return put(
        `/${id}`,
        body,
        query,
        defaultSettings(settings)
    );
}

/**
 * Event Microservice Duplicate
 *
 * @param {string} id         - event ID
 * @param {object} body       - event data
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function duplicate(
    id,
    body = {},
    query,
    settings
) {
    return post(
        `/${id}/duplicate`,
        body,
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
    update,
    duplicate,
};

/**
 * Exporting
 */
export default events;
