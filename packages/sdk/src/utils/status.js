import options from '../options.js';

export const eventStatusUnknown = {
    id      : 0,
    color   : '#7a8085',
    name    : 'Unknown',
    original: 'Unknown',
    'pt-BR' : 'Desconhecido',
};

export const eventStatus = {
    draft: {
        id      : 1,
        color   : '#7a8085',
        name    : 'Draft',
        original: 'Draft',
        'pt-BR' : 'Rascunho',
    },
    published: {
        id      : 2,
        color   : '#60c659',
        name    : 'Public',
        original: 'Public',
        'pt-BR' : 'Público',
    },
    private: {
        id      : 3,
        color   : '#00a5db',
        name    : 'Private',
        original: 'Private',
        'pt-BR' : 'Privado',
    },
};

export const eventSessionStatus = {
    available: {
        color   : '#60c659',
        name    : 'Available',
        original: 'Available',
        'pt-BR' : 'Disponível',
    },
    notStarted: {
        color   : '#ffc61e',
        name    : 'Not Started',
        original: 'Not Started',
        'pt-BR' : 'Aguardando início das vendas',
    },
    soldout: {
        color   : '#ac6cb8',
        name    : 'Soldout',
        original: 'Soldout',
        'pt-BR' : 'Esgotada',
    },
    finished: {
        color   : '#7a8085',
        name    : 'Finished',
        original: 'Finished',
        'pt-BR' : 'Encerrada',
    },
    unavailable: {
        color   : '#7a8085',
        name    : 'Unavailable',
        original: 'Unavailable',
        'pt-BR' : 'Indisponível',
    },
};

/**
 * Event's Status helper
 *
 * @param {string} status
 *
 * @returns {object}
 */
export function getEventStatus(status = '') {
    const { locale } = options.get();
    const selected   = (eventStatus[(typeof status === 'object') ? status.name : status] || eventStatusUnknown);

    return {
        ...selected,
        name: (selected[locale] || selected.original),
    };
}

/**
 * Event Session's Status helper
 *
 * @param {object|string} status
 *
 * @returns {object}
 */
export function getEventSessionStatus(status = '') {
    const { locale } = options.get();
    const selected   = (eventSessionStatus[status] || eventStatusUnknown);

    return {
        ...selected,
        name: (selected[locale] || selected.original),
    };
}
