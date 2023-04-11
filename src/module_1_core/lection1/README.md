# Documentation for Lesson 1: Encoding Information. Data, Data Types and Structures. Typing in Programming Languages

## Task: Write a function for working with bits

To complete the task, you need to write a function called createBitAccessor which creates an object for working with bits and takes a Uint8Array array as input. Returns an object with get and set methods that allow you to access the bit of a specific element and change its value accordingly.

### Parameters

`arr` - the Uint8Array array to work with.

### Methods

### `get`

`index` - the index of the element in the Uint8Array array to access.<br>
`bitNumber` - the ordinal number of the bit in the Uint8Array element.
The get method returns the bit value.

### `set`

`index` - the index of the element in the Uint8Array array to access.<br>
`bitNumber` - the ordinal number of the bit in the Uint8Array element.<br>
`value` - the new value of the bit.
The set method changes the bit value and returns the new Uint8Array array value.

## Examples of Use

createBitAccessor

```js
const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

console.log(bitAccessor.get(0, 1)); // 1
console.log(bitAccessor.set(0, 1, 0)); //
console.log(bitAccessor.get(0, 1)); // 0
```
