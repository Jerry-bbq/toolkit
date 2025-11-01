# @genlib/toolkit-is

JavaScript 类型检测库（ESM 优先、可树摇）。参考并重写了 [is 库](https://github.com/enricomarino/is)，使用 TypeScript 实现，提供完整的类型支持。

## 安装

```bash
pnpm add @genlib/toolkit-is
```

## API

### 通用类型检测

- **`isDefined(value)`** - 检查值是否已定义（不为 undefined）
- **`isUndefined(value)`** - 检查值是否为 undefined
- **`isNil(value)`** - 检查值是否为 null 或 undefined
- **`isNull(value)`** - 检查值是否为 null
- **`isEmpty(value)`** - 检查值是否为空
- **`isEqual(value, other)`** - 深度比较两个值是否相等
- **`isInstance(value, constructor)`** - 检查值是否为指定构造函数的实例
- **`isType(value, type)`** - 检查值的类型是否匹配
- **`isHosted(value, host)`** - 检查值是否托管在指定的宿主对象上

### 参数检测

- **`isArguments(value)`** - 检查值是否为 arguments 对象
- **`isArgumentsEmpty(value)`** - 检查 arguments 对象是否为空

### 数组检测

- **`isArray(value)`** - 检查值是否为数组
- **`isArrayEmpty(value)`** - 检查数组是否为空
- **`isArrayLike(value)`** - 检查值是否为类数组对象

### 布尔值检测

- **`isBoolean(value)`** - 检查值是否为布尔值
- **`isTrue(value)`** - 检查值是否为 true
- **`isFalse(value)`** - 检查值是否为 false

### 日期检测

- **`isDate(value)`** - 检查值是否为有效的 Date 对象

### DOM 元素检测

- **`isElement(value)`** - 检查值是否为 DOM 元素（仅在浏览器环境）

### 错误检测

- **`isError(value)`** - 检查值是否为 Error 对象

### 函数检测

- **`isFunction(value)`** - 检查值是否为函数

### 数字检测

- **`isNumber(value)`** - 检查值是否为数字（不包括 NaN）
- **`isInteger(value)`** - 检查值是否为整数
- **`isDecimal(value)`** - 检查值是否为小数
- **`isInfinite(value)`** - 检查值是否为无穷大
- **`isNaNValue(value)`** - 检查值是否为 NaN
- **`isEven(value)`** - 检查数字是否为偶数
- **`isOdd(value)`** - 检查数字是否为奇数
- **`isDivisibleBy(value, n)`** - 检查数字是否能被 n 整除
- **`isMaximum(value, others)`** - 检查值是否为数组中的最大值
- **`isMinimum(value, others)`** - 检查值是否为数组中的最小值
- **`isGreaterThan(value, other)`** - 检查值是否大于其他值
- **`isLessThan(value, other)`** - 检查值是否小于其他值
- **`isGreaterThanOrEqual(value, other)`** - 检查值是否大于等于其他值
- **`isLessThanOrEqual(value, other)`** - 检查值是否小于等于其他值
- **`isWithin(value, start, finish)`** - 检查值是否在指定范围内

### 对象检测

- **`isObject(value)`** - 检查值是否为对象（不包括 null 和数组）

### 正则表达式检测

- **`isRegExp(value)`** - 检查值是否为 RegExp 对象

### 字符串检测

- **`isString(value)`** - 检查值是否为字符串

### 编码检测

- **`isBase64(value)`** - 检查字符串是否为有效的 Base64 编码
- **`isHex(value)`** - 检查字符串是否为有效的十六进制编码

### Symbol 检测

- **`isSymbol(value)`** - 检查值是否为 Symbol

### BigInt 检测

- **`isBigInt(value)`** - 检查值是否为 BigInt

## 示例

### 基础类型检测

```typescript
import {
  isDefined,
  isUndefined,
  isNil,
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isFunction,
} from '@genlib/toolkit-is';

isDefined(123); // true
isUndefined(undefined); // true
isNil(null); // true
isString('hello'); // true
isNumber(123); // true
isBoolean(true); // true
isArray([1, 2, 3]); // true
isObject({}); // true
isFunction(() => {}); // true
```

### 空值检测

```typescript
import { isEmpty, isArrayEmpty } from '@genlib/toolkit-is';

isEmpty(null); // true
isEmpty(undefined); // true
isEmpty(''); // true
isEmpty([]); // true
isEmpty({}); // true
isArrayEmpty([]); // true
```

### 深度比较

```typescript
import { isEqual } from '@genlib/toolkit-is';

isEqual(1, 1); // true
isEqual([1, 2, 3], [1, 2, 3]); // true
isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
isEqual({ a: 1, b: 2 }, { b: 2, a: 1 }); // true
```

### 数字检测

```typescript
import {
  isInteger,
  isDecimal,
  isEven,
  isOdd,
  isWithin,
  isDivisibleBy,
} from '@genlib/toolkit-is';

isInteger(123); // true
isDecimal(1.23); // true
isEven(2); // true
isOdd(1); // true
isWithin(5, 1, 10); // true
isDivisibleBy(10, 2); // true
```

### 特殊类型检测

```typescript
import { isDate, isError, isRegExp, isSymbol, isBigInt } from '@genlib/toolkit-is';

isDate(new Date()); // true
isError(new Error()); // true
isRegExp(/test/); // true
isSymbol(Symbol('test')); // true
isBigInt(BigInt(123)); // true
```

### 编码检测

```typescript
import { isBase64, isHex } from '@genlib/toolkit-is';

isBase64('SGVsbG8='); // true
isHex('123abc'); // true
isHex('ABCDEF'); // true
```

### 实例检测

```typescript
import { isInstance } from '@genlib/toolkit-is';

isInstance(new Date(), Date); // true
isInstance([], Array); // true
isInstance(/test/, RegExp); // true
```

## 特性

- ✅ 完整的 TypeScript 类型支持
- ✅ ESM 优先、CJS 兼容
- ✅ 可树摇，按需导入
- ✅ 覆盖所有常用的类型检测场景
- ✅ 完整的测试覆盖（75+ 个测试用例）
- ✅ 兼容浏览器和 Node.js 环境

