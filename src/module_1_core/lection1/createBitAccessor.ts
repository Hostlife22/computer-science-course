import { BitAccessor, BitAccessorError } from "./types.js";

export const validateBitAccessorParams = (
	arr: Uint8Array,
	index: number,
	bitNumber: number
): void => {
	if (!(arr instanceof Uint8Array))
		throw new Error(BitAccessorError.INVALID_ARGUMENT);
	if (index < 0 || index >= arr.length)
		throw new Error(BitAccessorError.INVALID_INDEX);
	if (bitNumber < 0 || bitNumber > 7)
		throw new Error(BitAccessorError.INVALID_BIT_NUMBER);
};

export const createBitAccessor = (arr: Uint8Array): BitAccessor => {
	return {
		get: (index: number, bitNumber: number): number => {
			validateBitAccessorParams(arr, index, bitNumber);
			return Number((arr[index] & (1 << bitNumber)) > 0);
		},
		set: (index: number, bitNumber: number, value: number): void => {
			validateBitAccessorParams(arr, index, bitNumber);
			if (value === 0) {
				arr[index] &= ~(1 << bitNumber);
			} else {
				arr[index] |= 1 << bitNumber;
			}
		},
	};
};
