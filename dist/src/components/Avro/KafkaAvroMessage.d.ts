/// <reference types="node" />
export declare class KafkaAvroMessage {
    static MAGIC_BYTE: number;
    static fromBuffer(buffer: Buffer): KafkaAvroMessage;
    private readonly _magicByte;
    private readonly _schemaId;
    private readonly _avroBuffer;
    constructor(schemaId: number, avroBuffer: Buffer);
    readonly magicByte: number;
    readonly schemaId: number;
    readonly avroBuffer: Buffer;
    toBuffer(): Buffer;
}
