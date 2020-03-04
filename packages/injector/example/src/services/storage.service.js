/**
 * Local Storage Service
 */
const prefix = 'ing_injector_example_';

export const storage = {
    get: (itemKey) => {
        if (!itemKey) {
            return;
        }

        return JSON.parse(localStorage.getItem(prefix.concat(itemKey)));
    },
    set: (itemKey, itemContent) => {
        if (!itemKey || !itemContent) {
            return;
        }

        localStorage.setItem(prefix.concat(itemKey), JSON.stringify(itemContent));
    },
    remove: (itemKey) => {
        if (!itemKey) {
            return;
        }

        localStorage.removeItem(prefix.concat(itemKey));
    },
};
