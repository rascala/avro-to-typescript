import { AvroSchema } from "../../../interfaces/AvroSchema";
import { ExportModel } from "../../../models/ExportModel";
import { CompilerConfig, LogicalTypesConfig } from "../../Compiler/base/BaseCompiler";
export declare abstract class BaseConverter {
    static errorMessages: {
        TYPE_NOT_FOUND: string;
    };
    errorType: string;
    addError: (errorMessage: string) => void;
    hasErrors: () => boolean;
    errors: string[];
    exports: ExportModel[];
    enumExports: ExportModel[];
    interfaceExports: ExportModel[];
    transformName?: (input: string) => string;
    logicalTypes: LogicalTypesConfig;
    constructor(config?: CompilerConfig);
    abstract convert(data: any): any;
    joinExports(): string;
    getData(data: any): AvroSchema;
}
