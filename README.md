# @icp-sdk/core/candid

JavaScript and TypeScript module to work with Candid interfaces

## Usage

Simple:

```ts
import { encode, decode } from '@dfinity/cbor';

const value = true;
const encoded = encode(value); // returns `Uint8Array [245]` (which is "F5" in hex)
const decoded = decode(encoded); // returns `true`
```

With replacer/reviver:

```ts
import { encode, decode, type Replacer, type Reviver } from '@dfinity/cbor';

const value = { a: 1, b: 2 };

// Encoding with replacer
const replacer: Replacer = val => (typeof val === 'number' ? val * 2 : val);
const result = encode(value, replacer);
decode(result); // { a: 2, b: 4 }

// Decoding with reviver
const bytes = encode(value);
const reviver: Reviver = val => (typeof val === 'number' ? val * 2 : val);
decode(bytes, reviver); // { a: 2, b: 4 }
```

## API

<!-- TSDOC_START -->

## :toolbox: Functions

- [decode](#gear-decode)
- [encode](#gear-encode)
- [encodeWithSelfDescribedTag](#gear-encodewithselfdescribedtag)

### :gear: decode

Decodes a CBOR byte array into a value.
See {@link Reviver} for more information.

| Function | Type                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------- |
| `decode` | `<T extends unknown = any>(input: Uint8Array<ArrayBufferLike>, reviver?: Reviver<T> or undefined) => T` |

Parameters:

- `input`: - The CBOR byte array to decode.
- `reviver`: - A function that can be used to manipulate the decoded value.

Examples:

Simple

```ts
const value = true;
const encoded = encode(value); // returns `Uint8Array [245]` (which is "F5" in hex)
const decoded = decode(encoded); // returns `true`
```

Reviver

```ts
const bytes = ...; // Uint8Array corresponding to the CBOR encoding of `{ a: 1, b: 2 }`
const reviver: Reviver = val => (typeof val === 'number' ? val * 2 : val);
decode(bytes, reviver); // returns `{ a: 2, b: 4 }`
```

### :gear: encode

Encodes a value into a CBOR byte array.

| Function | Type                                                                                                 |
| -------- | ---------------------------------------------------------------------------------------------------- |
| `encode` | `<T = any>(value: CborValue<T>, replacer?: Replacer<T> or undefined) => Uint8Array<ArrayBufferLike>` |

Parameters:

- `value`: - The value to encode.
- `replacer`: - A function that can be used to manipulate the input before it is encoded.

Examples:

Simple

```ts
const value = true;
const encoded = encode(value); // returns `Uint8Array [245]` (which is "F5" in hex)
```

Replacer

```ts
import { IDL } from '@icp-sdk/core/candid';
```

## License

Additional API Documentation can be found [here](https://js.icp.build/core/latest/libs/candid/api).
