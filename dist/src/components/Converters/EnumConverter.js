"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SpecialCharacterHelper_1 = require("../../helpers/SpecialCharacterHelper");
const ExportModel_1 = require("../../models/ExportModel");
const BaseConverter_1 = require("./base/BaseConverter");
class EnumConverter extends BaseConverter_1.BaseConverter {
    constructor() {
        super(...arguments);
        this.rows = [];
    }
    convert(data) {
        data = this.getData(data);
        this.rows.push(...this.extractEnum(data));
        const exportModel = new ExportModel_1.ExportModel();
        exportModel.name = data.name;
        exportModel.content = this.rows.join(SpecialCharacterHelper_1.SpecialCharacterHelper.NEW_LINE);
        this.exports.push(exportModel);
        return exportModel;
    }
    extractEnum(data) {
        const rows = [];
        rows.push(`export enum ${data.name} {`);
        for (const symbol of data.symbols) {
            rows.push(`${SpecialCharacterHelper_1.SpecialCharacterHelper.TAB}${symbol},`);
        }
        rows.push(`}`);
        return rows;
    }
}
exports.EnumConverter = EnumConverter;
//# sourceMappingURL=EnumConverter.js.map