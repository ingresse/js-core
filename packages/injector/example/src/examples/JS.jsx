/**
 * Core Packages
 */
import React, { useState } from 'react';
import { js } from '@ingresse/injector';

/**
 * Composition Components
 */
import {
    Input,
    TextArea,
    Button,
    Segment,
} from '../components';

/**
 * Settings
 */
import {
    assets,
} from '../settings';

/**
 * Component Itself
 */
function JS({
    loading,
    setLoading,

    setResult,
}) {
    /**
     * Local values
     */
    const [ asset, setAsset ]     = useState(assets.js.src || '');
    const [ snippet, setSnippet ] = useState(assets.js.snippet || '');

    /**
     * Submit Handler
     *
     * @param {object} evt
     */
    function handleSubmit(evt) {
        const { target } = (evt || {});
        const { id }     = (target || {});

        evt.preventDefault();

        if (loading) {
            return;
        }

        setLoading(true);

        js({
            id  : `ing-injector-example-js-${id}`,
            [id]: (id === 'src' ? asset : snippet),
        })
        .then((injected) => {
            const msg = 'JS Injection done';

            console.info(msg, injected);
            setResult(msg);
        })
        .catch((error) => {
            const msg = 'JS Injection error';

            console.error(msg, error);
            setResult(`${msg} ${error}`);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    /**
     * Render
     */
    return (
        <>
            <form
                id="src"
                noValidate
                onSubmit={handleSubmit}>
                <Segment padding="20px 0 10px">
                    <Input
                        id="asset-js"
                        name="asset-js"
                        label="JS src"
                        autoComplete="off"
                        type="url"
                        value={asset}
                        disabled={loading}
                        onChange={({ target }) => setAsset(target.value)}
                    />
                </Segment>
                <Segment padding="10px 0">
                    <Button
                        block
                        type="submit"
                        loading={loading}
                        disabled={loading || !asset}>
                        Inject External JS
                    </Button>
                </Segment>
            </form>
            <Segment
                padding="10px 0"
                margin="0 0 20px"
                borderBottom
            />
            <form
                id="content"
                noValidate
                onSubmit={handleSubmit}>
                <Segment padding="10px 0">
                    <TextArea
                        rows={11}
                        id="asset-style"
                        name="asset-style"
                        label="JS Snippet"
                        autoComplete="off"
                        value={snippet}
                        disabled={loading}
                        onChange={({ target }) => setSnippet(target.value)}
                    />
                </Segment>
                <Segment padding="10px 0">
                    <Button
                        block
                        type="submit"
                        disabled={loading || !snippet}>
                        Inject JS Snippet
                    </Button>
                </Segment>
            </form>
        </>
    );
}

/**
 * Exporting
 */
export { JS };
