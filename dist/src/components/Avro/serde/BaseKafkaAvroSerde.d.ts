/// <reference types="node" />
import { RegistryClientConfig } from "schema-registry";
import { DataCompression } from "../compression/DataCompression";
import { KafkaAvroMessage } from "../KafkaAvroMessage";
import { SchemaRegistry } from "../schema_registry/SchemaRegistry";
export declare class BaseKafkaAvroSerde {
    schemaRegistryClient: SchemaRegistry;
    private _dataCompression;
    constructor(registryClientConfig: RegistryClientConfig);
    dataCompression: DataCompression<Buffer, Buffer>;
    disableCompression(): void;
    toKafkaAvroMessage(buffer: Buffer): KafkaAvroMessage;
    toBuffer(kafkaAvroMessage: KafkaAvroMessage): Buffer;
}
