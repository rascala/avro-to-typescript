"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SpecialCharacterHelper_1 = require("../../helpers/SpecialCharacterHelper");
const TypeHelper_1 = require("../../helpers/TypeHelper");
const ExportModel_1 = require("../../models/ExportModel");
const RecordConverter_1 = require("./RecordConverter");
class ClassConverter extends RecordConverter_1.RecordConverter {
    constructor() {
        super(...arguments);
        this.interfaceRows = [];
        this.interfaceSuffix = "Interface";
        this.TAB = SpecialCharacterHelper_1.SpecialCharacterHelper.TAB;
        this.classRows = [];
        this.importRows = [];
    }
    convert(data) {
        data = this.getData(data);
        this.classRows.push(...this.extractClass(data));
        this.importRows.push(...this.extractImports(data));
        this.getExportModels(data);
        return;
    }
    getExportModels(data) {
        const importExportModel = new ExportModel_1.ExportModel();
        const classExportModel = new ExportModel_1.ExportModel();
        const interfaceExportModel = new ExportModel_1.ExportModel();
        importExportModel.name = "imports";
        importExportModel.content = this.importRows.join(SpecialCharacterHelper_1.SpecialCharacterHelper.NEW_LINE);
        classExportModel.name = data.name;
        classExportModel.content = this.classRows.join(SpecialCharacterHelper_1.SpecialCharacterHelper.NEW_LINE);
        interfaceExportModel.name = data.name + this.interfaceSuffix;
        interfaceExportModel.content = this.interfaceRows.join(SpecialCharacterHelper_1.SpecialCharacterHelper.NEW_LINE);
        this.exports = [
            importExportModel,
            interfaceExportModel,
            classExportModel,
        ];
        return classExportModel;
    }
    extractImports(data) {
        const rows = [];
        const dirsUp = data.namespace.split(".").length;
        rows.push(`// tslint:disable`);
        rows.push(`import { BaseAvroRecord } from "` + "../".repeat(dirsUp) + `BaseAvroRecord";`);
        for (const enumFile of this.enumExports) {
            const importLine = `import { ${enumFile.name} } from "./${enumFile.name}Enum";`;
            rows.push(importLine);
        }
        return rows;
    }
    extractClass(data) {
        const rows = [];
        const interfaceRows = [];
        const TAB = SpecialCharacterHelper_1.SpecialCharacterHelper.TAB;
        interfaceRows.push(`export interface ${data.name}${this.interfaceSuffix} {`);
        rows.push(`export class ${data.name} extends BaseAvroRecord implements ${data.name}${this.interfaceSuffix} {`);
        rows.push(``);
        rows.push(`${TAB}public static readonly subject: string = "${data.name}";`);
        rows.push(`${TAB}public static readonly schema: object = ${JSON.stringify(data, null, 4)}`);
        rows.push(``);
        rows.push(`${TAB}public static deserialize(buffer: Buffer, newSchema?: object): ${data.name} {`);
        rows.push(`${TAB}${TAB}const result = new ${data.name}();`);
        rows.push(`${TAB}${TAB}const rawResult = this.internalDeserialize(buffer, newSchema);`);
        rows.push(`${TAB}${TAB}result.loadValuesFromType(rawResult);`);
        rows.push(``);
        rows.push(`${TAB}${TAB}return result;`);
        rows.push(`${TAB}}`);
        rows.push(``);
        for (const field of data.fields) {
            let fieldType;
            let classRow;
            if (TypeHelper_1.TypeHelper.hasDefault(field) || TypeHelper_1.TypeHelper.isOptional(field.type)) {
                const defaultValue = TypeHelper_1.TypeHelper.hasDefault(field) ? ` = ${TypeHelper_1.TypeHelper.getDefault(field)}` : "";
                fieldType = `${this.getField(field)}`;
                classRow = `${TAB}public ${fieldType}${defaultValue};`;
            }
            else {
                const convertedType = this.convertType(field.type);
                fieldType = `${field.name}: ${convertedType}`;
                classRow = `${TAB}public ${field.name}!: ${convertedType};`;
            }
            interfaceRows.push(`${this.TAB}${fieldType};`);
            rows.push(classRow);
        }
        interfaceRows.push("}");
        rows.push(``);
        rows.push(`${TAB}public schema(): object {`);
        rows.push(`${TAB}${TAB}return ${data.name}.schema;`);
        rows.push(`${TAB}}`);
        rows.push(``);
        rows.push(`${TAB}public subject(): string {`);
        rows.push(`${TAB}${TAB}return ${data.name}.subject;`);
        rows.push(`${TAB}}`);
        rows.push(`}`);
        this.interfaceRows.push(...interfaceRows);
        return rows;
    }
}
exports.ClassConverter = ClassConverter;
//# sourceMappingURL=ClassConverter.js.map