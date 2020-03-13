/**
 * Core Packages
 */
import React, { useState } from 'react';

/**
 * Pages
 */
import {
    routes,
} from '../../pages';

/**
 * Composition Components
 */
import HeaderMenu from './HeaderMenu';
import {
    Row,
    Col,
    Container,
    Logo,
} from '../../components';

/**
 * Component Styles
 */
import HeaderStyled from './HeaderStyled';

/**
 * Component Itself
 */
function Header({
    theme,
    loading,
}) {
    /**
     * Local values
     */
    const [ drawer, setDrawer ] = useState(false);

    /**
     * Click handler
     *
     * @param {object} evt
     */
    function handleClick(evt) {
        if (drawer) {
            setDrawer(false);
        }

        if ((!evt || !evt.preventDefault) || !loading) {
            return;
        }

        evt.preventDefault();
    }

    /**
     * Toggle Drawer Visibility
     */
    function toggleDrawer() {
        setDrawer(!drawer);
    }

    /**
     * Render
     */
    return (
        <HeaderStyled
            id="header"
            className="header">
            <Container fluid>
                <Row vertical="center">
                    <Col
                        xs={12}
                        sm={2}
                        md={4}
                        lg={6}>
                        <Logo
                            className="header__brand"
                        />
                    </Col>
                    {(theme.xs) ? (null) : (
                        <Col
                            sm={10}
                            md={8}
                            lg={6}>
                            <HeaderMenu
                                routes={routes}
                                handleClick={handleClick}
                            />
                        </Col>
                    )}
                </Row>
            </Container>

            {(!theme.xs) ? (null) : (
                <>
                    {(drawer) ? (null) : (
                        <button
                            type="button"
                            onClick={toggleDrawer}
                            className="header__menu-toggle">
                            <span className="header__menu-toggle__stripe">
                                menu
                            </span>
                        </button>
                    )}
                    <div
                        id="header__drawer"
                        onClick={toggleDrawer}
                        className={`header__drawer${!drawer ? '' : ' active'}`}>
                        <Logo
                            className="header__brand"
                        />
                        <button
                            type="button"
                            onClick={toggleDrawer}
                            className="header__menu-toggle">
                            close
                        </button>
                        <HeaderMenu
                            routes={routes}
                        />
                    </div>
                </>
            )}
        </HeaderStyled>
    );
}

/**
 * Exporting
 */
export { Header };
