/**
 * Resources
 */
import js from '../../src/methods/js.js';

/**
 * Unit Tests
 */
describe('JS Injector', () => {
    it('should be called, creating empty element', async () => {
        expect.assertions(1);

        try {
            const injected = await js();

            expect(injected.tagName).toEqual('SCRIPT');
        } catch({ code, message }) {
            expect(code).toEqual(-1);
            expect(message).toEqual('injector:invalid-arguments');
        }
    });

    it('should be called, getting success', async () => {
        expect.assertions(2);

        try {
            const injected = await js({
                id     : 'test',
                target : 'body',
                content: `function injectorTest() { console.log('JS injector test') }`
            });

            expect(injected).toBeDefined();
            expect(injected.tagName).toEqual('SCRIPT');
        } catch({ code }) {
            expect(code).toEqual(-1);
        }
    });
});
