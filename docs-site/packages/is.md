---
layout: doc
---

# @genlib/toolkit-is

JavaScript 类型检测库（ESM 优先、可树摇）。参考并重写了 [is 库](https://github.com/enricomarino/is)，使用 TypeScript 实现，提供完整的类型支持。

## 安装

```bash
pnpm add @genlib/toolkit-is
```

## API

### 通用类型检测

#### `isDefined(value)`

检查值是否已定义（不为 undefined）。

**示例：**
```typescript
import { isDefined } from '@genlib/toolkit-is';

isDefined(0); // true
isDefined(''); // true
isDefined(null); // true
isDefined(undefined); // false
```

#### `isUndefined(value)`

检查值是否为 undefined。

**示例：**
```typescript
import { isUndefined } from '@genlib/toolkit-is';

isUndefined(undefined); // true
isUndefined(null); // false
```

#### `isNil(value)`

检查值是否为 null 或 undefined。

**示例：**
```typescript
import { isNil } from '@genlib/toolkit-is';

isNil(null); // true
isNil(undefined); // true
isNil(0); // false
```

#### `isNull(value)`

检查值是否为 null。

#### `isEmpty(value)`

检查值是否为空。支持：
- null 或 undefined
- 空字符串
- 空数组
- 空对象（没有可枚举属性）
- 空 arguments 对象

**示例：**
```typescript
import { isEmpty } from '@genlib/toolkit-is';

isEmpty(null); // true
isEmpty(''); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty('hello'); // false
```

#### `isEqual(value, other)`

深度比较两个值是否相等。支持基本类型、数组、对象、Date、RegExp。

**示例：**
```typescript
import { isEqual } from '@genlib/toolkit-is';

isEqual(1, 1); // true
isEqual([1, 2, 3], [1, 2, 3]); // true
isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
isEqual({ a: 1 }, { a: 2 }); // false
```

#### `isInstance(value, constructor)`

检查值是否为指定构造函数的实例。

**示例：**
```typescript
import { isInstance } from '@genlib/toolkit-is';

isInstance(new Date(), Date); // true
isInstance([], Array); // true
isInstance(/test/, RegExp); // true
```

#### `isType(value, type)`

检查值的类型是否匹配。支持的类型：'string' | 'number' | 'boolean' | 'function' | 'object' | 'undefined' | 'symbol' | 'bigint'。

### 数组检测

#### `isArray(value)`

检查值是否为数组。

#### `isArrayEmpty(value)`

检查数组是否为空。

#### `isArrayLike(value)`

检查值是否为类数组对象（具有 length 属性的对象）。

**示例：**
```typescript
import { isArrayLike } from '@genlib/toolkit-is';

isArrayLike('hello'); // true
isArrayLike({ length: 5 }); // true
isArrayLike([]); // true
```

### 布尔值检测

#### `isBoolean(value)` / `isTrue(value)` / `isFalse(value)`

检查值是否为布尔值、true 或 false。

### 日期检测

#### `isDate(value)`

检查值是否为有效的 Date 对象。

**示例：**
```typescript
import { isDate } from '@genlib/toolkit-is';

isDate(new Date()); // true
isDate(new Date('2023-01-01')); // true
isDate(new Date('invalid')); // false
```

### 函数检测

#### `isFunction(value)`

检查值是否为函数。

### 数字检测

#### `isNumber(value)`

检查值是否为数字（不包括 NaN）。

#### `isInteger(value)` / `isDecimal(value)`

检查值是否为整数或小数。

#### `isInfinite(value)` / `isNaNValue(value)`

检查值是否为无穷大或 NaN。

#### `isEven(value)` / `isOdd(value)`

检查数字是否为偶数或奇数。

#### `isDivisibleBy(value, n)`

检查数字是否能被 n 整除。

#### `isMaximum(value, others)` / `isMinimum(value, others)`

检查值是否为数组中的最大值或最小值。

#### `isGreaterThan(value, other)` / `isLessThan(value, other)` / `isGreaterThanOrEqual(value, other)` / `isLessThanOrEqual(value, other)`

数值比较函数。

#### `isWithin(value, start, finish)`

检查值是否在指定范围内 [start, finish]。

**示例：**
```typescript
import { isWithin } from '@genlib/toolkit-is';

isWithin(5, 1, 10); // true
isWithin(1, 1, 10); // true
isWithin(10, 1, 10); // true
isWithin(0, 1, 10); // false
```

### 对象检测

#### `isObject(value)`

检查值是否为对象（不包括 null 和数组）。

### 正则表达式检测

#### `isRegExp(value)`

检查值是否为 RegExp 对象。

### 字符串检测

#### `isString(value)`

检查值是否为字符串。

### 编码检测

#### `isBase64(value)`

检查字符串是否为有效的 Base64 编码。

#### `isHex(value)`

检查字符串是否为有效的十六进制编码。

**示例：**
```typescript
import { isBase64, isHex } from '@genlib/toolkit-is';

isBase64('SGVsbG8='); // true
isHex('123abc'); // true
isHex('ABCDEF'); // true
```

### Symbol 检测

#### `isSymbol(value)`

检查值是否为 Symbol。

### BigInt 检测

#### `isBigInt(value)`

检查值是否为 BigInt。

## 完整示例

```typescript
import {
  isString,
  isNumber,
  isArray,
  isObject,
  isEmpty,
  isEqual,
  isInteger,
  isEven,
  isDate,
  isError,
  isFunction,
} from '@genlib/toolkit-is';

// 类型检测
if (isString(value)) {
  console.log(value.toUpperCase());
}

// 空值检测
if (!isEmpty(data)) {
  processData(data);
}

// 数值检测
if (isInteger(num) && isEven(num)) {
  console.log('偶数');
}

// 深度比较
if (isEqual(obj1, obj2)) {
  console.log('对象相等');
}
```

## 特性

- ✅ 完整的 TypeScript 类型支持
- ✅ ESM 优先、CJS 兼容
- ✅ 可树摇，按需导入
- ✅ 覆盖所有常用的类型检测场景
- ✅ 完整的测试覆盖（75+ 个测试用例）
- ✅ 兼容浏览器和 Node.js 环境

