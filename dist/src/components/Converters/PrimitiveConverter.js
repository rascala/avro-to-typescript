"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseConverter_1 = require("./base/BaseConverter");
class PrimitiveConverter extends BaseConverter_1.BaseConverter {
    convert(type) {
        switch (type) {
            case "long":
            case "int":
            case "double":
            case "float":
                return "number";
            case "string":
                return "string";
            case "bytes":
                return "Buffer";
            case "null":
                return "null";
            case "boolean":
                return "boolean";
            default:
                return "any";
        }
    }
}
exports.PrimitiveConverter = PrimitiveConverter;
//# sourceMappingURL=PrimitiveConverter.js.map