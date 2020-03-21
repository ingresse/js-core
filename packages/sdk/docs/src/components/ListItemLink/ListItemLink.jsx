/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { NavLink } from 'react-router-dom';

/**
 * Component Itself
 */
function ListItemLink({
    to     = '',
    styles = '',
    ...props
}) {
    /**
     * Context values
     */
    const {
        secondary,
    } = useTheme();

    /**
     * Styles
     */
    const _css = css`
        display: block;
        margin : 0;
        padding: 15px 20px;
        cursor : pointer;

        color: ${secondary};
        background-color: transparent;

        transition: background-color 0.3s ease;

        &:hover {
            background-color: black;
        }

        ${styles}
    `;

    /**
     * Render
     */
    return (
        <NavLink
            css={_css}
            to={{
                pathname: to,
                search  : window.location.search,
            }}
            {...props}
        />
    );
}

/**
 * Exporting
 */
export { ListItemLink };
