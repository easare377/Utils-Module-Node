// import { plainToClass } from 'class-transformer';
import { Guid } from 'guid-typescript';
import * as util from 'util';
import * as crypto from "crypto";
import { PlatForm } from './models/enums/platform';

// export enum PlatForm {
//   Windows,
//   Linux,
//   MacOs,
//   OpenBSD,
//   FreeBSD,
//   NetBSD,
//   Android,
//   Cygwin,
//   Sunos,
//   Aix,
// }

export default abstract class Utils {
  public static jsonToClass(json: string, prototype: any): any {
    const jsonObject = JSON.parse(json);
    jsonObject.__proto__ = prototype;
    return jsonObject;
  }

  public static toClass(object: any, prototype: any): any {
    object.__proto__ = prototype;
    // let g = Object.prototype.toString.call(a).indexOf("Array");
    return object;
  }

  public static moduleAvailable(name: string): boolean {
    try {
      require.resolve(name);
      return true;
    } catch (e) {
    }
    return false;
  }

  public static serializeToJson(value: any): string {
    return JSON.stringify(value);
  }

  /**
   * Converts Json string to the specified type.
   */
  // public static deserializeObject(type: any, json: string): any {
  //   const jsonObject = JSON.parse(json);
  //   return plainToClass(type, jsonObject);
  // }

  public static int32ToBytes(
    value: number,
    littleEndian: boolean
  ): ArrayBuffer {
    const arr = new ArrayBuffer(4); // an Int32 takes 4 bytes
    const view = new DataView(arr);
    view.setUint32(0, value, littleEndian); // byteOffset = 0; litteEndian = false
    return arr;
  }

  public static currentPlatform(): PlatForm | undefined {
    switch (process.platform) {
      case 'aix':
        return PlatForm.Aix;
      case 'android':
        return PlatForm.Android;
      case 'darwin':
        return PlatForm.MacOs;
      case 'freebsd':
        return PlatForm.FreeBSD;
      case 'linux':
        return PlatForm.Linux;
      case 'openbsd':
        return PlatForm.OpenBSD;
      case 'sunos':
        return PlatForm.Sunos;
      case 'win32':
        return PlatForm.Windows;
      case 'cygwin':
        return PlatForm.Cygwin;
      case 'netbsd':
        return PlatForm.NetBSD;
      default:
        return undefined;
    }
  }

  public static getFileOrFolderName(path: string): string {
    return path.replace(/^.*[\\\/]/, '');
  }

  public static getParentFolder(path: string): string {
    const itemName = this.getFileOrFolderName(path);
    return path.substring(0, path.length - itemName.length - 1);
  }

  public static copyArray<T>(
    sourceArray: T[],
    sourceIndex: number,
    destinationArray: T[],
    destinationIndex: number,
    length: number
  ): void {
    if (sourceIndex > sourceArray.length) {
      throw new RangeError(
        'sourceIndex cannot be greater than the array size!'
      );
    }
    if (destinationIndex > destinationArray.length) {
      throw new RangeError(
        'destinationIndex cannot be greater than the array size!'
      );
    }
    if (length - sourceIndex > destinationArray.length) {
      throw new RangeError(
        'The size of the destination array is less than the source items to be copied!'
      );
    }
    for (let i = sourceIndex; i < length; i++) {
      destinationArray[destinationIndex] = sourceArray[i];
      destinationIndex++;
    }
  }

  public static async waitAsync(intervalMillis: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // clearInterval(intervalFunc);
        resolve();
      }, intervalMillis);
    });
  }

  public static getWriteData(bodyBuffer: Buffer): Buffer {
    if (bodyBuffer.length === 1 && bodyBuffer[0] === 0) {
      return bodyBuffer;
    }
    const headerBuffer = Buffer.alloc(1);
    let contentLengthBuffer: Buffer;
    const messageSize = bodyBuffer.length;
    if (messageSize <= 255) {
      headerBuffer.writeUInt8(1, 0);
      contentLengthBuffer = Buffer.alloc(1);
      contentLengthBuffer.writeUInt8(messageSize, 0);
    } else if (messageSize <= 65535) {
      headerBuffer.writeUInt8(2, 0);
      contentLengthBuffer = Buffer.alloc(2);
      contentLengthBuffer.writeUInt16BE(messageSize, 0);
    } else {
      headerBuffer.writeUInt8(4, 0);
      contentLengthBuffer = Buffer.alloc(4);
      contentLengthBuffer.writeUInt32BE(messageSize, 0);
    }
    const responseBuffer = Buffer.alloc(
      headerBuffer.length + contentLengthBuffer.length + bodyBuffer.length
    );
    headerBuffer.copy(responseBuffer, 0);
    contentLengthBuffer.copy(responseBuffer, 1);
    bodyBuffer.copy(responseBuffer, contentLengthBuffer.length + 1);
    return responseBuffer;
  }

  public static isAsyncFunc(func: Function): boolean {
    // return func.constructor.name === "AsyncFunction";
    return util.types.isAsyncFunction(func)
  }

  public static generateGuid(): string {
    return Guid.create().toString();
  }

  public static sha256hash(value: string) {
    return crypto.createHash('sha256').update(value).digest('hex');
  }
}
