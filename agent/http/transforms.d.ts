import { type HttpAgentRequestTransformFn, type HttpHeaderField, type Nonce } from './types.ts';
export declare const JSON_KEY_EXPIRY = "__expiry__";
export type JsonnableExpiry = {
    [JSON_KEY_EXPIRY]: string;
};
export declare class Expiry {
    private readonly __expiry__;
    readonly _isExpiry = true;
    private constructor();
    /**
     * Creates an Expiry object from a delta in milliseconds.
     * The expiry is calculated as: current_time + delta + clock_drift
     * The resulting expiry is then rounded:
     * - If rounding down to the nearest minute still provides at least 60 seconds in the future, use minute precision
     * - Otherwise, use second precision
     * @param deltaInMs The milliseconds to add to the current time.
     * @param clockDriftInMs The milliseconds to add to the current time, typically the clock drift between IC network clock and the client's clock. Defaults to `0` if not provided.
     * @returns {Expiry} The constructed Expiry object.
     */
    static fromDeltaInMilliseconds(deltaInMs: number, clockDriftInMs?: number): Expiry;
    toBigInt(): bigint;
    toHash(): Uint8Array;
    toString(): string;
    /**
     * Serializes to JSON
     * @returns {JsonnableExpiry} a JSON object with a single key, {@link JSON_KEY_EXPIRY}, whose value is the expiry as a string
     */
    toJSON(): JsonnableExpiry;
    /**
     * Deserializes a {@link JsonnableExpiry} object from a JSON string.
     * @param input The JSON string to deserialize.
     * @returns {Expiry} The deserialized Expiry object.
     */
    static fromJSON(input: string): Expiry;
    static isExpiry(other: unknown): other is Expiry;
}
/**
 * Create a Nonce transform, which takes a function that returns a Buffer, and adds it
 * as the nonce to every call requests.
 * @param nonceFn A function that returns a buffer. By default uses a semi-random method.
 */
export declare function makeNonceTransform(nonceFn?: () => Nonce): HttpAgentRequestTransformFn;
/**
 * Create a transform that adds a delay (by default 5 minutes) to the expiry.
 * @param delayInMilliseconds The delay to add to the call time, in milliseconds.
 */
export declare function makeExpiryTransform(delayInMilliseconds: number): HttpAgentRequestTransformFn;
/**
 * Maps the default fetch headers field to the serializable HttpHeaderField.
 * @param headers Fetch definition of the headers type
 * @returns array of header fields
 */
export declare function httpHeadersTransform(headers: Headers): HttpHeaderField[];
//# sourceMappingURL=transforms.d.ts.map