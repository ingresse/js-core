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
    Container,
    Content,
    Flex,
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
            flex
            alignItems="center"
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

                        color           : ${theme.get('inverse')};
                        background-color: ${theme.get('secondary')};
                        background-image: linear-gradient(45deg, ${theme.get('secondary', 'dark')}, ${theme.get('secondary')});
                    }

                    html,
                    body,
                    button,
                    input,
                    textarea {
                        font-family: monospace;
                    }

                    html,
                    body,
                    #root {
                        width : 100%;
                        height: 100%;
                    }

                    #root {
                        background-image: linear-gradient(45deg, ${theme.get('secondary', 'dark')}, ${theme.get('secondary')});
                    }
                `}
            />
            <Container xs>
                <Content>
                    {children}
                </Content>
            </Container>
        </Flex>
    );
}

/**
 * Exprting
 */
export { Wrapper };
