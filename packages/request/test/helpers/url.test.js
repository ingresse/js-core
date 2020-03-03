/**
 * Resources
 */
import helper from '../../src/helpers/url.js';

/**
 * Unit Tests
 */
describe('Helper: URL', () => {
    it('should return empty string', () => {
        const result = helper();

        expect(result).toEqual('');
    });

    it('should return only query params', () => {
        const params = {
            sense: 'does not have',
        };
        const result = helper('', params);

        expect(result).toEqual('?sense=does%20not%20have');
    });

    it('should build a simple URL', () => {
        const original = 'https://www.ingresse.com/';
        const result   = helper(original);

        expect(result).toEqual(result);
    });

    it('should build a URL with params', () => {
        const original = 'https://www.ingresse.com/?test=test';
        const result   = helper(original);

        expect(result).toEqual(result);
    });

    it('should build a URL with params as arguments', () => {
        const original = 'https://www.ingresse.com/';
        const params   = {
            test: 'test',
        };
        const result   = helper(original, params);

        expect(result).toEqual(original.concat('?test=test'));
    });

    it('should build a URL with complext params', () => {
        const original = 'https://www.ingresse.com/?test=test';
        const params   = {
            test : 'fake',
            query: 'simulation',
        };
        const result   = helper(original, params);

        expect(result).toEqual('https://www.ingresse.com/?test=fake&query=simulation');
    });
});
