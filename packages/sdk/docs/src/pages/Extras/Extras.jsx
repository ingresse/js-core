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
function Extras() {
    /**
     * Render
     */
    return (
        <section
            id="extras">
            <Container>
                <Segment
                    as="article"
                    padding="60px 0 0"
                    id="extras-summary">
                    <Title>
                        Extras
                    </Title>
                </Segment>
            </Container>
        </section>
    );
}

/**
 * Exporting
 */
export default Extras;
