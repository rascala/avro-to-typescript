/// <reference types="node" />
import { ZlibOptions } from "zlib";
import { DataCompression } from "./DataCompression";
export declare class ZlibAdapter implements DataCompression<Buffer, Buffer> {
    private _options?;
    private _defaultOptions;
    constructor(options?: ZlibOptions);
    compress(buffer: Buffer): Buffer;
    decompress(buffer: Buffer): Buffer;
}
