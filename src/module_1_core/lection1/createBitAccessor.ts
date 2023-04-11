import { BitAccessor, BitAccessorError } from "./types.js";

export const createBitAccessor = (arr: Uint8Array): BitAccessor => {
	if (!(arr instanceof Uint8Array)) {
		throw new Error(BitAccessorError.INVALID_ARGUMENT);
	}

	return {
		get: (index: number, bitNumber: number): number => {
			if (index < 0 || index >= arr.length) {
				throw new Error(BitAccessorError.INVALID_INDEX);
			}

			if (bitNumber < 0 || bitNumber > 7) {
				throw new Error(BitAccessorError.INVALID_BIT_NUMBER);
			}

			return Number((arr[index] & (1 << bitNumber)) > 0);
		},
		set: (index: number, bitNumber: number, value: number): void => {
			if (index < 0 || index >= arr.length) {
				throw new Error(BitAccessorError.INVALID_INDEX);
			}

			if (bitNumber < 0 || bitNumber > 7) {
				throw new Error(BitAccessorError.INVALID_BIT_NUMBER);
			}

			if (value === 0) {
				arr[index] &= ~(1 << bitNumber);
			} else {
				arr[index] |= 1 << bitNumber;
			}
		},
	};
};
