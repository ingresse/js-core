/**
 * Replace Token
 */
const replaceToken = '##shouldbereplaced##';

/**
 * App Example
 */
const app = `
/**
 * Core Packages
 */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * Our Package
 */
import SDK, { event } from '@ingresse/sdk';
${replaceToken}
/**
 * Your Application values
 */
const sdkOptions = {
    apiKey : 'your-ingresse-api-key',
    company: 'your-ingresse-company-id',
    env    : 'integration',
};

/**
 * Initialization
 */
SDK(sdkOptions);

/**
 * Application Main Wrapper
 */
function App() {
    /**
     * Local values
     */
    const [ myEvent, setMyEvent ] = useState(null);

    /**
     * Retrieve your event information
     */
    function getEvent() {
        const myEventId = 21232;

        event.get(myEventId)
        .catch(console.error)
        .then(setMyEvent);
    }

    /**
     * Did mount
     */
    useEffect(() => {
        getEvent();
    }, []);

    /**
     * Render
     */
    return (
        <div>
            {JSON.stringify(myEvent)}
        </div>
    );
}

/**
 * Render
 */
ReactDOM.render(<App />, document.getElementById('root'));
`.trim();

/**
 * SSR Block
 */
const ssrBlock = `
/**
 * Server Side Rendering Helper Packages
 */
import fetch from 'isomorphic-unfetch';

/**
 * Server Side Rendering fetch API support/pollyfill
 */
global.fetch = fetch;
`;

/**
 * Exporting
 */
export {
    app,
    ssrBlock,
    replaceToken,
};
