'use strict';

/**
 * Resources
 */
const request = require('./request');

/**
 * Unit Tests
 */
describe('request', () => {
    describe('invalid arguments', () => {
        it('empty "url"', () => {
            expect.assertions(2);

            return (
                request()
                .then((injected) => {
                    // Does not happen
                    expect(typeof injected).toEqual('Object');
                })
                .catch(({ code, message }) => {
                    expect(code).toBe(-1);
                    expect(message).toEqual('request:missing-url');
                })
            );
        });

        it('"url" containing "undefined" on path', () => {
            expect.assertions(2);

            return (
                request('https://ingresse.com/undefined')
                .then((injected) => {
                    // Does not happen
                    expect(typeof injected).toEqual('Object');
                })
                .catch(({ code, message }) => {
                    expect(code).toBe(-1);
                    expect(message).toEqual('request:param-undefined-present');
                })
            );
        });
    });
});
