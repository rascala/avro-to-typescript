/// <reference types="node" />
import { BaseAvroRecord } from "../BaseAvroRecord";
import { BaseKafkaAvroSerde } from "./BaseKafkaAvroSerde";
export declare class KafkaAvroSerializer extends BaseKafkaAvroSerde {
    serialize(obj: BaseAvroRecord): Promise<Buffer>;
}
