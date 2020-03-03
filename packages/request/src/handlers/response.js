/**
 * Response Handler
 *
 * @param {string}   transform
 * @param {function} reject
 * @param {object}   response
 *
 * @return {object|function}
 */
function responseHandler(
    transform = 'json',
    reject    = undefined,
    response  = {}
) {
    const { status }    = response;
    const inStatusRange = ((status >= 200) && (status < 400));

    if (!inStatusRange) {
        return (typeof reject === 'function' ? reject(response) : response);
    }

    if ([201, 202, 203, 204].includes(status)) {
        return response;
    }

    if (!response || (typeof response[transform] !== 'function')) {
        return response;
    }

    return response[transform]();
}

/**
 * Exporting
 */
export default responseHandler;
