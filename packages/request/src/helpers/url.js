/**
 * Build Request URL
 *
 * @param {string} url
 * @param {object} query
 *
 * @return {string} request URL
 */
function URLBuilder(
    url   = '',
    query = {}
) {
    const paramsArray = (!url || !url.includes('?') ? [] : url.split('?').pop().replace('?', '').split('&'));
    const resourceURL = (!url ? '' : new URL(url));
    let queryArray    = [];
    let queryObject   = {
        ...query,
    };

    paramsArray.map((param) => {
        const paramSplit = param.toString().split('=');
        const paramKey   = paramSplit[0];
        const paramValue = paramSplit[1];

        queryObject[paramKey] = paramValue;
    });

    Object.keys(queryObject).map((queryKey) => {
        const paramKey   = encodeURIComponent(queryKey);
        const paramValue = encodeURIComponent(query[queryKey]);

        queryArray.push(`${paramKey}=${paramValue}`);

        return true;
    });

    const queryString    = queryArray.join('&');
    const resourceString = (!resourceURL ? resourceURL : resourceURL.protocol + '//' + resourceURL.host + resourceURL.pathname);
    const resourceSearch = (!queryString ? '' : `?${queryString}`);

    return `${resourceString}${resourceSearch}`;
}

/**
 * Exporting
 */
export default URLBuilder;
