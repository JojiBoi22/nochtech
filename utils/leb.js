"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeTime = exports.decodeLeb128 = void 0;
const candid_1 = require("@dfinity/candid");
const MILLISECOND_TO_NANOSECONDS = BigInt(1_000_000);
const decodeLeb128 = (buf) => {
    return (0, candid_1.lebDecode)(new candid_1.PipeArrayBuffer(buf));
};
exports.decodeLeb128 = decodeLeb128;
// time is a LEB128-encoded Nat
const decodeTime = (buf) => {
    const timestampNs = (0, exports.decodeLeb128)(buf);
    const timestampMs = timestampNs / MILLISECOND_TO_NANOSECONDS;
    return new Date(Number(timestampMs));
};
exports.decodeTime = decodeTime;
//# sourceMappingURL=leb.js.map