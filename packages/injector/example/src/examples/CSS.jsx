/**
 * Core Packages
 */
import React, { useState } from 'react';
import { css } from '@ingresse/injector';

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
function CSS({
    loading,
    setLoading,

    setResult,
}) {
    /**
     * Local values
     */
    const [ asset, setAsset ]     = useState(assets.css.href || '');
    const [ snippet, setSnippet ] = useState(assets.css.style || '');

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

        css({
            id  : `ing-injector-example-css-${id}`,
            [id]: (id === 'href' ? asset : snippet),
        })
        .then((injected) => {
            const msg = 'CSS Injection done';

            console.info(msg, injected);
            setResult(msg);
        })
        .catch((error) => {
            const msg = 'CSS Injection error';

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
                id="href"
                noValidate
                onSubmit={handleSubmit}>
                <Segment padding="20px 0 10px">
                    <Input
                        id="asset-css"
                        name="asset-css"
                        label="CSS href"
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
                        Inject External CSS
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
                        rows={5}
                        id="asset-style"
                        name="asset-style"
                        label="CSS Snippet"
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
                        Inject CSS Snippet
                    </Button>
                </Segment>
            </form>
        </>
    );
}

/**
 * Exporting
 */
export { CSS };
