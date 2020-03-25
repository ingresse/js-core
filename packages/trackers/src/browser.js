/**
 * Core Packages
 */
import injector from '@ingresse/injector';

/**
 * Base
 */
import trackers from './index';

/**
 * Browser
 */
if (window && !window.injector) {
    window.injector = injector;
}

if (window && !window.trackers) {
    window.trackers = trackers;
}
