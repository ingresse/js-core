/**
 * Core Packages
 */
import React, { Suspense } from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

/**
 * Pages
 */
import {
    routes,
} from '../../pages';

/**
 * Composition Components
 */
import {
    Wrapper,
} from '../';

/**
 * Component Itself
 */
function Router({
    theme,
    options,
    loading,
    handleChanges,
}) {
    /**
     * Render
     */
    return (
        <BrowserRouter>
            <Wrapper
                theme={theme}>
                <Suspense fallback={(<div>...</div>)}>
                    <Switch>
                        {Object.keys(routes).map((routeKey) => {
                            const route = routes[routeKey];
                            const Page  = route.page;

                            return (
                                <Route
                                    exact
                                    key={routeKey}
                                    path={route.path}>
                                    <Page />
                                </Route>
                            );
                        })}
                    </Switch>
                </Suspense>
            </Wrapper>
        </BrowserRouter>
    );
}

/**
 * Exporting
 */
export { Router };
