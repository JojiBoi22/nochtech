"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expiry = exports.JSON_KEY_EXPIRY = void 0;
exports.makeNonceTransform = makeNonceTransform;
exports.makeExpiryTransform = makeExpiryTransform;
exports.httpHeadersTransform = httpHeadersTransform;
const candid_1 = require("@dfinity/candid");
const types_ts_1 = require("./types.js");
const errors_ts_1 = require("../../errors.js");
exports.JSON_KEY_EXPIRY = '__expiry__';
const SECONDS_TO_MILLISECONDS = BigInt(1_000);
const MILLISECONDS_TO_NANOSECONDS = BigInt(1_000_000);
const MINUTES_TO_SECONDS = BigInt(60);
const MINUTES_TO_MILLISECONDS = MINUTES_TO_SECONDS * SECONDS_TO_MILLISECONDS;
const EXPIRY_DELTA_THRESHOLD_MILLISECONDS = BigInt(1) * MINUTES_TO_MILLISECONDS;
function roundToSecond(millis) {
    return (millis / SECONDS_TO_MILLISECONDS) * SECONDS_TO_MILLISECONDS;
}
function roundToMinute(millis) {
    return (millis / MINUTES_TO_MILLISECONDS) * MINUTES_TO_MILLISECONDS;
}
class Expiry {
    constructor(__expiry__) {
        this.__expiry__ = __expiry__;
        this._isExpiry = true;
    }
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
    static fromDeltaInMilliseconds(deltaInMs, clockDriftInMs = 0) {
        const correctedNowMs = BigInt(Date.now()) + BigInt(clockDriftInMs);
        const expiryMs = correctedNowMs + BigInt(deltaInMs);
        const roundedToMinute = roundToMinute(expiryMs);
        let roundedExpiryMs;
        if (roundedToMinute >= correctedNowMs + EXPIRY_DELTA_THRESHOLD_MILLISECONDS) {
            roundedExpiryMs = roundedToMinute;
        }
        else {
            const roundedToSecond = roundToSecond(expiryMs);
            roundedExpiryMs = roundedToSecond;
        }
        return new Expiry(roundedExpiryMs * MILLISECONDS_TO_NANOSECONDS);
    }
    toBigInt() {
        return this.__expiry__;
    }
    toHash() {
        return (0, candid_1.lebEncode)(this.__expiry__);
    }
    toString() {
        return this.__expiry__.toString();
    }
    /**
     * Serializes to JSON
     * @returns {JsonnableExpiry} a JSON object with a single key, {@link JSON_KEY_EXPIRY}, whose value is the expiry as a string
     */
    toJSON() {
        return { [exports.JSON_KEY_EXPIRY]: this.toString() };
    }
    /**
     * Deserializes a {@link JsonnableExpiry} object from a JSON string.
     * @param input The JSON string to deserialize.
     * @returns {Expiry} The deserialized Expiry object.
     */
    static fromJSON(input) {
        const obj = JSON.parse(input);
        if (obj[exports.JSON_KEY_EXPIRY]) {
            try {
                const expiry = BigInt(obj[exports.JSON_KEY_EXPIRY]);
                return new Expiry(expiry);
            }
            catch (error) {
                throw new errors_ts_1.InputError(new errors_ts_1.ExpiryJsonDeserializeErrorCode(`Not a valid BigInt: ${error}`));
            }
        }
        throw new errors_ts_1.InputError(new errors_ts_1.ExpiryJsonDeserializeErrorCode(`The input does not contain the key ${exports.JSON_KEY_EXPIRY}`));
    }
    static isExpiry(other) {
        return (other instanceof Expiry ||
            (typeof other === 'object' &&
                other !== null &&
                '_isExpiry' in other &&
                other['_isExpiry'] === true &&
                '__expiry__' in other &&
                typeof other['__expiry__'] === 'bigint'));
    }
}
exports.Expiry = Expiry;
/**
 * Create a Nonce transform, which takes a function that returns a Buffer, and adds it
 * as the nonce to every call requests.
 * @param nonceFn A function that returns a buffer. By default uses a semi-random method.
 */
function makeNonceTransform(nonceFn = types_ts_1.makeNonce) {
    return async (request) => {
        // Nonce needs to be inserted into the header for all requests, to enable logs to be correlated with requests.
        const headers = request.request.headers;
        // TODO: uncomment this when the http proxy supports it.
        // headers.set('X-IC-Request-ID', toHex(new Uint8Array(nonce)));
        request.request.headers = headers;
        // Nonce only needs to be inserted into the body for async calls, to prevent replay attacks.
        if (request.endpoint === types_ts_1.Endpoint.Call) {
            request.body.nonce = nonceFn();
        }
    };
}
/**
 * Create a transform that adds a delay (by default 5 minutes) to the expiry.
 * @param delayInMilliseconds The delay to add to the call time, in milliseconds.
 */
function makeExpiryTransform(delayInMilliseconds) {
    return async (request) => {
        request.body.ingress_expiry = Expiry.fromDeltaInMilliseconds(delayInMilliseconds);
    };
}
/**
 * Maps the default fetch headers field to the serializable HttpHeaderField.
 * @param headers Fetch definition of the headers type
 * @returns array of header fields
 */
function httpHeadersTransform(headers) {
    const headerFields = [];
    headers.forEach((value, key) => {
        headerFields.push([key, value]);
    });
    return headerFields;
}
//# sourceMappingURL=transforms.js.map