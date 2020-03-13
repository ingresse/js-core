/**
 * Core Packages
 */
import React from 'react';

/**
 * Composition
 */
import {
    LiveProvider,
    LiveEditor,
    LiveError,
    LivePreview,
} from 'react-live';

/**
 * Component Itself
 */
function CodeEditor({
    code,
    scope,
    ...props
}) {
    /**
     * Render
     */
    return (
        <LiveProvider
            {...props}
            code={code}
            scope={scope}>
            <LiveEditor />
            <LiveError />
            <LivePreview />
        </LiveProvider>
    );
}

/**
 * Exporting
 */
export { CodeEditor };
