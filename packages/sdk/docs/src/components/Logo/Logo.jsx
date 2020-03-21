/** @jsx jsx */
import { NavLink } from 'react-router-dom';

/**
 * Styles
 */
import {
    css,
    jsx,
    useTheme,
} from '../../css';

/**
 * Settings
 */
import {
    routes,
} from '../../pages';

/**
 * Component Itself
 */
function Logo() {
    /**
     * Styles
     */
    const theme  = useTheme();
    const styles = css`
        font-weight: bold;
        font-size  : 24px;
        line-height: 32px;

        position: relative;
        display : inline-block;
        margin  : 0;
        padding : 5px 10px 3px 100px;

        color: ${theme.get('base')};

        transition: background-color .3s ease, color .3s ease !important;

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

            color: ${theme.get('inverse')};
            background-color: ${theme.get('base')};

            transition: color .3s ease;
        }

        &:hover {
            color: ${theme.get('inverse')};
            background-color: ${theme.get('base', '', 0.75)};
        }
    `;

    /**
     * Render
     */
    return (
        <NavLink
            css={styles}
            data-brand="js core"
            to={routes.index.path}>
            SDK
        </NavLink>
    );
}

/**
 * Exporting
 */
export { Logo };
