"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flattenObject = (obj, parentKey = '', result = {}) => {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof obj[key] === 'object' &&
                obj[key] !== null &&
                !Array.isArray(obj[key])) {
                flattenObject(obj[key], newKey, result);
            }
            else {
                result[newKey] = obj[key];
            }
        }
    }
    return result;
};
exports.default = flattenObject;