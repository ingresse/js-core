/**
 * Analytics
 */
import gtag from '../analytics/google.analytics';

/**
 * Anti-Fraud
 */
import inspetor from '../fraud/inspetor.fraud';

/**
 * Authentication Login
 *
 * @param {object} params
 */
function login(params = {}) {
    return new Promise((resolve, reject) => {
        try {
            const {
                email,
                userId,
            } = params;

            if (window.gtag) {
                window.gtag('event', 'login', params);
            }

            if (inspetor.running()) {
                window
                .inspetor
                .sharedInstance()
                .trackLogin(email, userId);
            }

            resolve();

        } catch(error) {
            reject(error);
        }
    });
}

/**
 * Exporting
 */
export const auth = {
    login,
};
