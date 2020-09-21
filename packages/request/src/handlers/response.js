/**
 * Response Handler
 *
 * @param {string}   transform
 * @param {function} reject
 * @param {object}   response
 *
 * @return {object|function}
 */
async function responseHandler(
    transform = 'json',
    reject    = undefined,
    response
) {
    const { status }    = response || {};
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

    let body;

    try {
        body = await response.text();

        if (body.length && (transform === 'json')) {
            body = JSON.parse(body);
        }
    } catch (e) {}

    return body;
}

/**
 * Exporting
 */
export default responseHandler;
