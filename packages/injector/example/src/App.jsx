/**
 * Core Packages
 */
import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';

/**
 * Settings
 */
import {
    examples,
    theme,
} from './settings';

/**
 * Services
 */
import {
    storage,
} from './services';

/**
 * Composition Components
 */
import {
    /**
     * Grid
     */
    Col,
    Row,
    Dialog,
    Segment,
    Container,
    Wrapper,

    /**
     * Generics
     */
    Button,
} from './components';

/**
 * Component Itself
 */
function App() {
    /**
     * Local values
     */
    const [ tab, setTab ]         = useState(storage.get('tab') || 'JS');
    const [ loading, setLoading ] = useState(false);
    const [ dialog, setDialog ]   = useState(null);

    /**
     * Tab Toggle Handler
     *
     * @param {string} newTab
     */
    function handleTab(newTab) {
        if (loading) {
            return;
        }

        storage.set('tab', newTab);

        setTab(newTab);
    }

    /**
     * Render
     */
    return (
        <ThemeProvider theme={theme}>
            <Wrapper>
                <Segment padding="0">
                    <Row
                        horizontal="center">
                        {Object.keys(examples).map((exampleName) => (
                            <Col
                                xs={(12 / Object.keys(examples).length)}
                                key={exampleName}>
                                <Segment padding="10px 0">
                                    <Button
                                        sm
                                        block
                                        radius={4}
                                        type="button"
                                        color={(tab !== exampleName) ? '' : 'oil'}
                                        id={`example-toggle-${exampleName}`}
                                        onClick={() => handleTab(exampleName)}
                                        styles={{
                                            minWidth: 'auto',
                                        }}>
                                        {exampleName}
                                    </Button>
                                </Segment>
                            </Col>
                        ))}
                    </Row>
                </Segment>

                {Object.keys(examples).map((exampleName) => {
                    const Example = examples[exampleName];

                    if (exampleName !== tab) {
                        return null;
                    }

                    return (
                        <Example
                            loading={loading}
                            setLoading={setLoading}
                            setResult={setDialog}
                            key={`example-content-${exampleName}`}
                        />
                    );
                })}

                <Dialog
                    opened={!!dialog}
                    onClose={() => setDialog(null)}>
                    <Container sm>
                        <Segment
                            radius={4}
                            padding="40px"
                            textColor="oil"
                            background="white"
                            textAlign="center">
                            <Segment
                                padding="0"
                                styles={{
                                    wordBreak: 'break-all',
                                }}>
                                {(dialog && (typeof dialog === 'object')) ? JSON.stringify(dialog) : dialog}
                            </Segment>
                            <Segment
                                padding="40px 0 0">
                                <Button
                                    type="button"
                                    onClick={() => setDialog(null)}>
                                    Ok
                                </Button>
                            </Segment>
                        </Segment>
                    </Container>
                </Dialog>
            </Wrapper>
        </ThemeProvider>
    );
}

/**
 * Exporting
 */
export default App;
