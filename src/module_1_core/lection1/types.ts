export interface BitAccessor {
	get: (index: number, bitNumber: number) => number;
	set: (index: number, bitNumber: number, value: number) => void;
}

export enum BitAccessorError {
	INVALID_ARGUMENT = 'Invalid argument: "arr" must be a Uint8Array.',
	INVALID_BIT_NUMBER = "Invalid bit number: bitNumber must be between 0 and 7 (inclusive).",
	INVALID_INDEX = "Invalid index: index must be greater than or equal to 0 and less than the length of the array.",
	INVALID_VALUE = "Invalid value: value must be either 0 or 1.",
}
