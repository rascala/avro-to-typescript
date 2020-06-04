/// <reference types="node" />
export declare class FileHelper {
    filePath: string;
    constructor(filePath: string);
    getContent(): Promise<string | Buffer>;
    save(content: string): Promise<boolean>;
    exists(): boolean;
    create(): Promise<void>;
}
