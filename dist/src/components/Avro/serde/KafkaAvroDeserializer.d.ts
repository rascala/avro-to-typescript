/// <reference types="node" />
import { BaseAvroRecord } from "../BaseAvroRecord";
import { BaseKafkaAvroSerde } from "./BaseKafkaAvroSerde";
export declare class KafkaAvroDeserializer extends BaseKafkaAvroSerde {
    private knownSchemas;
    deserialize<T extends BaseAvroRecord>(buffer: Buffer, deserType: {
        new (): T;
    }): Promise<T>;
}
