/**
 * Core Packages
 */
import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Composition Components
 */
import {
    List,
    ListItem,
} from '../';

/**
 * Component Itself
 */
function HeaderMenu ({
    children,
    routes,
    handleClick,
}) {
    /**
     * Render
     */
    return (
        <nav
            role="navigation"
            className="header__nav">
            {children}
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
                                to={route.path}
                                onClick={handleClick}
                                aria-haspopup={!!route.multi}
                                activeClassName="active"
                                className="header__nav__list__item__link">
                                {route.menu}
                            </NavLink>
                            {(!route.multi) ? (null) : (
                                <List
                                    aria-label="submenu"
                                    className="header__nav__list__item__submenu">
                                    {Object.keys(routes).map((subRouteKey) => {
                                        const routeSub  = routes[subRouteKey];
                                        const { subOf } = (routeSub || {});

                                        if (subOf !== routeKey) {
                                            return (null);
                                        }

                                        return (
                                            <ListItem
                                                exact
                                                withLink
                                                as={NavLink}
                                                to={routeSub.path}
                                                onClick={handleClick}
                                                id={subRouteKey}
                                                key={subRouteKey}
                                                className="header__nav__list__item__submenu__item">
                                                {routeSub.menu}
                                            </ListItem>
                                        );
                                    })}
                                </List>
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
