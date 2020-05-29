"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KafkaAvroMessage {
    constructor(schemaId, avroBuffer) {
        this._magicByte = KafkaAvroMessage.MAGIC_BYTE;
        this._schemaId = schemaId;
        this._avroBuffer = avroBuffer;
    }
    static fromBuffer(buffer) {
        const schemaId = buffer.readInt32BE(1);
        const avroBuffer = buffer.slice(5);
        return new KafkaAvroMessage(schemaId, avroBuffer);
    }
    get magicByte() {
        return this._magicByte;
    }
    get schemaId() {
        return this._schemaId;
    }
    get avroBuffer() {
        return this._avroBuffer;
    }
    toBuffer() {
        const preBuffer = new Buffer(5);
        preBuffer[0] = this.magicByte;
        preBuffer.writeInt32BE(this.schemaId, 1);
        return Buffer.concat([
            preBuffer,
            this.avroBuffer,
        ]);
    }
}
KafkaAvroMessage.MAGIC_BYTE = 0;
exports.KafkaAvroMessage = KafkaAvroMessage;
//# sourceMappingURL=KafkaAvroMessage.js.map