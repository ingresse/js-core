/**
 * Core Packages
 */
import styled from '@emotion/styled';

/**
 * Component Styles
 */
const HeroStyled = styled.header`
    position: relative;
    z-index : 10;
    background-color: ${({ theme }) => theme.get(theme.main)};
    background      : linear-gradient(${({ theme }) => `150deg, ${theme.get('sunflower', 'light')} 15%, ${theme.get('sunflower', 'light')} 70%, ${theme.get('sunflower')} 94%`});

    margin : 0;
    padding: ${({ xs }) => xs ? 12 : 16}0px 0 ${({ xs }) => xs ? 4 : 8}0px;

    font-size  : 20px;
    line-height: 30px;
    text-align : center;

    .hero__title {
        font-weight: bold;
        font-size  : ${({ xs }) => xs ? 32 : 54}px;
        line-height: ${({ xs }) => xs ? 4 : 7}0px;

        display: block;
        margin : 0;
        padding: 0;
    }

    .hero__effects {
        position: absolute;
        z-index : -10;
        top     : 0;
        width   : 100%;
        height  : 100%;
        overflow: hidden;
        transform: skew(45deg);
        transform-origin: 0;
        background: linear-gradient(150deg, rgba(0, 0, 0, .05) 15%, transparent 70%, rgba(0, 0, 0, .05) 94%);
    }
`;

/**
 * Exporting
 */
export default HeroStyled;
