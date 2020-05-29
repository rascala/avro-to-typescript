import { AvroSchema } from "../../../interfaces/AvroSchema";
import { ExportModel } from "../../../models/ExportModel";
export declare abstract class BaseConverter {
    logicalTypesMap: {
        [key: string]: string;
    };
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
    constructor(logicalTypesMap?: {
        [key: string]: string;
    });
    abstract convert(data: any): any;
    joinExports(): string;
    getData(data: any): AvroSchema;
}
