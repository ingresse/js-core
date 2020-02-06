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
    const paramsString  = (!url || !url.includes('?') ? '' : url.split('?').pop().replace('?', ''));
    const resourceURL   = new URL(url);
    const resourceQuery = new URLSearchParams(paramsString);

    Object.keys(query).map((queryKey) => {
        resourceQuery.delete(queryKey);
        resourceQuery.append(queryKey, encodeURIComponent(query[queryKey]));
    });

    const queryString    = resourceQuery.toString();
    const resourceString = (resourceURL.protocol + '//' + resourceURL.host + resourceURL.pathname);
    const resourceSearch = (!queryString ? '' : `?${queryString}`);

    return `${resourceString}${resourceSearch}`;
}

/**
 * Exporting
 */
module.exports = URLBuilder;
