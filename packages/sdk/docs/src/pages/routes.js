/**
 * Core Packages
 */
import { lazy } from 'react';

/**
 * Routes
 */
const routes = {
    index: {
        menu : '',
        title: `Plug your JS Application into Ingresse's Platform`,
        path : '/',
        page : lazy(() => import('./Index/Index')),
    },

    api: {
        menu : 'APIs',
        title: 'APIs',
        path : '/api',
        page : lazy(() => import('./Apis/Apis')),
        multi: true,
    },
    apiAuthentication: {
        subOf: 'api',
        menu : 'Authentication',
        title: 'API | Authentication',
        path : '/api/authentication',
        page : lazy(() => import('./Apis/Apis')),
    },
    apiUser: {
        subOf: 'api',
        menu : 'User',
        title: 'API | User',
        path : '/api/user',
        page : lazy(() => import('./Apis/Apis')),
    },
    apiUsers: {
        subOf: 'api',
        menu : 'Users',
        title: 'API | Users',
        path : '/api/users',
        page : lazy(() => import('./Apis/Apis')),
    },
    apiEvent: {
        subOf: 'api',
        menu : 'Event',
        title: 'API | Event',
        path : '/api/event',
        page : lazy(() => import('./Apis/Apis')),
    },
    apiSale: {
        subOf: 'api',
        menu : 'Sale',
        title: 'API | Sale',
        path : '/api/sale',
        page : lazy(() => import('./Apis/Apis')),
    },
    apiTransactions: {
        subOf: 'api',
        menu : 'Transactions',
        title: 'API | Transactions',
        path : '/api/transactions',
        page : lazy(() => import('./Apis/Apis')),
    },
    apiEntrance: {
        subOf: 'api',
        menu : 'Entrance',
        title: 'API | Entrance',
        path : '/api/entrance',
        page : lazy(() => import('./Apis/Apis')),
    },

    ms: {
        menu : 'Microservices',
        title: 'Microservices',
        path : '/ms',
        page : lazy(() => import('./Microservices/Microservices')),
        multi: true,
    },
    msEvents: {
        subOf: 'ms',
        menu : 'Events',
        title: 'MS | Events',
        path : '/ms/events',
        page : lazy(() => import('./Microservices/Microservices')),
    },
    msTickets: {
        subOf: 'ms',
        menu : 'Tickets',
        title: 'MS | Tickets',
        path : '/ms/tickets',
        page : lazy(() => import('./Microservices/Microservices')),
    },
    msCheckin: {
        subOf: 'ms',
        menu : 'Checkin',
        title: 'MS | Checkin',
        path : '/ms/checkin',
        page : lazy(() => import('./Microservices/Microservices')),
    },

    utils: {
        menu : 'Utils',
        title: 'Utilities',
        path : '/utils',
        page : lazy(() => import('./Utils/Utils')),
        multi: true,
    },
    utilsOptions: {
        subOf: 'utils',
        menu : 'Options',
        title: 'Utility | Options',
        path : '/utils/options',
        page : lazy(() => import('./Utils/Utils')),
    },
    utilsCredentials: {
        subOf: 'utils',
        menu : 'Credentials',
        title: 'Utility | Credentials',
        path : '/utils/credentials',
        page : lazy(() => import('./Utils/Utils')),
    },

    extra: {
        menu : 'Extras',
        title: 'Extras',
        path : '/extra',
        page : lazy(() => import('./Extras/Extras')),
        multi: true,
    },
    extraCookies: {
        subOf: 'extra',
        menu : 'Cookies',
        title: 'Extra | Cookies',
        path : '/extra/cookies',
        page : lazy(() => import('./Extras/Extras')),
    },
    extraStorage: {
        subOf: 'extra',
        menu : 'Local Storage',
        title: 'Extra | Local Storage',
        path : '/extra/storage',
        page : lazy(() => import('./Extras/Extras')),
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
