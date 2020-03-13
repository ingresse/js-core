/**
 * SPA Example
 */
const spa = {
    embed: `
<iframe
 src="https://codesandbox.io/embed/ingressesdk-usage-example-56mos?fontsize=14&hidenavigation=1&theme=dark"
 style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
 title="@ingresse/sdk usage example"
 allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
 sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>
    `,
};

/**
 * SSR Example
 */
const ssr = {
    code: `
/**
 * Core Packages
 */
import fetch from 'isomorphic-unfetch';

/**
 * Our Package
 */
import SDK, { event } from '@ingresse/sdk';

/**
 * Pollyfill to Fetch API
 */
global.fetch = fetch;

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
 * Main Page
 */
function Index({
    ingresseError,
    ingresseEvent,
    ingresseEventId,
}) {
    return (
        <div>
            <h1>
                Ingresse SDK SSR Example
            </h1>
            <div>
                ingresseEventId: {ingresseEventId}
            </div>
            <div>
                {JSON.stringify(ingresseEvent || ingresseError)}
            </div>
        </div>
    );
}

/**
 * Retrieve data
 */
Index.getInitialProps = async function() {
    const ingresseEventId = 12345;

    try {
        const ingresseEvent = await event.get(ingresseEventId, { attributes: true });

        console.log('Ingresse Event data fetched', ingresseEvent);

        return {
            ingresseEvent,
            ingresseEventId,
        };
    } catch (ingresseError) {
        console.log('Ingresse Event error', ingresseError);

        return {
            ingresseError,
            ingresseEventId,
        };
    }
};

/**
 * Export to NextJS as Page
 */
export default Index;
    `,
};

/**
 * Exporting
 */
export {
    spa,
    ssr,
};
