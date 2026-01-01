import { PipeArrayBuffer, lebDecode } from '@dfinity/candid';
const MILLISECOND_TO_NANOSECONDS = BigInt(1_000_000);
export const decodeLeb128 = (buf) => {
    return lebDecode(new PipeArrayBuffer(buf));
};
// time is a LEB128-encoded Nat
export const decodeTime = (buf) => {
    const timestampNs = decodeLeb128(buf);
    const timestampMs = timestampNs / MILLISECOND_TO_NANOSECONDS;
    return new Date(Number(timestampMs));
};
//# sourceMappingURL=leb.js.map