/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';

const findLastId = async <T extends { [key: string]: any }>(
  model: Model<T>,
  userId: string,
  idField: string,
): Promise<string | undefined> => {
  const lastRecord = await model
    .findOne({ userId }, { [idField]: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  if (lastRecord && typeof lastRecord[idField] === 'string') {
    return lastRecord[idField];
  }

  return undefined;
};

export const generateNewId = async (
  model: Model<any>,
  userId: string,
  idField: string,
  prefix: string,
) => {
  let currentId = '0000'; // Default to 0000 if no previous ID exists
  const lastId = await findLastId(model, userId, idField);

  if (lastId) {
    currentId = lastId.substring(prefix.length);
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  return `${prefix}${incrementId}`;
};
