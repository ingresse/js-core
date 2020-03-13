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
    Col,
    Row,
    Section,
    Segment,
    Container,

    /**
     * Typography
     */
    A,
    Text,

    /**
     * Generics
     */
    CodePreview,
} from '../../components';

/**
 * Examples
 */
import {
    development,
    production,
    spa,
    ssr,
} from './examples';

/**
 * Page Itself
 */
function Index() {
    /**
     * Render
     */
    return (
        <section
            id="index">
            <Container>
                <Section
                    first
                    id="index-example-install"
                    title={(
                        <span>
                            ES Module to plug applications into
                            {' '}
                            <A
                                target="_blank"
                                href="https://www.ingresse.com">
                                <strong>Ingresse</strong>
                            </A>'s
                            {' '}
                            Platform
                        </span>
                    )}>
                    <Row vertical="center">
                        <Col xs={12} sm={6}>
                            <Segment
                                padding="10px 0 0">
                                <Text margin="10px 0 20px">
                                    If your project is a SPA or has a production bundler:
                                </Text>
                                <CodePreview
                                    language="shell">
                                    {development}
                                </CodePreview>
                            </Segment>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Segment
                                padding="10px 0 0">
                                <Text margin="10px 0 20px">
                                    If your project is a <strong>SSR</strong> application:
                                </Text>
                                <CodePreview
                                    language="shell">
                                    {production}
                                </CodePreview>
                            </Segment>
                        </Col>
                    </Row>
                </Section>

                <Section
                    id="index-example-usage"
                    title="Usage example">
                    <Segment
                        padding="10px 0">
                        <CodePreview
                            files={[
                                {
                                    name : 'SPA / bundler',
                                    embed: spa.embed,
                                },
                                {
                                    name   : 'SSR / NextJS',
                                    content: ssr.code.trim(),
                                },
                            ]}
                        />
                    </Segment>
                </Section>
            </Container>
        </section>
    );
}

/**
 * Exporting
 */
export default Index;
