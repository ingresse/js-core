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
function Utils() {
    /**
     * Render
     */
    return (
        <section
            id="utils">
            <Container>
                <Section
                    first
                    id="utils-summary">
                    <Title>
                        Utilities
                    </Title>
                </Section>
            </Container>
        </section>
    );
}

/**
 * Exporting
 */
export default Utils;
