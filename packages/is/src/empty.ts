import { isArguments } from './arguments';
import { isArray } from './array';
import { isNil } from './general';
import { isObject } from './object';
import { isString } from './string';

/**
 * 检查值是否为空
 * - null 或 undefined 返回 true
 * - 字符串长度为 0 返回 true
 * - 数组长度为 0 返回 true
 * - 对象没有可枚举属性返回 true
 * - 类数组对象长度为 0 返回 true
 */
export const isEmpty = (value: unknown): boolean => {
  if (isNil(value)) {
    return true;
  }
  if (isString(value) || isArray(value) || isArguments(value)) {
    return value.length === 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }
  return false;
};
