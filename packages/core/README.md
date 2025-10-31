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
import { uniqBy } from '@genlib/toolkit-core/array';
import { clamp } from '@genlib/toolkit-core/number';
import { debounce, throttle, memoize } from '@genlib/toolkit-core/func';

const obj = { a: { b: [{ c: 1 }] } };
console.log(get(obj, 'a.b[0].c')); // 1
```

## API

### object
- `pick<T, K extends readonly (keyof T)[]>(obj: T, keys: K): Pick<T, K[number]>`
- `omit<T, K extends readonly (keyof T)[]>(obj: T, keys: K): Omit<T, K[number]>`
- `get<T, D>(obj: T, path: string | (string|number)[], def?: D): T | D`
- `set<T extends object>(obj: T, path: string | (string|number)[], value: unknown): T`（不可变）
- `merge<A extends object, B extends object>(a: A, b: B): A & B`（带原型污染防护）

示例：
```ts
import { get, set, merge, pick, omit } from '@genlib/toolkit-core/object';
const a = { user: { name: 'Ann' } };
get(a, 'user.name'); // 'Ann'
const b = set(a, 'user.age', 18); // 不修改 a，返回新对象
merge({ x: 1 }, { y: 2 }); // { x:1, y:2 }
pick({ a:1, b:2 }, ['a']); // { a:1 }
omit({ a:1, b:2 }, ['b']); // { a:1 }
```

### array
- `uniqBy<T, K>(arr: readonly T[], key: (x: T) => K): T[]`

示例：
```ts
import { uniqBy } from '@genlib/toolkit-core/array';
uniqBy([{id:1},{id:1},{id:2}], x => x.id); // [{id:1},{id:2}]
```

### number
- `clamp(n: number, min: number, max: number): number`

示例：
```ts
import { clamp } from '@genlib/toolkit-core/number';
clamp(5, 0, 3); // 3
```

### func
- `debounce<F>(fn: F, wait?: number): F`
- `throttle<F>(fn: F, wait?: number): F`
- `memoize<F>(fn: F, keyer?: (...args: Parameters<F>) => string): F`

示例：
```ts
import { debounce, throttle, memoize } from '@genlib/toolkit-core/func';
const onInput = debounce((v: string) => {/* ... */}, 300);
const onScroll = throttle(() => {/* ... */}, 100);
const fib = memoize((n: number): number => (n<=1?n:fib(n-1)+fib(n-2)));
```

## 约定
- 纯函数、不可变；需要可变行为时以 `mutXxx` 显式命名（当前未提供）
- 避免 `import * as core from '@genlib/toolkit-core'` 命名空间导入，以提升摇树效果
