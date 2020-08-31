/**
 * Base
 */
import { del, get, post, put } from '../../request/request.js';
import { defaultSettings, request } from './base.js';

/**
 * Create Producer
 *
 * @param {object} producer
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function create(
    producer,
    query,
    settings = {}
) {
    return post(
        '/producers',
        producer,
        query,
        defaultSettings(settings)
    );
}

/**
 * Create New Team Member
 *
 * @param {string} producerId
 * @param {object} teamMember
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function createTeam(
    producerId,
    teamMember,
    query,
    settings = {}
) {
    return post(
        `/producers/${producerId}/team`,
        teamMember,
        query,
        defaultSettings(settings)
    );
}

/**
 * Producers
 * Get Producers Agencies List
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
    return get(
        '/producers',
        query,
        defaultSettings(settings)
    );
}

/**
 * Producer
 * Get Producers Agency Details
 *
 * @param {string} id
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
        `/producers/${id}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Producers Classification
 * Get Producers Agencies Classification
 *
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function listClassification(
    query,
    settings
) {
    return get(
        '/producers-classification',
        query,
        defaultSettings(settings)
    );
}

/**
 * Producers Team
 * Get Producers Team List
 *
 * @param {string} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function listTeam(
    id,
    query,
    settings
) {
    return get(
        `/producers/${id}/team`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Remove Producer
 *
 * @param {string} producerId
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function remove(
    producerId,
    query,
    settings
) {
    return del(
        `/producers/${producerId}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Remove Team Member
 *
 * @param {string} producerId
 * @param {string} memberId
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function removeTeam(
    producerId,
    memberId,
    query,
    settings
) {
    return del(
        `/producers/${producerId}/team/${memberId}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Update Producer
 *
 * @param {string} producerId
 * @param {object} producer
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function update(
    producerId,
    producer,
    query,
    settings = {}
) {
    return put(
        `/producers/${producerId}`,
        producer,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const producers = {
    defaultSettings,
    request,

    create,
    createTeam,
    remove,
    removeTeam,
    details,
    list,
    listClassification,
    listTeam,
    update,
};

/**
 * Exporting
 */
export default producers;
