/**
 * Core Packages
 */
import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';

/**
 * Settings
 */
import {
    apis,
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
    Input,
    Select,
} from './components';

/**
 * Component Itself
 */
function App() {
    /**
     * Local values
     */
    const [ tab, setTab ]         = useState(storage.get('tab') || 'POST');
    const [ loading, setLoading ] = useState(false);
    const [ dialog, setDialog ]   = useState(null);
    const [ options, setOptions ] = useState({
        api   : (storage.get('api') || apis.hmla),
        apikey: (storage.get('apikey') || ''),
        auth  : (storage.get('auth') || null),
        event : (storage.get('event') || null),
    });


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
     * Options changes handler
     *
     * @param {object} evt
     */
    function handleChanges({ target }) {
        const {
            id,
            value,
        } = (target || {});

        storage[(!value ? 'remove' : 'set')](id, value);

        setOptions({
            ...options,
            [id]: (value || ''),
        });
    }

    /**
     * Render
     */
    return (
        <ThemeProvider theme={theme}>
            <Wrapper>
                <Segment padding="0">
                    <Segment padding="10px 0">
                        <Select
                            id="api"
                            name="api"
                            label="API"
                            disabled={loading}
                            value={options.api}
                            onChange={handleChanges}>
                            {Object.keys(apis).map((apiName) => (
                                <option
                                    id={apiName}
                                    key={apiName}
                                    value={apis[apiName]}>
                                    {apis[apiName]}
                                </option>
                            ))}
                        </Select>
                    </Segment>
                    <Segment padding="10px 0">
                        <Input
                            type="text"
                            id="apikey"
                            name="apikey"
                            label="API Key"
                            autoComplete="off"
                            disabled={loading}
                            value={options.apikey}
                            onChange={handleChanges}
                            error={(!options.apikey)}
                        />
                    </Segment>
                </Segment>

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
                            options={options}
                            setOptions={setOptions}
                            loading={loading}
                            setLoading={setLoading}
                            setResult={setDialog}
                            handleChanges={handleChanges}
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
                            background="white">
                            <Segment
                                padding="0"
                                styles={{
                                    wordBreak: 'break-all',
                                }}>
                                {(dialog && (typeof dialog === 'object')) ? JSON.stringify(dialog) : dialog}
                            </Segment>
                            <Segment
                                padding="40px 0 0"
                                textAlign="center">
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
