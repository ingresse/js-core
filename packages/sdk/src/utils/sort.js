/**
 * Sort array items by item property
 *
 * @param {array}   array    - objects list
 * @param {string}  property - list object property
 * @param {boolean} reverse  - reverse ordenation
 *
 * @return {array}
 */
export function sortByProperty(array = [], property = '', reverse = false) {
    return array.sort((a, b) => {
        if (a[property] < b[property]) {
            return reverse ? 1 : -1;
        }

        if (a[property] > b[property]) {
            return reverse ? -1 : 1;
        }

        return 0;
    });
}
