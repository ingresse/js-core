/**
 * Core Packages
 */
import React, { useState } from 'react';
import { get } from '@ingresse/request';

/**
 * Composition Components
 */
import {
    Input,
    Icon,
    Segment,
} from '../components';

/**
 * Component Itself
 */
function Get({
    options,
    handleChanges,

    loading,
    setLoading,

    setResult,
}) {
    /**
     * Inherit values
     */
    const {
        api,
        apikey,
        event,
    } = (options || {});
    const {
        id: eventId,
    } = (event || {});

    /**
     * Local values
     */
    const disabled                  = (loading || !apikey);
    const [ endpoint, setEndpoint ] = useState(`/event/${eventId || '21232'}`);

    /**
     * Submit Handler
     *
     * @param {object} evt
     */
    function handleSubmit(evt) {
        evt.preventDefault();

        if (disabled) {
            return;
        }

        setLoading(true);
        handleChanges({
            target: {
                id   : 'event',
                value: null,
            },
        });

        get(`${api}${endpoint}`, {
            apikey,
        })
        .then((response) => {
            console.info('GET response', response);

            const { responseData } = (response || {});

            setResult(response);
            handleChanges({
                target: {
                    id   : 'event',
                    value: (responseData || null),
                },
            });
        })
        .catch((error) => {
            console.error('GET error', error);
            setResult(error);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    /**
     * Render
     */
    return (
        <form
            noValidate
            onSubmit={handleSubmit}>
            <Segment padding="10px 0">
                <Input
                    id="endpoint"
                    name="endpoint"
                    label="Endpoint"
                    autoComplete="off"
                    value={endpoint}
                    disabled={disabled}
                    onChange={({ target }) => setEndpoint(target.value)}
                    button={{
                        id      : 'endpoint-submit',
                        type    : 'submit',
                        style   : {
                            cursor: (disabled ? 'not-allowed' : 'pointer'),
                        },
                        children: (
                            <Icon
                                size={24}
                                slug={loading ? 'loader' : 'arrow-right'}
                                color={disabled ? 'mercury' : 'black'}
                            />
                        ),
                    }}
                />
            </Segment>
        </form>
    );
}

/**
 * Exporting
 */
export default Get;
