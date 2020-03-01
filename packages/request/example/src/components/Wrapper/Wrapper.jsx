/**
 * Core Packages
 */
import React from 'react';

/**
 * CSS
 */
import {
    colors,
    css,
    Global,
} from '../../css';

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

                        color           : ${colors.get('inverse')};
                        background-color: ${colors.get('oil', 'dark')};
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

                    #root {
                        background-image: linear-gradient(90deg, black, ${colors.get('oil', 'dark')});
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
