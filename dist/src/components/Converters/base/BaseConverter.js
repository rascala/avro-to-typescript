"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const SpecialCharacterHelper_1 = require("../../../helpers/SpecialCharacterHelper");
class BaseConverter {
    constructor(config) {
        this.exports = [];
        this.enumExports = [];
        this.interfaceExports = [];
        this.logicalTypes = {
            className: undefined,
            importFrom: undefined,
        };
        if (config) {
            this.transformName = config.transformName;
            if (config.logicalTypes) {
                this.logicalTypes = config.logicalTypes;
            }
        }
    }
    joinExports() {
        let result = this.exports
            .reduce((joinedExport, nextExport) => {
            const exports = [];
            if (joinedExport.length > 0) {
                exports.push(joinedExport);
            }
            exports.push(nextExport.content);
            return exports.join(`${SpecialCharacterHelper_1.SpecialCharacterHelper.NEW_LINE}${SpecialCharacterHelper_1.SpecialCharacterHelper.NEW_LINE}`);
        }, "");
        result += `${SpecialCharacterHelper_1.SpecialCharacterHelper.NEW_LINE}`;
        return result;
    }
    getData(data) {
        if (typeof data === "string") {
            try {
                return JSON.parse(data);
            }
            catch (_a) {
                return JSON.parse(fs.readFileSync(data).toString());
            }
        }
        return data;
    }
}
BaseConverter.errorMessages = {
    TYPE_NOT_FOUND: "Type not found!",
};
exports.BaseConverter = BaseConverter;
//# sourceMappingURL=BaseConverter.js.map