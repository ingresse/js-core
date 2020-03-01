/**
 * Core Packages
 */
import { Icon } from '@ingresse/aphrodite';

/**
 * Settings
 */
import { theme } from '../../settings';

/**
 * Override Default Properties
 */
Icon.defaultProps = {
    ...Icon.defaultProps,
    theme,
};

/**
 * Exporting
 */
export { Icon };
