# @genlib/toolkit-core

ESM 优先、可树摇的通用工具核心包（浏览器 + Node）。

## 安装

```bash
pnpm add @genlib/toolkit-core
```

## 快速上手

```ts
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

- **`pick<T, K>(obj: T, keys: K): Pick<T, K[number]>`** - 选择对象的指定属性
- **`omit<T, K>(obj: T, keys: K): Omit<T, K[number]>`** - 排除对象的指定属性
- **`get<T, D>(obj: T, path: string | Array<string|number>, def?: D): T | D`** - 根据路径获取对象属性值
- **`set<T>(obj: T, path: string | Array<string|number>, value: unknown): T`** - 设置对象属性值（不可变）
- **`merge<A, B>(a: A, b: B): A & B`** - 合并对象（带原型污染防护）
- **`keys<T>(obj: T): Array<keyof T>`** - 获取对象的所有键（类型安全）
- **`values<T>(obj: T): Array<T[keyof T]>`** - 获取对象的所有值（类型安全）
- **`entries<T>(obj: T): Array<[keyof T, T[keyof T]]>`** - 获取对象的所有键值对（类型安全）
- **`deepClone<T>(obj: T): T`** - 深度克隆对象（支持 Date、RegExp、数组）

**示例：**
```ts
import { get, set, merge, pick, omit, keys, values, deepClone } from '@genlib/toolkit-core/object';

const a = { user: { name: 'Ann' } };
get(a, 'user.name'); // 'Ann'
const b = set(a, 'user.age', 18); // 不修改 a，返回新对象
merge({ x: 1 }, { y: 2 }); // { x:1, y:2 }
pick({ a:1, b:2 }, ['a']); // { a:1 }
omit({ a:1, b:2 }, ['b']); // { a:1 }
keys({ a: 1, b: 2 }); // ['a', 'b']
values({ a: 1, b: 2 }); // [1, 2]
deepClone({ nested: { value: 1 } }); // 深度克隆
```

### array

- **`uniqBy<T, K>(arr: T[], key: (x: T) => K): T[]`** - 根据键去重
- **`uniq<T>(arr: T[]): T[]`** - 数组去重
- **`chunk<T>(arr: T[], size: number): T[][]`** - 将数组分割成指定大小的块
- **`flatten<T>(arr: (T | T[])[]): T[]`** - 展平数组（一层深度）
- **`flattenDeep<T>(arr: unknown[]): T[]`** - 深度展平数组
- **`groupBy<T, K>(arr: T[], key: (item: T) => K): Record<K, T[]>`** - 按指定键分组数组
- **`sortBy<T, K>(arr: T[], key: (item: T) => K, order?: 'asc'|'desc'): T[]`** - 按指定键排序数组
- **`partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]]`** - 将数组分割为满足条件和不满足条件的两部分

**示例：**
```ts
import { uniqBy, uniq, chunk, flatten, groupBy, sortBy, partition } from '@genlib/toolkit-core/array';

uniqBy([{id:1},{id:1},{id:2}], x => x.id); // [{id:1},{id:2}]
uniq([1, 2, 2, 3]); // [1, 2, 3]
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
flatten([1, [2, 3], [4]]); // [1, 2, 3, 4]
groupBy([{type:'a'},{type:'b'},{type:'a'}], x => x.type); // { a: [...], b: [...] }
sortBy([{age:30},{age:20}], x => x.age, 'asc'); // [{age:20},{age:30}]
partition([1,2,3,4,5], x => x % 2 === 0); // [[2,4], [1,3,5]]
```

### string

- **`camelCase(str: string): string`** - 转换为驼峰命名（camelCase）
- **`kebabCase(str: string): string`** - 转换为短横线命名（kebab-case）
- **`snakeCase(str: string): string`** - 转换为下划线命名（snake_case）
- **`capitalize(str: string): string`** - 首字母大写
- **`capitalizeWords(str: string): string`** - 每个单词首字母大写
- **`truncate(str: string, length: number, suffix?: string): string`** - 截断字符串

**示例：**
```ts
import { camelCase, kebabCase, snakeCase, capitalize, truncate } from '@genlib/toolkit-core/string';

camelCase('hello world'); // 'helloWorld'
kebabCase('helloWorld'); // 'hello-world'
snakeCase('helloWorld'); // 'hello_world'
capitalize('hello'); // 'Hello'
capitalizeWords('hello world'); // 'Hello World'
truncate('hello world', 8); // 'hello...'
```

### number

- **`clamp(n: number, min: number, max: number): number`** - 将数字限制在指定范围内
- **`random(min: number, max: number): number`** - 生成指定范围内的随机整数
- **`randomFloat(min: number, max: number): number`** - 生成指定范围内的随机浮点数
- **`range(start: number, end: number, step?: number): number[]`** - 生成数字范围数组
- **`lerp(a: number, b: number, t: number): number`** - 线性插值
- **`normalize(value: number, min: number, max: number): number`** - 归一化值到 0-1 范围

**示例：**
```ts
import { clamp, random, range, lerp, normalize } from '@genlib/toolkit-core/number';

clamp(5, 0, 3); // 3
random(1, 10); // 1-10 之间的随机整数
range(0, 5); // [0, 1, 2, 3, 4]
lerp(0, 10, 0.5); // 5
normalize(5, 0, 10); // 0.5
```

### func

- **`debounce<F>(fn: F, wait?: number): F`** - 防抖函数：延迟执行，在等待期间再次调用会重置计时器
- **`throttle<F>(fn: F, wait?: number): F`** - 节流函数：在指定时间间隔内最多执行一次
- **`memoize<F>(fn: F, keyer?: (...args) => string): F`** - 记忆化函数：缓存函数结果，避免重复计算

**示例：**
```ts
import { debounce, throttle, memoize } from '@genlib/toolkit-core/func';

const onInput = debounce((v: string) => {/* ... */}, 300);
const onScroll = throttle(() => {/* ... */}, 100);
const fib = memoize((n: number): number => (n<=1?n:fib(n-1)+fib(n-2)));
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
