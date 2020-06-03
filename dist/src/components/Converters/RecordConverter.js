"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SpecialCharacterHelper_1 = require("../../helpers/SpecialCharacterHelper");
const TypeHelper_1 = require("../../helpers/TypeHelper");
const ExportModel_1 = require("../../models/ExportModel");
const BaseConverter_1 = require("./base/BaseConverter");
const EnumConverter_1 = require("./EnumConverter");
const PrimitiveConverter_1 = require("./PrimitiveConverter");
class RecordConverter extends BaseConverter_1.BaseConverter {
    constructor() {
        super(...arguments);
        this.interfaceRows = [];
    }
    getTransformedName(data) {
        let fullName = data.name;
        if (data.namespace) {
            fullName = `${data.namespace}.${fullName}`;
        }
        if (typeof this.transformName === "function") {
            fullName = this.transformName(fullName);
        }
        return fullName;
    }
    convert(data) {
        data = this.getData(data);
        this.interfaceRows.push(...this.extractInterface(data));
        const exportModel = new ExportModel_1.ExportModel();
        exportModel.name = this.getTransformedName(data);
        exportModel.content = this.interfaceRows.join(SpecialCharacterHelper_1.SpecialCharacterHelper.NEW_LINE);
        this.exports.push(exportModel);
        return exportModel;
    }
    extractInterface(data) {
        const rows = [];
        const fullName = this.getTransformedName(data);
        rows.push(`export interface ${fullName} {`);
        for (const field of data.fields) {
            const fieldType = `${this.getField(field)};`;
            rows.push(`${SpecialCharacterHelper_1.SpecialCharacterHelper.TAB}${fieldType}`);
        }
        rows.push(`}`);
        return rows;
    }
    convertType(type) {
        const primitiveConverter = new PrimitiveConverter_1.PrimitiveConverter();
        if (typeof type === "string") {
            return primitiveConverter.convert(type);
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
        return "any";
    }
    getField(field) {
        const type = this.convertType(field.type);
        let transformedType = type;
        if (typeof this.transformName === "function") {
            transformedType = this.transformName(transformedType);
        }
        return `${field.name}${TypeHelper_1.TypeHelper.isOptional(field.type) ? "?" : ""}: ${transformedType}`;
    }
}
exports.RecordConverter = RecordConverter;
//# sourceMappingURL=RecordConverter.js.map