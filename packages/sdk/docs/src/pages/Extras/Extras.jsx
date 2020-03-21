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
function Extras() {
    /**
     * Render
     */
    return (
        <section
            id="extras">
            <Container>
                <Section
                    first
                    id="extras-summary">
                    <Title>
                        Extras
                    </Title>
                </Section>
            </Container>
        </section>
    );
}

/**
 * Exporting
 */
export default Extras;
