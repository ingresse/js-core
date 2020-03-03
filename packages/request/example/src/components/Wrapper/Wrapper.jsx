/**
 * Core Packages
 */
import React from 'react';

/**
 * CSS
 */
import {
<<<<<<< HEAD
    colors,
=======
>>>>>>> Add: 'Request' package Example React Application;
    css,
    Global,
} from '../../css';

/**
<<<<<<< HEAD
=======
 * Settings
 */
import {
    theme,
} from '../../settings';

/**
>>>>>>> Add: 'Request' package Example React Application;
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

<<<<<<< HEAD
                        color           : ${colors.get('inverse')};
                        background-color: ${colors.get('oil', 'dark')};
=======
                        color           : ${theme.get('inverse')};
                        background-color: ${theme.get('primary')};
                        background-image: linear-gradient(45deg, ${theme.get('primary', 'dark')}, ${theme.get('primary')});
>>>>>>> Add: 'Request' package Example React Application;
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
<<<<<<< HEAD
                        background-image: linear-gradient(90deg, black, ${colors.get('oil', 'dark')});
=======
                        background-image: linear-gradient(45deg, ${theme.get('primary', 'dark')}, ${theme.get('primary')});
>>>>>>> Add: 'Request' package Example React Application;
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
