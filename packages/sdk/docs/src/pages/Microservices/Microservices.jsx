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
    Section,
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
                <Section
                    first
                    id="ms-summary">
                    <Title>
                        Microservices
                    </Title>
                </Section>
            </Container>
        </section>
    );
}

/**
 * Exporting
 */
export default Microservices;
