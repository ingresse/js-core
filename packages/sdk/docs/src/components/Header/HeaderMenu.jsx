/**
 * Core Packages
 */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Composition Components
 */
import {
    Dropdown,
    List,
    ListItem,
} from '../';

/**
 * Component Itself
 */
function HeaderMenu ({
    routes,
    handleClick,
}) {
    /**
     * Local values
     */
    const [ submenus, setSubmenus ] = useState({});

    /**
     * Mouse event handler
     *
     * @param {object} evt
     */
    function handleMouseOver({ target }) {
        const { dropdown } = (target || {});

        if (!dropdown || submenus[dropdown]) {
            return;
        }

        setSubmenus({
            ...submenus,
            [dropdown]: true,
        });
    }

    /**
     * Mouse event handler
     *
     * @param {object} evt
     */
    function handleMouseOut({ target }) {
        const { dropdown } = (target || {});

        if (!dropdown || !submenus[dropdown]) {
            return;
        }

        setSubmenus({
            ...submenus,
            [dropdown]: false,
        });
    }

    /**
     * Render
     */
    return (
        <nav className="header__nav">
            <ul className="header__nav__list">
                {Object.keys(routes).map((routeKey) => {
                    const route = routes[routeKey];

                    if (route.subOf || !route.menu) {
                        return (null);
                    }

                    return (
                        <li
                            key={routeKey}
                            className="header__nav__list__item">
                            <NavLink
                                exact
                                to={route.path}
                                onClick={handleClick}
                                activeClassName="active"
                                data-dropdown={routeKey}
                                onMouseOut={handleMouseOut}
                                onMouseOver={handleMouseOver}
                                className="header__nav__list__item__link">
                                {route.menu}
                            </NavLink>
                            {(!route.multi) ? (null) : (
                                <Dropdown
                                    thin
                                    opened={submenus[routeKey]}>
                                    <List>
                                        {Object.keys(routes).map((subRouteKey) => {
                                            const routeSub  = routes[subRouteKey];
                                            const { subOf } = (routeSub || {});

                                            if (subOf !== routeKey) {
                                                return (null);
                                            }

                                            return (
                                                <ListItem
                                                    withLink
                                                    id={subRouteKey}
                                                    key={subRouteKey}>
                                                    <NavLink
                                                        to={routeSub.path}>
                                                        {routeSub.menu}
                                                    </NavLink>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Dropdown>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

/**
 * Exporting
 */
export default HeaderMenu;
