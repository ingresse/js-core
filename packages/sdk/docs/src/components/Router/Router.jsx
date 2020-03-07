/**
 * Core Packages
 */
import React from 'react';
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
    options,
    loading,
    handleChanges,
}) {
    /**
     * Render
     */
    return (
        <BrowserRouter>
            <Wrapper>
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
            </Wrapper>
        </BrowserRouter>
    );
}

/**
 * Exporting
 */
export { Router };
