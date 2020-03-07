/**
 * Pages
 */
import Index from './Index/Index';

/**
 * Routes
 */
const routes = {
    index: {
        menu : '',
        title: `Plug your JS Application into Ingresse's Platform`,
        path : '/',
        page : Index,
    },

    api: {
        menu : 'APIs',
        title: 'APIs',
        path : '/api',
        page : Index,
        multi: true,
    },
    apiAuthentication: {
        subOf: 'api',
        menu : 'Authentication',
        title: 'MS | Authentication',
        path : '/api/authentication',
        page : Index,
    },

    ms: {
        menu : 'Microservices',
        title: 'Microservices',
        path : '/ms',
        page : Index,
        multi: true,
    },
    msEvents: {
        subOf: 'ms',
        menu : 'Events',
        title: 'MS | Events',
        path : '/ms/events',
        page : Index,
    },

    utils: {
        menu : 'Utils',
        title: 'Utils',
        path : '/utils',
        page : Index,
        multi: true,
    },
    utilsOptions: {
        subOf: 'utils',
        menu : 'Options',
        title: 'Utility | Options',
        path : '/utils/options',
        page : Index,
    },
    utilsCredentials: {
        subOf: 'utils',
        menu : 'Credentials',
        title: 'Utility | Credentials',
        path : '/utils/credentials',
        page : Index,
    },

    extra: {
        menu : 'Extras',
        title: 'Extras',
        path : '/extra',
        page : Index,
        multi: true,
    },
    extraCookies: {
        subOf: 'extra',
        menu : 'Cookies',
        title: 'Extra | Cookies',
        path : '/extra/cookies',
        page : Index,
    },
    extraStorage: {
        subOf: 'extra',
        menu : 'Local Storage',
        title: 'Extra | Local Storage',
        path : '/extra/storage',
        page : Index,
    },
};

/**
 * Get Route
 *
 * @param {string} path
 *
 * @returns {object}
 */
function get(path = '') {
    let found = null;

    Object.keys(routes).some((routeKey) => {
        if (routes[routeKey].path === path) {
            found = routes[routeKey];

            return true;
        }

        return false;
    });

    return found;
}

/**
 * Exporting
 */
export {
    routes,
    get,
};
