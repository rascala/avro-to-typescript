"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SpecialCharacterHelper_1 = require("../../helpers/SpecialCharacterHelper");
const TypeHelper_1 = require("../../helpers/TypeHelper");
const ExportModel_1 = require("../../models/ExportModel");
const BaseConverter_1 = require("./base/BaseConverter");
const EnumConverter_1 = require("./EnumConverter");
const LogicalTypeConverter_1 = require("./LogicalTypeConverter");
const PrimitiveConverter_1 = require("./PrimitiveConverter");
class RecordConverter extends BaseConverter_1.BaseConverter {
    constructor() {
        super(...arguments);
        this.interfaceRows = [];
    }
    convert(data) {
        data = this.getData(data);
        this.interfaceRows.push(...this.extractInterface(data));
        const exportModel = new ExportModel_1.ExportModel();
        exportModel.name = data.name;
        exportModel.content = this.interfaceRows.join(SpecialCharacterHelper_1.SpecialCharacterHelper.NEW_LINE);
        this.exports.push(exportModel);
        return exportModel;
    }
    extractInterface(data) {
        const rows = [];
        rows.push(`export interface ${data.name} {`);
        for (const field of data.fields) {
            const fieldType = `${this.getField(field)};`;
            rows.push(`${SpecialCharacterHelper_1.SpecialCharacterHelper.TAB}${fieldType}`);
        }
        rows.push(`}`);
        return rows;
    }
    convertType(type) {
        if (typeof type === "string") {
            const converter = new PrimitiveConverter_1.PrimitiveConverter();
            return converter.convert(type);
        }
        if (TypeHelper_1.TypeHelper.isLogicalType(type)) {
            const converter = new LogicalTypeConverter_1.LogicalTypeConverter(this.logicalTypesMap);
            return converter.convert(type);
        }
        if (TypeHelper_1.TypeHelper.isEnumType(type)) {
            const converter = new EnumConverter_1.EnumConverter();
            const exportModel = converter.convert(type);
            this.enumExports.push(exportModel);
            return exportModel.name;
        }
        if (type instanceof Array) {
            return type.map((t) => this.convertType(t)).join(" | ");
        }
        if (TypeHelper_1.TypeHelper.isRecordType(type)) {
            this.interfaceRows.push(...this.extractInterface(type));
            this.interfaceRows.push("");
            return type.name;
        }
        if (TypeHelper_1.TypeHelper.isArrayType(type)) {
            return `${this.convertType(type.items)}[]`;
        }
        if (TypeHelper_1.TypeHelper.isMapType(type)) {
            return `{ [index: string]: ${this.convertType(type.values)} }`;
        }
        this.addError(BaseConverter_1.BaseConverter.errorMessages.TYPE_NOT_FOUND);
        return "any";
    }
    getField(field) {
        return `${field.name}${TypeHelper_1.TypeHelper.isOptional(field.type) ? "?" : ""}: ${this.convertType(field.type)}`;
    }
}
exports.RecordConverter = RecordConverter;
//# sourceMappingURL=RecordConverter.js.map