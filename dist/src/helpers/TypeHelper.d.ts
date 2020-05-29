import { ArrayType, EnumType, Field, LogicalType, MapType, NamedType, RecordType, Type } from "../interfaces/AvroSchema";
export declare class TypeHelper {
    static isRecordType(schema: Type): schema is RecordType;
    static isArrayType(schema: Type): schema is ArrayType;
    static isMapType(schema: Type): schema is MapType;
    static isEnumType(schema: Type): schema is EnumType;
    static isUnion(schema: Type): schema is NamedType[];
    static isLogicalType(schema: Type): schema is LogicalType;
    static isOptional(schema: Type): boolean;
    static hasDefault(field: Field): boolean;
    static getDefault(field: Field): string | number | boolean | any[] | null;
}
