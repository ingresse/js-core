'use strict';

/**
 * Resources
 */
const js = require('./js');

/**
 * Unit Tests
 */
describe('JS Injector', () => {
    beforeEach(() => {
        jest.doMock('../injector', async () => {});
    });

    it('should be called', async () => {
        expect.assertions(1);

        try {
            await js({});
        } catch({ code }) {
            expect(code).toEqual(-1);
        }
    });
});
