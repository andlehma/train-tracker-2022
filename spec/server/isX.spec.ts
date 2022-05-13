import { boolToIsX, isXToBool } from '../../src/model/isX';

describe('isX', () => {
	describe('isXToBool', () => {
		it('maps "1" to "true"', () => {
			expect(isXToBool('1')).toBeTrue();
		});

		it('maps "0" to "false"', () => {
			expect(isXToBool('0')).toBeFalse();
		});
	});

	describe('boolToIsX', () => {
		it('maps "true" to "1"', () => {
			expect(boolToIsX(true)).toEqual('1');
		});

		it('maps "false" to "0"', () => {
			expect(boolToIsX(false)).toEqual('0');
		});
	});
});
