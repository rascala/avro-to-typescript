"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const DirHelper_1 = require("../../helpers/DirHelper");
const TypeHelper_1 = require("../../helpers/TypeHelper");
const ClassConverter_1 = require("../Converters/ClassConverter");
const BaseCompiler_1 = require("./base/BaseCompiler");
class Compiler extends BaseCompiler_1.BaseCompiler {
    constructor(outputDir, logicalTypes) {
        super();
        this.logicalTypes = logicalTypes;
        this.classPath = path.resolve(outputDir);
    }
    async compileFolder(schemaPath) {
        try {
            fs.readdir(schemaPath, async (err, files) => {
                for (const file of files) {
                    const fullPath = schemaPath + path.sep + file;
                    if (fs.statSync(fullPath).isDirectory()) {
                        await this.compileFolder(fullPath);
                        continue;
                    }
                    const data = fs.readFileSync(fullPath).toString();
                    await this.compile(data);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    async compile(data) {
        const classConverter = new ClassConverter_1.ClassConverter(this.logicalTypes);
        data = classConverter.getData(data);
        const namespace = data.namespace.replace(/\./g, path.sep);
        const outputDir = `${this.classPath}${path.sep}${namespace}`;
        if (TypeHelper_1.TypeHelper.isRecordType(data)) {
            classConverter.convert(data);
        }
        const result = classConverter.joinExports();
        DirHelper_1.DirHelper.mkdirIfNotExist(outputDir);
        this.saveBaseAvroRecord();
        this.saveEnums(classConverter.enumExports, outputDir);
        this.saveClass(outputDir, data, result);
        console.log(`Wrote ${data.name}.ts in ${outputDir}`);
        return {
            class: data.name,
            dir: outputDir,
        };
    }
    saveClass(outputDir, data, result) {
        const classFile = `${outputDir}${path.sep}${data.name}.ts`;
        fs.writeFileSync(classFile, result);
    }
    saveEnums(enums, outputDir) {
        for (const enumFile of enums) {
            const savePath = `${outputDir}${path.sep}${enumFile.name}Enum.ts`;
            fs.writeFileSync(savePath, enumFile.content);
        }
    }
    saveBaseAvroRecord() {
        const avroRecordPath = `${this.classPath}${path.sep}BaseAvroRecord.ts`;
        if (!fs.existsSync(avroRecordPath)) {
            fs.writeFileSync(avroRecordPath, "export { BaseAvroRecord } from \"@degordian/avro-to-typescript\";\n");
        }
    }
}
exports.Compiler = Compiler;
//# sourceMappingURL=Compiler.js.map