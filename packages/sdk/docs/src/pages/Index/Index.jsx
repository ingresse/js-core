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
    Segment,
    Container,

    /**
     * Typography
     */
    A,
    Title,
    Text,

    /**
     * Generics
     */
    CodeEditor,
} from '../../components';

/**
 * Examples
 */
import {
    app,
    development,
    production,
    ssrBlock,
    replaceToken,
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
                <Segment
                    as="article"
                    padding="60px 0 0"
                    id="index-example-install">
                    <Title>
                        ES Module to plug applications into
                        {' '}
                        <A
                            target="_blank"
                            href="https://www.ingresse.com">
                            <strong>Ingresse</strong>
                        </A>'s
                        {' '}
                        Platform
                    </Title>
                    <Row vertical="center">
                        <Col xs={12} sm={6}>
                            <Segment
                                padding="10px 0 0">
                                <Text margin="10px 0 20px">
                                    If your project is a SPA or has a production bundler:
                                </Text>
                                <CodeEditor
                                    language="shell">
                                    {development}
                                </CodeEditor>
                            </Segment>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Segment
                                padding="10px 0 0">
                                <Text margin="10px 0 20px">
                                    If your project is a <strong>SSR</strong> application:
                                </Text>
                                <CodeEditor
                                    language="shell">
                                    {production}
                                </CodeEditor>
                            </Segment>
                        </Col>
                    </Row>
                </Segment>

                <Segment
                    as="article"
                    padding="60px 0"
                    id="index-example-app">
                    <Title>
                        Usage example
                    </Title>
                    <Segment
                        padding="10px 0">
                        <CodeEditor
                            files={[
                                {
                                    name   : 'SPA / bundler',
                                    content: app.replace(replaceToken, ''),
                                },
                                {
                                    name   : 'SSR',
                                    content: app.replace(replaceToken, ssrBlock),
                                },
                            ]}
                        />
                    </Segment>
                </Segment>
            </Container>
        </section>
    );
}

/**
 * Exporting
 */
export default Index;
