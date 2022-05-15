"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = exports.PlatForm = void 0;
// import { plainToClass } from 'class-transformer';
const guid_typescript_1 = require("guid-typescript");
const util = __importStar(require("util"));
const crypto = __importStar(require("crypto"));
var PlatForm;
(function (PlatForm) {
    PlatForm[PlatForm["Windows"] = 0] = "Windows";
    PlatForm[PlatForm["Linux"] = 1] = "Linux";
    PlatForm[PlatForm["MacOs"] = 2] = "MacOs";
    PlatForm[PlatForm["OpenBSD"] = 3] = "OpenBSD";
    PlatForm[PlatForm["FreeBSD"] = 4] = "FreeBSD";
    PlatForm[PlatForm["NetBSD"] = 5] = "NetBSD";
    PlatForm[PlatForm["Android"] = 6] = "Android";
    PlatForm[PlatForm["Cygwin"] = 7] = "Cygwin";
    PlatForm[PlatForm["Sunos"] = 8] = "Sunos";
    PlatForm[PlatForm["Aix"] = 9] = "Aix";
})(PlatForm = exports.PlatForm || (exports.PlatForm = {}));
class Utils {
    static jsonToClass(json, prototype) {
        const jsonObject = JSON.parse(json);
        jsonObject.__proto__ = prototype;
        return jsonObject;
    }
    static toClass(object, prototype) {
        object.__proto__ = prototype;
        // let g = Object.prototype.toString.call(a).indexOf("Array");
        return object;
    }
    static moduleAvailable(name) {
        try {
            require.resolve(name);
            return true;
        }
        catch (e) {
        }
        return false;
    }
    static serializeToJson(value) {
        return JSON.stringify(value);
    }
    /**
     * Converts Json string to the specified type.
     */
    // public static deserializeObject(type: any, json: string): any {
    //   const jsonObject = JSON.parse(json);
    //   return plainToClass(type, jsonObject);
    // }
    static int32ToBytes(value, littleEndian) {
        const arr = new ArrayBuffer(4); // an Int32 takes 4 bytes
        const view = new DataView(arr);
        view.setUint32(0, value, littleEndian); // byteOffset = 0; litteEndian = false
        return arr;
    }
    static currentPlatform() {
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
    static getFileOrFolderName(path) {
        return path.replace(/^.*[\\\/]/, '');
    }
    static getParentFolder(path) {
        const itemName = this.getFileOrFolderName(path);
        return path.substring(0, path.length - itemName.length - 1);
    }
    static copyArray(sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
        if (sourceIndex > sourceArray.length) {
            throw new RangeError('sourceIndex cannot be greater than the array size!');
        }
        if (destinationIndex > destinationArray.length) {
            throw new RangeError('destinationIndex cannot be greater than the array size!');
        }
        if (length - sourceIndex > destinationArray.length) {
            throw new RangeError('The size of the destination array is less than the source items to be copied!');
        }
        for (let i = sourceIndex; i < length; i++) {
            destinationArray[destinationIndex] = sourceArray[i];
            destinationIndex++;
        }
    }
    static waitAsync(intervalMillis) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // clearInterval(intervalFunc);
                    resolve();
                }, intervalMillis);
            });
        });
    }
    static getWriteData(bodyBuffer) {
        if (bodyBuffer.length === 1 && bodyBuffer[0] === 0) {
            return bodyBuffer;
        }
        const headerBuffer = Buffer.alloc(1);
        let contentLengthBuffer;
        const messageSize = bodyBuffer.length;
        if (messageSize <= 255) {
            headerBuffer.writeUInt8(1, 0);
            contentLengthBuffer = Buffer.alloc(1);
            contentLengthBuffer.writeUInt8(messageSize, 0);
        }
        else if (messageSize <= 65535) {
            headerBuffer.writeUInt8(2, 0);
            contentLengthBuffer = Buffer.alloc(2);
            contentLengthBuffer.writeUInt16BE(messageSize, 0);
        }
        else {
            headerBuffer.writeUInt8(4, 0);
            contentLengthBuffer = Buffer.alloc(4);
            contentLengthBuffer.writeUInt32BE(messageSize, 0);
        }
        const responseBuffer = Buffer.alloc(headerBuffer.length + contentLengthBuffer.length + bodyBuffer.length);
        headerBuffer.copy(responseBuffer, 0);
        contentLengthBuffer.copy(responseBuffer, 1);
        bodyBuffer.copy(responseBuffer, contentLengthBuffer.length + 1);
        return responseBuffer;
    }
    static isAsyncFunc(func) {
        // return func.constructor.name === "AsyncFunction";
        return util.types.isAsyncFunction(func);
    }
    static generateGuid() {
        return guid_typescript_1.Guid.create().toString();
    }
    static sha256hash(value) {
        return crypto.createHash('sha256').update(value).digest('hex');
    }
}
exports.Utils = Utils;
