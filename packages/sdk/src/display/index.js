/**
 * Base
 */
import options from '../options.js';
import ptBR from './pt-BR.js';
import en from './en.js';

const availables = {
    en,
    'pt-BR': ptBR,
};

/**
 * Display Format
 *
 * @param {string} property
 *
 * @returns {string} message
 */
function display(property = '') {
    const {
        locale,
        messages,
        display,
    } = options.get();
    let language = {
        ...(messages || {}),
        ...(display || {}),
    };

    try {
        language = {
            ...(availables[locale] || {}),
            ...language,
        };

    } catch (e) {}

    return (language[property]) || '';
}

/**
 * Exporting
 */
export default display;
