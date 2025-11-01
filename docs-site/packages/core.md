---
layout: doc
---

# @genlib/toolkit-core

ESM 优先、可树摇的通用工具核心包（浏览器 + Node）。

## 安装

```bash
pnpm add @genlib/toolkit-core
```

## 快速上手

```typescript
// 按需导入（推荐）
import { pick, get, set, merge } from '@genlib/toolkit-core/object';
import { uniqBy, chunk, groupBy } from '@genlib/toolkit-core/array';
import { clamp, random } from '@genlib/toolkit-core/number';
import { camelCase, kebabCase } from '@genlib/toolkit-core/string';
import { debounce, throttle, memoize } from '@genlib/toolkit-core/func';

const obj = { a: { b: [{ c: 1 }] } };
console.log(get(obj, 'a.b[0].c')); // 1
```

## API

### object

#### `pick<T, K>(obj: T, keys: K): Pick<T, K[number]>`

选择对象的指定属性。

**示例：**
```typescript
import { pick } from '@genlib/toolkit-core/object';

pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
```

#### `omit<T, K>(obj: T, keys: K): Omit<T, K[number]>`

排除对象的指定属性。

#### `get<T, D>(obj: T, path: string | Array<string|number>, def?: D): T | D`

根据路径获取对象属性值。支持字符串路径（如 `'a.b[0].c'`）或数组路径（如 `['a', 'b', 0, 'c']`）。

**示例：**
```typescript
import { get } from '@genlib/toolkit-core/object';

const obj = { a: { b: [{ c: 1 }] } };
get(obj, 'a.b[0].c'); // 1
get(obj, ['a', 'b', 0, 'c']); // 1
get(obj, 'a.b[5].c', 'default'); // 'default'
```

#### `set<T>(obj: T, path: string | Array<string|number>, value: unknown): T`

设置对象属性值（不可变，返回新对象）。

#### `merge<A, B>(a: A, b: B): A & B`

合并对象，带原型污染防护。

#### `keys<T>(obj: T): Array<keyof T>` / `values<T>(obj: T): Array<T[keyof T]>` / `entries<T>(obj: T): Array<[keyof T, T[keyof T]]>`

获取对象的所有键/值/键值对（类型安全）。

#### `deepClone<T>(obj: T): T`

深度克隆对象。支持 Date、RegExp、数组和嵌套对象。

**示例：**
```typescript
import { deepClone } from '@genlib/toolkit-core/object';

const original = { a: { b: { c: 1 } } };
const cloned = deepClone(original);
cloned.a.b.c = 2;
// original.a.b.c 仍然是 1
```

### array

#### `uniqBy<T, K>(arr: T[], key: (x: T) => K): T[]`

根据键去重。

#### `uniq<T>(arr: T[]): T[]`

数组去重。

#### `chunk<T>(arr: T[], size: number): T[][]`

将数组分割成指定大小的块。

**示例：**
```typescript
import { chunk } from '@genlib/toolkit-core/array';

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

#### `flatten<T>(arr: (T | T[])[]): T[]` / `flattenDeep<T>(arr: unknown[]): T[]`

展平数组（一层或深度）。

#### `groupBy<T, K>(arr: T[], key: (item: T) => K): Record<K, T[]>`

按指定键分组数组。

#### `sortBy<T, K>(arr: T[], key: (item: T) => K, order?: 'asc'|'desc'): T[]`

按指定键排序数组。

#### `partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]]`

将数组分割为满足条件和不满足条件的两部分。

### string

#### `camelCase(str: string): string`

转换为驼峰命名（camelCase）。

#### `kebabCase(str: string): string`

转换为短横线命名（kebab-case）。

#### `snakeCase(str: string): string`

转换为下划线命名（snake_case）。

#### `capitalize(str: string): string` / `capitalizeWords(str: string): string`

首字母大写 / 每个单词首字母大写。

#### `truncate(str: string, length: number, suffix?: string): string`

截断字符串。

### number

#### `clamp(n: number, min: number, max: number): number`

将数字限制在指定范围内。

#### `random(min: number, max: number): number` / `randomFloat(min: number, max: number): number`

生成指定范围内的随机整数/浮点数。

#### `range(start: number, end: number, step?: number): number[]`

生成数字范围数组。

#### `lerp(a: number, b: number, t: number): number`

线性插值。

#### `normalize(value: number, min: number, max: number): number`

归一化值到 0-1 范围。

### func

#### `debounce<F>(fn: F, wait?: number): F`

防抖函数：延迟执行，在等待期间再次调用会重置计时器。

#### `throttle<F>(fn: F, wait?: number): F`

节流函数：在指定时间间隔内最多执行一次。

#### `memoize<F>(fn: F, keyer?: (...args) => string): F`

记忆化函数：缓存函数结果，避免重复计算。

## 完整示例

```typescript
import {
  // object
  pick, omit, get, set, merge, keys, values, deepClone,
  // array
  uniqBy, uniq, chunk, flatten, groupBy, sortBy, partition,
  // string
  camelCase, kebabCase, snakeCase, capitalize,
  // number
  clamp, random, range, lerp,
  // func
  debounce, throttle, memoize,
} from '@genlib/toolkit-core';

// 对象操作
const obj = { a: { b: { c: 1 } } };
const value = get(obj, 'a.b.c'); // 1
const newObj = set(obj, 'a.b.d', 2); // 新对象，原对象不变

// 数组操作
const grouped = groupBy(
  [{ type: 'a', value: 1 }, { type: 'b', value: 2 }],
  (x) => x.type
);

// 字符串转换
const className = camelCase('my-component-name'); // 'myComponentName'

// 函数工具
const handleResize = throttle(() => {
  console.log('resized');
}, 200);
```

## 约定

- 纯函数、不可变；需要可变行为时以 `mutXxx` 显式命名（当前未提供）
- 避免 `import * as core from '@genlib/toolkit-core'` 命名空间导入，以提升摇树效果
- 所有函数都返回新值，不修改原对象/数组

## 特性

- ✅ 完整的 TypeScript 类型支持
- ✅ ESM 优先、CJS 兼容
- ✅ 可树摇，按需导入
- ✅ 子路径导出，支持精确导入
- ✅ 完整的测试覆盖
