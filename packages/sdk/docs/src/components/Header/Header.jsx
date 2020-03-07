/**
 * Core Packages
 */
import React from 'react';
import { NavLink } from 'react-router-dom';

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
} from '../../components';

/**
 * Component Styles
 */
import HeaderStyled from './HeaderStyled';

/**
 * Component Itself
 */
function Header({
    xs,
    loading,
}) {
    /**
     * Click handler
     *
     * @param {object} evt
     */
    function handleClick(evt) {
        if ((!evt || !evt.preventDefault) || !loading) {
            return;
        }

        evt.preventDefault();
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
                    <Col xs={12} sm={6}>
                        <NavLink
                            to={routes.index.path}
                            className="header__brand">
                            JS SDK
                        </NavLink>
                    </Col>
                    {(xs) ? (null) : (
                        <Col sm={6}>
                            <HeaderMenu
                                routes={routes}
                                handleClick={handleClick}
                            />
                        </Col>
                    )}
                </Row>
            </Container>

            {(!xs) ? (null) : (
                <HeaderMenu
                    routes={routes}
                />
            )}
        </HeaderStyled>
    );
}

/**
 * Exporting
 */
export { Header };
