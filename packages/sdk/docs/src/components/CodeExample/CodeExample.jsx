/**
 * Core Packages
 */
import React from 'react';
import Prism from 'prismjs';

/**
 * Styles
 */
import CodeExampleStyled from './CodeExampleStyled';

/**
 * Component Itself
 */
function CodeExample({
    children  = '',
    className = '',
    ...props
}) {
    /**
     * Render
     */
    return (
        <CodeExampleStyled
            className={`language-javascript${!className ? '' : ' ' + className}`}>
            <code
                className={`language-javascript${!className ? '' : ' ' + className}`}
                dangerouslySetInnerHTML={{
                    __html: Prism.highlight(
                        children,
                        Prism.languages.javascript,
                        'javascript'
                    ),
                }}
            />
        </CodeExampleStyled>
    );
}

/**
 * Exporting
 */
export { CodeExample };
