"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zlib = require("zlib");
class ZlibAdapter {
    constructor(options) {
        this._defaultOptions = {
            level: 5,
        };
        this._options = (options) ? options : this._defaultOptions;
    }
    compress(buffer) {
        return zlib.gzipSync(buffer, this._options);
    }
    decompress(buffer) {
        return zlib.unzipSync(buffer, this._options);
    }
}
exports.ZlibAdapter = ZlibAdapter;
//# sourceMappingURL=ZlibAdapter.js.map