import { EnumType } from "../../interfaces/AvroSchema";
import { ExportModel } from "../../models/ExportModel";
import { BaseConverter } from "./base/BaseConverter";
export declare class EnumConverter extends BaseConverter {
    protected rows: string[];
    convert(data: any): ExportModel;
    protected extractEnum(data: EnumType): string[];
}
