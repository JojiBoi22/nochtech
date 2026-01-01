"use strict";
/**
 * @module api
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base32Decode = exports.base32Encode = exports.getCrc32 = void 0;
__exportStar(require("./principal.js"), exports);
var getCrc_ts_1 = require("./utils/getCrc.js");
Object.defineProperty(exports, "getCrc32", { enumerable: true, get: function () { return getCrc_ts_1.getCrc32; } });
var base32_ts_1 = require("./utils/base32.js");
Object.defineProperty(exports, "base32Encode", { enumerable: true, get: function () { return base32_ts_1.base32Encode; } });
Object.defineProperty(exports, "base32Decode", { enumerable: true, get: function () { return base32_ts_1.base32Decode; } });
//# sourceMappingURL=index.js.map