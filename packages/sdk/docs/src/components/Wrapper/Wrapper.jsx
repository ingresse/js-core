/**
 * Core Packages
 */
import React from 'react';

/**
 * CSS
 */
import {
    css,
    Global,
} from '../../css';

/**
 * Settings
 */
import {
    theme,
} from '../../settings';

/**
 * Composition Componets
 */
import {
    Flex,
    Header,
    Hero,
    Content,
} from '../';

/**
 * Component Itself
 */
function Wrapper({
    children,
}) {
    /**
     * Render
     */
    return (
        <Flex
            id="wrapper"
            styles={{
                minHeight: '100%',
            }}>
            <Global
                styles={css`
                    * {
                        box-sizing: border-box;
                    }

                    html,
                    body {
                        margin : 0;
                        padding: 0;
                        overflow: hidden;

                        font-size  : 16px;
                        line-height: 20px;

                        color           : ${theme.get('base')};
                        background-color: ${theme.get('inverse')};
                    }

                    html,
                    body,
                    input,
                    select,
                    textarea {
                        font-family: "Roboto", sans-serif;
                    }

                    html,
                    body,
                    #root {
                        width : 100%;
                        height: 100%;
                    }

                    a {
                        text-decoration: none;
                    }
                `}
            />
            <Header />
            <Hero />
            <Content>
                {children}
            </Content>
        </Flex>
    );
}

/**
 * Exprting
 */
export { Wrapper };
