/**
 * Resources
 */
import handler from '../../src/handlers/response.js';

/**
 * Unit Tests
 */
describe('Handler: Response', () => {
    describe('out of range', () => {
        it('with invalid response argument', () => {
            const transform = '';
            const reject    = undefined;
            const response  = undefined;
            const result    = handler(transform, reject, response);

            expect(result).toEqual({});
        });

        it('with valid response argument', () => {
            const transform = '';
            const reject    = undefined;
            const response  = {
                status: 401,
            };
            const result    = handler(transform, reject, response);

            expect(result).toEqual(response);
        });

        it('with valid response argument, calling reject method', () => {
            const transform = '';
            const reject    = (data) => {
                return {
                    ...data,
                    test: test,
                };
            };
            const response  = {
                status: 501,
            };
            const result    = handler(transform, reject, response);

            expect(result).toEqual(reject(response));
        });
    });

    describe('204 no content', () => {
        it('should return the original response param', () => {
            const transform = '';
            const reject    = (original) => original;
            const response  = {
                status: 204,
            };
            const result    = handler(transform, reject, response);

            expect(result).toEqual(response);
        });
    });

    describe('transform', () => {
        it('should return the original response param, by invalid "transformer"', () => {
            const transform = 'not-a-response-parser';
            const reject    = (original) => original;
            const response  = {
                status: 200,
            };
            const result    = handler(transform, reject, response);

            expect(result).toEqual(response);
        });
    });
});
