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
function Microservices() {
    /**
     * Render
     */
    return (
        <section
            id="ms">
            <Container>
                <Segment
                    as="article"
                    padding="60px 0 0"
                    id="ms-summary">
                    <Title>
                        Microservices
                    </Title>
                </Segment>
            </Container>
        </section>
    );
}

/**
 * Exporting
 */
export default Microservices;
