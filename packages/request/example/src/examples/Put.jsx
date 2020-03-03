/**
 * Core Packages
 */
import React, { useState } from 'react';
import { put } from '@ingresse/request';

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
function Put({
    options,

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
        auth,
    } = (options || {});

    /**
     * Authentication values
     */
    const {
        authToken,
        token,
        userId,
    } = (auth || {});

    /**
     * Local values
     */
    const disabled                  = (loading || !apikey || !authToken || !token || !userId);
    const [ endpoint, setEndpoint ] = useState(`/users/${userId || 'your-user-id-after-login'}`);
    const [ form, setForm ]         = useState({
        name: '',
    });

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

        const {
            name,
        } = (form || {});

        setLoading(true);

        put(`${api}${endpoint}`, {
            apikey,
            usertoken: token,
            method   : 'update',
        }, {
            name,
        }, {
            headers: {
                'Authentication': `Bearer ${authToken}`,
            },
        })
        .then((response) => {
            console.info('PUT response', response);
            setResult(`PUT success ${JSON.stringify(response)}`);
        })
        .catch((error) => {
            console.error('PUT error', error);
            setResult(`PUT error ${JSON.stringify(error)}`);
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
                    disabled={true}
                    onChange={({ target }) => setEndpoint(target.value)}
                />
            </Segment>
            <Segment padding="10px 0">
                <Input
                    id="name"
                    name="name"
                    type="name"
                    label="Update your profile's Name"
                    autoComplete="name"
                    value={form.name}
                    disabled={disabled}
                    onChange={({ target }) => setForm({
                        ...form,
                        name: target.value
                    })}
                    button={{
                        id      : 'login-submit',
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
export default Put;
