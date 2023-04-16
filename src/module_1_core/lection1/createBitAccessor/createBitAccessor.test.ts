import { beforeEach, describe, expect, it } from "vitest";

import {
	createBitAccessor,
	validateBitAccessorParams,
} from "./createBitAccessor.js";
import { BitAccessor, BitAccessorError } from "./types.js";

describe("validateBitAccessorParams", () => {
	let arr: Uint8Array;

	beforeEach(() => {
		arr = new Uint8Array([0b1110, 0b1101]);
	});

	it("should throw an error if arr is not an instance of Uint8Array", () => {
		expect(() => validateBitAccessorParams([] as any, 0, 0)).toThrowError(
			BitAccessorError.INVALID_ARGUMENT
		);
		expect(() => validateBitAccessorParams({} as any, 0, 0)).toThrowError(
			BitAccessorError.INVALID_ARGUMENT
		);
		expect(() => validateBitAccessorParams(123 as any, 0, 0)).toThrowError(
			BitAccessorError.INVALID_ARGUMENT
		);
	});

	it("should throw an error if index is less than 0 or greater than or equal to arr length", () => {
		expect(() => validateBitAccessorParams(arr, -1, 0)).toThrowError(
			BitAccessorError.INVALID_INDEX
		);
		expect(() => validateBitAccessorParams(arr, 2, 0)).toThrowError(
			BitAccessorError.INVALID_INDEX
		);
	});

	it("should throw an error if bitNumber is less than 0 or greater than 7", () => {
		expect(() => validateBitAccessorParams(arr, 0, -1)).toThrowError(
			BitAccessorError.INVALID_BIT_NUMBER
		);
		expect(() => validateBitAccessorParams(arr, 0, 8)).toThrowError(
			BitAccessorError.INVALID_BIT_NUMBER
		);
	});
});

describe("createBitAccessor", () => {
	let arr: Uint8Array;
	let bitAccessor: BitAccessor;

	beforeEach(() => {
		arr = new Uint8Array([0b1110, 0b1101]);
		bitAccessor = createBitAccessor(arr);
	});

	it("should create a valid BitAccessor object", () => {
		expect(bitAccessor).toBeDefined();
		expect(bitAccessor.get).toBeDefined();
		expect(bitAccessor.set).toBeDefined();
	});

	describe("get", () => {
		it("should throw an error if index is out of range", () => {
			expect(() => bitAccessor.get(-1, 0)).toThrowError(
				BitAccessorError.INVALID_INDEX
			);
			expect(() => bitAccessor.get(4, 0)).toThrowError(
				BitAccessorError.INVALID_INDEX
			);
		});

		it("should throw an error if bitNumber is out of range", () => {
			expect(() => bitAccessor.get(0, -1)).toThrowError(
				BitAccessorError.INVALID_BIT_NUMBER
			);
			expect(() => bitAccessor.get(0, 8)).toThrowError(
				BitAccessorError.INVALID_BIT_NUMBER
			);
		});

		it("should return the correct bit value", () => {
			arr[0] = 0b1110;
			expect(bitAccessor.get(0, 0)).toBe(0);
			expect(bitAccessor.get(0, 1)).toBe(1);
			expect(bitAccessor.get(0, 2)).toBe(1);
			expect(bitAccessor.get(0, 3)).toBe(1);
			expect(bitAccessor.get(0, 4)).toBe(0);
			expect(bitAccessor.get(0, 5)).toBe(0);
			expect(bitAccessor.get(0, 6)).toBe(0);
			expect(bitAccessor.get(0, 7)).toBe(0);
		});
	});

	describe("set", () => {
		it("should throw an error if index is out of range", () => {
			expect(() => bitAccessor.set(-1, 0, 1)).toThrowError(
				BitAccessorError.INVALID_INDEX
			);
			expect(() => bitAccessor.set(4, 0, 1)).toThrowError(
				BitAccessorError.INVALID_INDEX
			);
		});

		it("should throw an error if bitNumber is out of range", () => {
			expect(() => bitAccessor.set(0, -1, 1)).toThrowError(
				BitAccessorError.INVALID_BIT_NUMBER
			);
			expect(() => bitAccessor.set(0, 8, 1)).toThrowError(
				BitAccessorError.INVALID_BIT_NUMBER
			);
		});

		it("should set the correct bit value", () => {
			bitAccessor.set(0, 0, 1);
			expect(arr[0]).toBe(0b1111);

			bitAccessor.set(0, 1, 1);
			expect(arr[0]).toBe(0b1111);

			bitAccessor.set(0, 2, 1);
			expect(arr[0]).toBe(0b1111);

			bitAccessor.set(0, 3, 1);
			expect(arr[0]).toBe(0b1111);

			bitAccessor.set(0, 4, 1);
			expect(arr[0]).toBe(0b11111);

			bitAccessor.set(0, 5, 1);
			expect(arr[0]).toBe(0b111111);

			bitAccessor.set(0, 6, 1);
			expect(arr[0]).toBe(0b1111111);

			bitAccessor.set(0, 7, 1);
			expect(arr[0]).toBe(0b11111111);

			bitAccessor.set(1, 0, 1);
			expect(arr[1]).toBe(0b1101);
		});

		it("should clear the correct bit value", () => {
			arr[0] = 0b1111;

			bitAccessor.set(0, 0, 0);
			expect(arr[0]).toBe(0b1110);

			bitAccessor.set(0, 1, 0);
			expect(arr[0]).toBe(0b1100);

			bitAccessor.set(0, 2, 0);
			expect(arr[0]).toBe(0b1000);

			bitAccessor.set(0, 3, 0);
			expect(arr[0]).toBe(0b0000);

			bitAccessor.set(0, 4, 0);
			expect(arr[0]).toBe(0b0000);

			bitAccessor.set(0, 5, 0);
			expect(arr[0]).toBe(0b0000);

			bitAccessor.set(0, 6, 0);
			expect(arr[0]).toBe(0b0000);

			bitAccessor.set(0, 7, 0);
			expect(arr[0]).toBe(0b0000);

			bitAccessor.set(1, 0, 0);
			expect(arr[1]).toBe(0b1100);
		});
	});
});
