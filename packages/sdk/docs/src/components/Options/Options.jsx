/**
 * Core Packages
 */
import React from 'react';

/**
 * Composition Components
 */
import {
    /**
     * Grid
     */
    Segment,

    /**
     * Generics
     */
    Input,
    InputMask,
} from '../';

/**
 * Component Itself
 */
function Options({
    loading,
    options,
    handleChanges,
}) {
    /**
     * Render
     */
    return (
        <Segment padding="0">
            <Segment padding="10px 0">
                <InputMask
                    id="company"
                    name="company"
                    label="Company ID"
                    autoComplete="off"
                    mask="999"
                    maskChar=" "
                    disabled={loading}
                    value={options.company}
                    onChange={handleChanges}
                    error={!!(!options.company)}
                />
            </Segment>
            <Segment padding="10px 0">
                <Input
                    type="text"
                    id="apikey"
                    name="apikey"
                    label="API Key"
                    autoComplete="off"
                    disabled={loading}
                    value={options.apikey}
                    onChange={handleChanges}
                    error={!!(!options.apikey)}
                />
            </Segment>
        </Segment>
    );
}

/**
 * Exporting
 */
export { Options };
