import { isObject } from '../utils';

export function definePictures (originalPictures) {
    let photo = '';
    let pictures = {};

    if (originalPictures && isObject(originalPictures)) {
        pictures = originalPictures;
        photo = pictures.medium;

    } else {
        (originalPictures || []).forEach(({ type, link }) => {
            pictures[type] = link;

            if (type === 'medium') {
                photo = link;
            }
        });
    }

    return {
        photo,
        pictures,
    };
}
