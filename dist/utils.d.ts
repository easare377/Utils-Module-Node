/// <reference types="node" />
export declare enum PlatForm {
    Windows = 0,
    Linux = 1,
    MacOs = 2,
    OpenBSD = 3,
    FreeBSD = 4,
    NetBSD = 5,
    Android = 6,
    Cygwin = 7,
    Sunos = 8,
    Aix = 9
}
export declare abstract class Utils {
    static jsonToClass(json: string, prototype: any): any;
    static toClass(object: any, prototype: any): any;
    static moduleAvailable(name: string): boolean;
    static serializeToJson(value: any): string;
    /**
     * Converts Json string to the specified type.
     */
    static int32ToBytes(value: number, littleEndian: boolean): ArrayBuffer;
    static currentPlatform(): PlatForm | undefined;
    static getFileOrFolderName(path: string): string;
    static getParentFolder(path: string): string;
    static copyArray<T>(sourceArray: T[], sourceIndex: number, destinationArray: T[], destinationIndex: number, length: number): void;
    static waitAsync(intervalMillis: number): Promise<void>;
    static getWriteData(bodyBuffer: Buffer): Buffer;
    static isAsyncFunc(func: Function): boolean;
    static generateGuid(): string;
    static sha256hash(value: string): string;
}
