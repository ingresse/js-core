import key from './key.js';

/**
 * Concat cookie name
 *
 * @param {string} cname - Cookie name
 *
 * @return {string}
 */
function _cookieName(cname) {
    return key(encodeURIComponent(cname || ''));
}

/**
 * Set the cookie.
 *
 * @param {string} cname - The cookie name.
 * @param {string|number} cvalue - The cookie value.
 * @param {number} exdays - The expiration days.
 */
function _cookieSET(cname, cvalue, exdays) {
    let date = new Date();

    date.setTime(
        date.getTime() +
        (exdays * 24 * 60 * 60 * 1000)
    );

    const expires = ('expires=' + date.toUTCString());
    const domain  = (document.location.hostname.includes('.ingresse.com') ?
        '.ingresse.com' :
        document.location.hostname
    );

    document.cookie = (
        _cookieName(cname) + '=' +
        encodeURIComponent(cvalue) + ';' +
        expires + ';' +
        'domain=' + domain + ';' +
        'path=/'
    );
}

/**
 * Check/Return the cookie if it's exists
 *
 * @param {string} cname - The cookie name.
 *
 * @returns {string}
 */
function get(cname) {
    let name          = (_cookieName(cname) + '=');
    let decodedCookie = decodeURIComponent(document.cookie);
    let scookie       = decodedCookie.split(';');

    for (let i = 0; i < scookie.length; i++) {
        let c = scookie[i];

        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return '';
}

/**
 * Set Cookie
 *
 * @param {string} cname - The cookie name.
 * @param {string|number} cvalue - The cookie value.
 * @param {number} days - The expiration days.
 *
 * @return {boolean} operation status
 */
function set(cname, cvalue, days) {
    if (!cname || !cvalue || !days) {
        return false;
    }

    _cookieSET(cname, cvalue, days);

    return true;
}

/**
 * Remove Cookie
 *
 * @param {string} cname - The cookie name.
 *
 * @return {boolean} operation status
 */
function remove(cname) {
    const cached = get(cname);

    if (cached === '') {
        return true;
    }

    _cookieSET(cname, cached, -1);

    return true;
}

const cookies = {
    get,
    set,
    remove,
};

/**
 * Exporting
 */
export default cookies;
