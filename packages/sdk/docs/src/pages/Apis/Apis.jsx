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
function Apis() {
    /**
     * Render
     */
    return (
        <section
            id="apis">
            <Container>
                <Section
                    first
                    id="apis-summary">
                    <Title>
                        APIs
                    </Title>
                </Section>
            </Container>
        </section>
    );
}

/**
 * Exporting
 */
export default Apis;
