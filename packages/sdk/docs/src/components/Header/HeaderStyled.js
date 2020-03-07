/**
 * Core Packages
 */
import styled from '@emotion/styled';

/**
 * Component Styles
 */
const HeaderStyled = styled.header`
    position: fixed;
    z-index : 50;
    top     : 0;
    right   : 0;
    left    : 0;

    background-color: transparent;

    padding: 20px 0;

    font-size  : 18px;
    line-height: 20px;

    a {
        color: ${({ theme }) => theme.get('base')};
        transition: color ease 0.35s;
    }

    .header {
        &__brand {
            font-weight: bold;
            font-size  : 24px;
            line-height: 30px;

            position: relative;
            display : inline-block;
            margin  : 0;
            padding : 5px 0 5px 70px;

            &:before {
                position: absolute;
                content : "ing";
                width   : 60px;
                height  : 40px;
                top     : 0;
                left    : 0;

                font-weight: bold;
                font-size  : 26px;
                line-height: 40px;
                text-align : center;

                border-radius: 2.5px;

                color     : ${({ theme }) => theme.get('inverse')};
                background: ${({ theme }) => theme.get('base', '', 0.8)};
            }
        }

        &__nav {
            &__list {
                position  : relative;
                display   : flex;
                margin    : 0;
                padding   : 0;
                flex-wrap : wrap;
                list-style: none;

                &__item {
                    position  : relative;
                    margin    : 0;
                    padding   : 0 5px;
                    text-align: center;

                    flex-basis: 0;
                    flex-grow : 1;

                    background: transparent;

                    border-radius: 2.5px;

                    &__link {
                        display: block;
                        width  : 100%;
                        padding: 10px;
                        border-radius: 2.5px;
                        transition: background ease 0.35s, color ease 0.35s;

                        &.active,
                        &:active,
                        &:hover {
                            color: ${({ theme }) => theme.get('inverse')};
                            background: ${({ theme }) => theme.get('base', '', 0.8)};
                        }
                    }
                }
            }
        }
    }
`;

/**
 * Exporting
 */
export default HeaderStyled;
