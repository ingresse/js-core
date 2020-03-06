/**
 * Base
 */
import {
    get as getter,
} from '../request/request.js';

/**
 * Company API Getter
 *
 * @param {string|number} companyId
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function getAttributes(
    companyId,
    query,
    settings,
) {
    return getter(`/company/${companyId}/attributes`, query, settings);
}

/**
 * Reference
 */
const company = {
    getAttributes,
};

/**
 * Exporting
 */
export default company;
