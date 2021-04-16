/**
 * Base
 */
import { finance as financeAdapters } from '../../adapters';
import { get, post } from '../../request/request.js';
import { defaultSettings, producerPath } from './base.js';

/**
 * Approve Boleto
 *
 * @param {object} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function approve(id, query, settings = {}) {
    return post(
        `/boletos/${id}/approve`,
        {},
        query,
        defaultSettings(settings)
    );
}

/**
 * Create Boleto
 *
 * @param {object} data
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function create(data, query, settings = {}) {
    const content = (data || {});
    const {
        barcode: boletoBarcode,
        document: boletoDocument,
    } = content;
    const boleto = {
        ...content,
        barcode : (boletoBarcode || '').replace(/\D/g, ''),
        document: (boletoDocument || '').replace(/\D/g, ''),
    };

    return post(
        '/boletos',
        boleto,
        query,
        defaultSettings(settings)
    );
}

/**
 * Decline Boleto
 *
 * @param {string} id
 * @param {string} reason
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function decline(id, reason, query, settings = {}) {
    return post(
        `/boletos/${id}/decline`,
        { reason, status: 'declined' },
        query,
        defaultSettings(settings)
    );
}

/**
 * Get Boleto Details
 *
 * @param {string} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function details(id, query, settings = {}) {
    return get(
        `/boletos/${id}`,
        query,
        defaultSettings({
            withAdapter: financeAdapters.boletos.details,
            ...settings
        })
    );
}

/**
 * Export Boletos
 *
 * @param {string} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function _export(query, settings = {}) {
    return get(
        `${producerPath()}/export/boletos`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Get Boletos List
 *
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function list(query = {}, settings = {}) {
    const pageSize = (query.pageSize || 50);
    query.pageSize = pageSize;

    return get(
        `${producerPath()}/boletos`,
        query,
        defaultSettings({
            withAdapter: (response) => financeAdapters.boletos.list(response, pageSize),
            ...settings
        })
    );
}

/**
 * Get Boleto Recipe
 *
 * @param {string} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function recipe(id, query, settings = {}) {
    return get(
        `/boletos/${id}/recipe`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const boletos = {
    defaultSettings,

    approve,
    create,
    decline,
    details,
    export: _export,
    getById: details,
    list,
    recipe
};

/**
 * Exporting
 */
export default boletos;
