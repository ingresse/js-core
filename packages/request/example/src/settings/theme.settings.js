/**
 * Core Packages
 */
import {
    colors,
} from '@ingresse/aphrodite';

/**
 * Theme Settings
 */
export const theme = (
    colors
    .set('primary', colors.get('poison', 'light'))
    .set('secondary', colors.get('ocean'))
);
