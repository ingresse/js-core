/**
 * Core Packages
 */
import React from 'react';

/**
 * CSS
 */
import {
    css,
    colors,
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
            textColor="inverse"
            background="ocean"
            styles={css`
                padding-top   : 40px;
                padding-bottom: 40px;

                background-image: linear-gradient(90deg, ${colors.get('ocean', 'light')}, ${colors.get('ocean')});

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
