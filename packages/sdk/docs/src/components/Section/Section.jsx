/**
 * Core Packages
 */
import React from 'react';

/**
 * CSS
 */
import {
    useTheme,
} from '../../css';

/**
 * Composition Components
 */
import {
    Title,
    Segment,
} from '../';

/**
 * Component Itself
 */
function Section({
    first,
    last,
    padding,
    children,
    title,
    ...props
}) {
    const { xs }          = (useTheme() || {});
    const _defaultPadding = (xs ? '30px' : '60px');
    const _finalPadding   = (first ?
        `${_defaultPadding} 0 0` :
        (last ?
            `0 0 ${_defaultPadding}` :
                (padding || `${_defaultPadding} 0`)
        )
    );

    return (
        <Segment
            as="article"
            padding={_finalPadding}
            {...props}>
            {(!title) ? (null) : (
                <Title>
                    {title}
                </Title>
            )}
            {children}
        </Segment>
    );
}

/**
 * Exporting
 */
export { Section };
