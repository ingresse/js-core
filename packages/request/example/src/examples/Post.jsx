/**
 * Core Packages
 */
import React, { useState } from 'react';
import { post } from '@ingresse/request';

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
function Post({
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
    } = (options || {});
    /**
     * Local values
     */
    const disabled                  = (loading || !apikey);
    const [ endpoint, setEndpoint ] = useState('/login');
    const [ form, setForm ]         = useState({
        email   : '',
        password: '',
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
            email,
            password,
        } = (form || {});

        setLoading(true);
        handleChanges({
            target: {
                id   : 'auth',
                value: null,
            },
        });

        post(`${api}${endpoint}`, {
            apikey,
        }, {
            email,
            password,
        })
        .then((response) => {
            console.info('POST response', response);

            const { responseData } = (response || {});
            const { data }         = (responseData || {});

            setResult(data);
            handleChanges({
                target: {
                    id   : 'auth',
                    value: data,
                },
            });
        })
        .catch((error) => {
            console.error('POST error', error);
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
                    disabled={true}
                    onChange={({ target }) => setEndpoint(target.value)}
                />
            </Segment>
            <Segment padding="10px 0">
                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    autoComplete="username"
                    value={form.email}
                    disabled={disabled}
                    onChange={({ target }) => setForm({
                        ...form,
                        email: target.value
                    })}
                />
            </Segment>
            <Segment padding="10px 0">
                <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    autoComplete="current-password"
                    value={form.password}
                    disabled={disabled}
                    onChange={({ target }) => setForm({
                        ...form,
                        password: target.value
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
export default Post;
