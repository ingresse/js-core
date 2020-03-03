/**
 * Resources
 */
import wrapper, { css, js } from '../src/index.js';

/**
 * Unit Tests
 */
describe('@ingresse/injector', () => {
    it('check wrapper', () => {
        expect(typeof wrapper).toEqual('function');
    });

    describe('methods', () => {
        it('check CSS', () => {
            expect(typeof css).toEqual('function');
        });
        it('check JS', () => {
            expect(typeof js).toEqual('function');
        });
    });
});
