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
function Apis() {
    /**
     * Render
     */
    return (
        <section
            id="apis">
            <Container>
                <Segment
                    as="article"
                    padding="60px 0 0"
                    id="apis-summary">
                    <Title>
                        APIs
                    </Title>
                </Segment>
            </Container>
        </section>
    );
}

/**
 * Exporting
 */
export default Apis;
