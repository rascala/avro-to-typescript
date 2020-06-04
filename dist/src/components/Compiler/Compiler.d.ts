import { CompilerOutput } from "../../interfaces/CompilerOutput";
import { ExportModel } from "../../models/ExportModel";
import { CompilerConfig, LogicalTypesConfig } from "../Compiler/base/BaseCompiler";
import { BaseCompiler } from "./base/BaseCompiler";
export declare class Compiler extends BaseCompiler {
    exports: ExportModel[];
    transformName?: (input: string) => string;
    logicalTypes: LogicalTypesConfig;
    constructor(outputDir: string, config?: CompilerConfig);
    compileFolder(schemaPath: string): Promise<void>;
    compile(data: any): Promise<CompilerOutput>;
    protected saveClass(outputDir: string, data: any, result: string): void;
    protected saveEnums(enums: ExportModel[], outputDir: string): void;
    protected saveBaseAvroRecord(): void;
}
