/**
 * Core Packages
 */
import React from 'react';

/**
 * Component Itself
 */
function Content({
    children,
}) {
    /**
     * Render
     */
    return (
        <main id="content">
            {children}
        </main>
    );
}

/**
 * Exporting
 */
export { Content };
