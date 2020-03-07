/**
 * Core Packages
 */
import {
    css,
    styled,
} from '../../css';

/**
 * Component Styles
 */
const HeaderStyled = styled.header`
    position: absolute;
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
        transition: color ease .3s;
    }

    .header {
        &__brand {
            font-weight: bold;
            font-size  : 24px;
            line-height: 32px;

            position: relative;
            display : inline-block;
            margin  : 0;
            padding : 5px 10px 3px 100px;

            transition: background ease .3s, color ease .3s;

            &:before {
                position: absolute;
                content : attr(data-brand);
                width   : 90px;
                height  : 40px;
                top     : 0;
                left    : 0;

                font-weight: bold;
                font-size  : 22px;
                line-height: 40px;
                text-align : center;

                color     : ${({ theme }) => theme.get('inverse')};
                background: ${({ theme }) => theme.get('base')};

                transition: background ease .3s, color ease .3s;
            }

            &:hover {
                color     : ${({ theme }) => theme.get('inverse')};
                background: ${({ theme }) => theme.get('base', '', 0.75)};
            }
        }

        &__nav {
            &__list {
                position  : relative;
                display   : flex;
                margin    : 0 -10px;
                padding   : 0;
                flex-wrap : wrap;
                list-style: none;

                &__item {
                    position  : relative;
                    margin    : 0;
                    padding   : 0 10px;
                    text-align: center;

                    flex-basis: 0;
                    flex-grow : 1;

                    background: transparent;

                    &__link {
                        display: block;
                        width  : 100%;
                        padding: 10px;
                        transition: background ease .3s, color ease .3s, border-radius ease .3s;
                    }

                    &:hover .header__nav__list__item__link,
                    &:focus-within .header__nav__list__item__link,
                    .header__nav__list__item__link.active,
                    .header__nav__list__item__link:active,
                    .header__nav__list__item__link:focus {
                        color: ${({ theme }) => theme.get('inverse')};
                        background: ${({ theme }) => theme.get('base')};
                    }

                    &__submenu {
                        position      : absolute;
                        visibility    : hidden;
                        display       : block;
                        opacity       : 0;
                        pointer-events: none;
                        border-radius : 0;
                        transform     : translateY(-110%);
                        border-radius : 0;

                        will-change: opacity, visibility, transform;
                        transition : opacity .15s ease, visibility .15s ease, transform .6s ease;

                        width: calc(100% - 20px);

                        &__item {
                            padding: 10px;

                            color: ${({ theme }) => theme.get('inverse')};
                            background: ${({ theme }) => theme.get('base', '', 0.75)};

                            transition: color .3s ease, background .3s ease;

                            &:hover,
                            &:active,
                            &.active {
                                background: ${({ theme }) => theme.get('base')};
                            }
                        }
                    }

                    &:hover > .header__nav__list__item__submenu,
                    &__submenu:hover {
                        visibility    : visible;
                        opacity       : 1;
                        pointer-events: auto;
                        transform     : translateY(0);

                        transition: opacity .3s ease, visibility .3s ease, transform .05s ease;
                    }
                }
            }
        }
    }

    ${({ theme }) => !theme.xs ? null : css`
        padding   : 10px 0;
        text-align: center;

        .header {
            &__menu {
                &-toggle {
                    position: absolute;
                    top     : 10px;
                    right   : 10px;

                    width  : 45px;
                    height : 40px;
                    margin : 0;
                    padding: 0;
                    border : 0;
                    outline: 0;
                    background: transparent;

                    font-size  : 0;
                    line-height: 0;

                    &:before,
                    &:after,
                    .header__menu-toggle__stripe {
                        content: " ";
                        display: block;
                        margin : 6px auto;
                        width  : 25px;
                        height : 2px;
                        background: ${theme.base};
                    }
                }
            }

            &__drawer {
                position: fixed;
                top     : 10px;
                right   : 10px;
                bottom  : 10px;
                left    : 10px;
                padding : 10px;
                border-radius: 2.5px;
                overflow: scroll;

                box-shadow: 0 0 10px rgba(0, 0, 0, .1);

                transform  : translateX(120%);
                will-change: transform;
                transition : transform .3s ease;


                background: linear-gradient(150deg, ${theme.get('sunflower', 'light')} 15%, ${theme.get('sunflower', 'light', 0.95)} 70%, ${theme.get('sunflower')} 94%);

                &.active {
                    transform: translateX(0);
                }

                .header {
                    &__menu-toggle {
                        right: 5px;

                        &:before,
                        &:after {
                            position : absolute;
                            left     : 10px;
                            margin   : 0;
                            transform: rotate(45deg);
                        }

                        &:before {
                            transform: rotate(-45deg);
                        }
                    }

                    &__nav {
                        margin    : 50px 0 0;
                        text-align: left;

                        &__list {
                            flex-direction: column;

                            &__item {
                                font-weight  : bold;
                                text-align   : left;
                                margin-bottom: 20px;

                                &__submenu {
                                    position  : relative;
                                    transform : none;
                                    visibility: visible;
                                    opacity   : 1;
                                    width     : 100%;
                                    padding   : 0 0 0 20px;
                                    font-weight: normal;

                                    &__item {
                                        margin    : 5px 0;
                                        color     : ${theme.base};
                                        background: transparent;

                                        &.active {
                                            color     : ${theme.inverse};
                                            background: ${theme.base};
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `};
`;

/**
 * Exporting
 */
export default HeaderStyled;
