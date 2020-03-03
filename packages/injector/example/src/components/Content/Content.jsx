/**
 * Core Packages
 */
import React from 'react';

/**
 * CSS
 */
import {
    css,
} from '../../css';

/**
 * Composition Components
 */
import {
    Card,
} from '../';

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
        <Card
            className="content"
            textColor="base"
            background="inverse"
            styles={css`
                padding-top   : 40px;
                padding-bottom: 40px;

                .content__inner {
                    margin-left : auto;
                    margin-right: auto;
                    max-width   : 345px;
                }
            `}>
            <div className="content__inner">
                {children}
            </div>
        </Card>
    );
}

/**
 * Exporting
 */
export { Content };
