/**
 * Core Packages
 */
import React from 'react';
import { del } from '@ingresse/request';

/**
 * Composition Components
 */
import {
    Avatar,
    Button,
    Input,
    Segment,
} from '../components';

/**
 * Component Itself
 */
function Del({
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
        event,
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
     * Inherit Event values
     */
    const {
        id    : eventId,
        title : eventTitle,
        poster: eventPoster,
    } = (event || {});

    /**
     * Local values
     */
    const disabled = (loading || !apikey || !authToken || !token || !userId || !eventId);
    const endpoint = `/v2/events/${eventId || 'your-event-id-from-GET-example'}/poster`;

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

        del(`${api}${endpoint}`, {
            apikey,
            usertoken: token,
        }, {
            headers: {
                'Authentication': `Bearer ${authToken}`,
            },
        })
        .then((response) => {
            console.info('DEL response', response);
            setResult(response);
        })
        .catch((error) => {
            console.error('DEL error', error);
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
                />
            </Segment>
            {(!eventPoster) ? (null) : (
                <Segment padding="10px 0">
                    <Avatar
                        center
                        radius="4px"
                        width="140px"
                        height="186px"
                        alt={eventTitle}
                        src={eventPoster}
                        styles={{
                            boxShadow: '0 0 5px rgba(0,0,0,0.25)',
                        }}
                    />
                </Segment>
            )}
            <Segment padding="10px 0">
                <Button
                    block
                    type="submit"
                    color="ruby"
                    loading={loading}
                    disabled={disabled}>
                    DELETE EVENT POSTER
                </Button>
            </Segment>
        </form>
    );
}

/**
 * Exporting
 */
export default Del;
