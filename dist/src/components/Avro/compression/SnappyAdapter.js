"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SnappyAdapter {
    compress(buffer) {
        return SnappyAdapter.snappy.compressSync(buffer);
    }
    decompress(buffer) {
        return SnappyAdapter.snappy.uncompressSync(buffer);
    }
}
SnappyAdapter.snappy = require("snappy");
exports.SnappyAdapter = SnappyAdapter;
//# sourceMappingURL=SnappyAdapter.js.map