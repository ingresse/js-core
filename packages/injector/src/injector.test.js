/**
 * Resources
 */
import injector from './injector';

/**
 * Unit Tests
 */
describe('injector', () => {
    describe('invalid arguments', () => {
        it('empty "tag"', () => {
            expect.assertions(2);

            return (
                injector({
                    href: 'https://cdn.ingresse.com/auth/auth.min.css',
                })
                .then((injected) => {
                    // Does not happen
                    expect(typeof injected).toEqual('Object');
                })
                .catch(({ code, message }) => {
                    expect(code).toBe(-1);
                    expect(message).toEqual('injector:invalid-arguments');
                })
            );
        });
    });

    describe('target unable to inject', () => {
        it('invalid target', () => {
            expect.assertions(2);

            return (
                injector({
                    tag    : 'script',
                    src    : 'https://cdn.ingresse.com/auth/auth.min.js',
                    target : 'inexistent-html-tag',
                })
                .then((injected) => {
                    // Does not happen
                    expect(typeof injected).toEqual('Object');
                })
                .catch(({ code, message }) => {
                    expect(code).toBe(-1);
                    expect(message).toEqual('injector:target-unable-to-append-element');
                })
            );
        });

        it('target doesnt support append', () => {
            const bodyElement     = document.querySelector('body');
            const invalidElement  = document.createElement('test-html-tag');
            invalidElement.append = null;

            bodyElement.append(invalidElement);

            expect.assertions(2);

            return (
                injector({
                    tag   : 'script',
                    src   : 'https://cdn.ingresse.com/auth/auth.min.js',
                    target: 'test-html-tag',
                })
                .then((injected) => {
                    // Does not happen
                    expect(typeof injected).toEqual('Object');
                })
                .catch(({ code, message }) => {
                    expect(code).toBe(-1);
                    expect(message).toEqual('injector:target-unable-to-append-element');
                })
            );
        });
    });

    describe('injection happens', () => {
        it('to a new element', () => {
            const src = '/fake-js-file.js';

            expect.assertions(2);

            return (
                injector({
                    src,
                    target: 'body',
                    tag   : 'script',
                })
                .then((injected) => {
                    expect(typeof injected).toEqual('Object');
                    expect(injected.src).toEqual(src);
                })
                .catch((error) => {
                    // Does not happen
                    expect(error).toBeDefined();
                })
            );
        });

        it('to a new link element', () => {
            const href  = '/fake-css-file.css';
            const type = 'text/stylesheet';

            expect.assertions(2);

            return (
                injector({
                    href,
                    type,
                    target: 'body',
                    tag   : 'link',
                })
                .then((injected) => {
                    expect(typeof injected).toEqual('Object');
                    expect(injected.href).toEqual(href);
                    expect(injected.type).toEqual(type);
                })
                .catch((error) => {
                    // Does not happen
                    expect(error).toBeDefined();
                })
            );
        });

        it('replacing an existent element', () => {
            const id               = 'my-previous-injected-js';
            const bodyElement      = document.querySelector('body');
            const previousElement  = document.createElement('test-html-tag');
            previousElement.id     = id;

            bodyElement.append(previousElement);

            expect.assertions(2);

            return (
                injector({
                    id,
                    target : 'head',
                    tag    : 'script',
                    content: `(function(){ console.info('it works')})()`,
                })
                .then((injected) => {
                    expect(typeof injected).toEqual('Object');
                    expect(injected.id).toEqual(id);
                })
                .catch((error) => {
                    // Does not happen
                    expect(error).toBeDefined();
                })
            );
        });
    });

    describe('document unable to inject', () => {
        it('"document" not exists', () => {
            Object.defineProperty(global, 'document', {});

            expect.assertions(2);

            return (
                injector({})
                .then((injected) => {
                    // Does not happen
                    expect(typeof injected).toEqual('Object');
                })
                .catch(({ code, message }) => {
                    expect(code).toBe(-1);
                    expect(message).toEqual('injector:document-unable-to-create-tag');
                })
            );
        });

        it('"document.createElement" is not a function', () => {
            Object.defineProperty(global, 'document', {
                createElement: {},
            });

            expect.assertions(2);

            return (
                injector({})
                .then((injected) => {
                    // Does not happen
                    expect(typeof injected).toEqual('Object');
                })
                .catch(({ code, message }) => {
                    expect(code).toBe(-1);
                    expect(message).toEqual('injector:document-unable-to-create-tag');
                })
            );
        });
    });
});
