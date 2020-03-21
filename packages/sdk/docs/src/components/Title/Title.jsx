/**
 * Core Packages
 */
import React from 'react';

/**
 * Composition Components
 */
import {
    H2,
} from '../';

/**
 * Component Itself
 */
const Title = ({
    margin,
    ...props
}) => (
    <H2
        {...props}
        margin={margin || '5px 0'}
    />
);

/**
 * Exporting
 */
export { Title };
