/**
 * Resources
 */
import request from '../src/request.js';

/**
 * Unit Tests
 */
describe('request', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    describe('invalid arguments', () => {
        it('empty "url"', () => {
            expect.assertions(2);

            return (
                request()
                .then((response) => {
                    // Does not happen
                    expect(typeof response).toEqual('Object');
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
                .then((response) => {
                    // Does not happen
                    expect(typeof response).toEqual('Object');
                })
                .catch(({ code, message }) => {
                    expect(code).toBe(-1);
                    expect(message).toEqual('request:param-undefined-present');
                })
            );
        });
    });

    describe('Real Requests', () => {
        it('invalid server', async () => {
            const errorMessage = 'Invalid Server';

            fetch.mockRejectOnce(errorMessage);

            try {
                const data = await request('https://my-request-lib-test.io/');
            } catch (error) {
                expect(error).toEqual(errorMessage);
            }
        });

        it('valid server', async () => {
            const mockData = {
                test: 'response data valid'
            };

            fetch.mockResponseOnce(JSON.stringify(mockData));

            const data = await request('https://my-request-lib-test.io/', {
                method: 'POST',
                body  : {
                    test: 'test',
                },
            });

            expect(data.test).toEqual(mockData.test);
            expect(fetch.mock.calls.length).toEqual(1);
        });
    });
});
