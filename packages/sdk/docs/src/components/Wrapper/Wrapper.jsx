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
    theme,
    children,
}) {
    /**
     * Render
     */
    return (
        <Flex
            id="wrapper">
            <Global
                styles={css`
                    * {
                        box-sizing: border-box;
                    }

                    html,
                    body {
                        margin : 0;
                        padding: 0;

                        font-size  : 16px;
                        line-height: 20px;

                        color           : ${theme.get('base')};
                        background-color: ${theme.get('smoke')};
                    }

                    html,
                    body,
                    input,
                    select,
                    textarea {
                        font-family: "Roboto", sans-serif;
                    }

                    a {
                        text-decoration: none;
                    }

                    a,
                    ::selection {
                        color: ${theme.get(theme.main)};
                    }

                    ::selection {
                        background-color: ${theme.base};
                    }
                `}
            />
            <Header
                theme={theme}
            />
            <Hero
                theme={theme}
            />
            <Content
                theme={theme}>
                {children}
            </Content>
        </Flex>
    );
}

/**
 * Exprting
 */
export { Wrapper };
