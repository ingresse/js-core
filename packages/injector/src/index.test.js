'use strict';

/**
 * Resources
 */
const wrapper = require('./index');

/**
 * Unit Tests
 */
describe('@ingresse/injector', () => {
    it('check wrapper', () => {
        expect(typeof wrapper).toEqual('function');
    });

    describe('methods', () => {
        it('check JS', () => {
            expect(typeof wrapper.js).toEqual('function');
        });
    });
});
