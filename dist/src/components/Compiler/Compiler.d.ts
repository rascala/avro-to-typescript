import { CompilerOutput } from "../../interfaces/CompilerOutput";
import { ExportModel } from "../../models/ExportModel";
import { BaseCompiler } from "./base/BaseCompiler";
export declare class Compiler extends BaseCompiler {
    logicalTypes?: {
        [key: string]: string;
    } | undefined;
    exports: ExportModel[];
    constructor(outputDir: string, logicalTypes?: {
        [key: string]: string;
    } | undefined);
    compileFolder(schemaPath: string): Promise<void>;
    compile(data: any): Promise<CompilerOutput>;
    protected saveClass(outputDir: string, data: any, result: string): void;
    protected saveEnums(enums: ExportModel[], outputDir: string): void;
    protected saveBaseAvroRecord(): void;
}
