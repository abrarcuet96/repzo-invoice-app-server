"use strict";
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
exports.generateNewId = void 0;
const findLastId = (model, userId, idField) => __awaiter(void 0, void 0, void 0, function* () {
    const lastRecord = yield model
        .findOne({ userId }, { [idField]: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    if (lastRecord && typeof lastRecord[idField] === 'string') {
        return lastRecord[idField];
    }
    return undefined;
});
const generateNewId = (model, userId, idField, prefix) => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = '0000'; // Default to 0000 if no previous ID exists
    const lastId = yield findLastId(model, userId, idField);
    if (lastId) {
        currentId = lastId.substring(prefix.length);
    }
    const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    return `${prefix}${incrementId}`;
});
exports.generateNewId = generateNewId;
