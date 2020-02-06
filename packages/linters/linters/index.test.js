'use strict';

/**
 * Resources
 */
const wrapper = require('./index');

/**
 * Unit Tests
 */
describe('@ingresse/linters', () => {
    it('check wrapper', () => {
        expect(typeof wrapper).toEqual('object');
        expect(typeof wrapper.eslint).toEqual('object');
        expect(wrapper.eslint.extends).toEqual('react-app');
    });
});
