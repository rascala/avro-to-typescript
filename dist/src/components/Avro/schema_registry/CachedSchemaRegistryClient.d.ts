import { RegistryClientConfig, RegistryRequest } from "schema-registry";
import { RecordType } from "../../..";
import { SchemaRegistry } from "./SchemaRegistry";
export declare class CachedSchemaRegistryClient implements SchemaRegistry {
    private _defaultLogger;
    private client;
    constructor(config: RegistryClientConfig);
    getSchemaById(id: number): RegistryRequest;
    registerSubjectVersion(subject: string, schema: RecordType): RegistryRequest;
}
