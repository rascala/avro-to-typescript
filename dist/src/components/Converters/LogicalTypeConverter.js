"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseConverter_1 = require("./base/BaseConverter");
const PrimitiveConverter_1 = require("./PrimitiveConverter");
class LogicalTypeConverter extends BaseConverter_1.BaseConverter {
    convert(data) {
        data = this.getData(data);
        const primitiveConverter = new PrimitiveConverter_1.PrimitiveConverter();
        return this.logicalTypesMap[data.logicalType] || primitiveConverter.convert(data.type);
    }
}
exports.LogicalTypeConverter = LogicalTypeConverter;
//# sourceMappingURL=LogicalTypeConverter.js.map