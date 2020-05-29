import { RecordType } from "../../interfaces/AvroSchema";
import { ExportModel } from "../../models/ExportModel";
import { RecordConverter } from "./RecordConverter";
export declare class ClassConverter extends RecordConverter {
    protected interfaceRows: string[];
    protected interfaceSuffix: string;
    protected TAB: string;
    protected classRows: string[];
    protected importRows: string[];
    convert(data: any): any;
    protected getExportModels(data: RecordType): ExportModel;
    protected extractImports(data: RecordType): string[];
    protected extractClass(data: RecordType): string[];
}
