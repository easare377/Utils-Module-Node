"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEmojis = void 0;
// import { toShort } from 'emojione';
const EMOJI_SHORTCODES = /:[a-zA-Z1-9_]+:/g;
function findEmojis(str) {
    // add runtime check for use in JavaScript
    if (typeof str !== 'string') {
        return [];
    }
    return [];
}
exports.findEmojis = findEmojis;
