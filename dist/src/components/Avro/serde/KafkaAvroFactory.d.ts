import { RegistryClientConfig } from "schema-registry";
import { KafkaAvroDeserializer } from "./KafkaAvroDeserializer";
import { KafkaAvroSerializer } from "./KafkaAvroSerializer";
export declare class KafkaAvroFactory {
    avroRegistryConfiguration: RegistryClientConfig;
    constructor(avroRegistryConfiguration: RegistryClientConfig);
    createSerializer(): KafkaAvroSerializer;
    createDeserializer(): KafkaAvroDeserializer;
}
