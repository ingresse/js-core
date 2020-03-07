/**
 * Core Packages
 */
import React from 'react';

/**
 * Composition Components
 */
import {
    /**
     * Grid
     */
    Segment,
    Container,

    /**
     * Typography
     */
    Title,
} from '../../components';

/**
 * Page Itself
 */
function Utils() {
    /**
     * Render
     */
    return (
        <section
            id="utils">
            <Container>
                <Segment
                    as="article"
                    padding="60px 0 0"
                    id="utils-summary">
                    <Title>
                        Utilities
                    </Title>
                </Segment>
            </Container>
        </section>
    );
}

/**
 * Exporting
 */
export default Utils;
