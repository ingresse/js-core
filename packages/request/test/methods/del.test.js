/**
 * Resources
 */
import method from '../../src/methods/del.js';

/**
 * Helper values
 */
const methodName = 'DELETE';
const serverUrl  = 'https://my-request-lib-test.io/';

/**
 * Unit Tests
 */
describe(`Method: ${methodName}`, () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('without server URL', () => {
        method()
        .catch(({ code, message }) => {
            expect(code).toEqual(-1);
            expect(message).toEqual('request:missing-url');
        });
    });

    describe('Real Requests', () => {
        it('invalid server', async () => {
            const errorMessage = 'Invalid Server';

            fetch.mockRejectOnce(errorMessage);

            try {
                await method(serverUrl);
            } catch (error) {
                expect(error).toEqual(errorMessage);
            }
        });

        it('valid server', async () => {
            const mockData = {
                test: 'request data valid'
            };

            fetch.mockResponseOnce(JSON.stringify(mockData));

            const data = await method(serverUrl);

            expect(data.test).toEqual(mockData.test);
            expect(fetch.mock.calls.length).toEqual(1);
            expect(fetch.mock.calls[0][0]).toEqual(serverUrl);
            expect(fetch.mock.calls[0][1].method).toEqual(methodName);
        });
    });
});
