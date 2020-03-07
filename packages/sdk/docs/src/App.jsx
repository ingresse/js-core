/**
 * Core Packages
 */
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'emotion-theming';

/**
 * Our Package
 */
import SDK from '@ingresse/sdk';

/**
 * Settings
 */
import { theme } from './settings';

/**
 * Services
 */
import { storage } from './services';

/**
 * Composition Components
 */
import { Router } from './components';

/**
 * Component Itself
 */
function App() {
    /**
     * Local values
     */
    const [ loading, setLoading ] = useState(false);
    const [ options, setOptions ] = useState({
        apikey : (storage.get('apikey') || ''),
        company: (storage.get('company') || ''),
    });

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
     * Mount
     */
    useEffect(() => {
        SDK(options);
    }, [ options ]);

    /**
     * Render
     */
    return (
        <ThemeProvider
            theme={theme}>
            <Router
                loading={loading}
                setLoading={setLoading}

                options={options}
                handleChanges={handleChanges}
            />
        </ThemeProvider>
    );
}

/**
 * Exporting
 */
export default App;
