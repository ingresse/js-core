/**
 * Resources
 */
import css from '../../src/methods/css.js';

/**
 * Unit Tests
 */
describe('CSS Injector', () => {
    it('should be called, creating empty element', async () => {
        expect.assertions(2);

        try {
            const inejectedElement = await css();

            expect(inejectedElement).not.toBeDefined();

        } catch({ code, message }) {
            expect(code).toEqual(-1);
            expect(message).toEqual('injector:invalid-arguments');
        }
    });

    it('should be called, getting success', async () => {
        expect.assertions(4);

        try {
            const injectedCSS   = await css({
                id  : 'font-family',
                href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap',
            });
            const injectedStyle = await css({
                id     : 'font-family-definition',
                content: `font-family: 'Roboto', sans-serif;`,
            });

            expect(injectedCSS).toBeDefined();
            expect(injectedStyle).toBeDefined();
            expect(injectedCSS.tagName).toEqual('LINK');
            expect(injectedStyle.tagName).toEqual('STYLE');
        } catch({ code }) {
            expect(code).toEqual(-1);
        }
    });
});
