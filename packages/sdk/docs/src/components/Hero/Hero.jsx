/**
 * Core Packages
 */
import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Pages
 */
import {
    get,
} from '../../pages';

/**
 * Composition Components
 */
import {
    Container,
} from '../';

/**
 * Component Styles
 */
import HeroStyled from './HeroStyled';

/**
 * Component Itself
 */
function Hero({
    xs,
    children,
}) {
    const { pathname } = useLocation();
    const { title }    = (get(pathname) || {});

    /**
     * Render
     */
    return (
        <HeroStyled
            xs={xs}
            id="hero"
            className="hero">
            <div
                aria-hidden={true}
                className="hero__effects"
            />
            <Container fluid>
                {!title ? null : (
                    <h1
                        id="hero__title"
                        className="hero__title">
                        {title}
                    </h1>
                )}
                {children}
            </Container>
        </HeroStyled>
    );
}

/**
 * Exporting
 */
export { Hero };
