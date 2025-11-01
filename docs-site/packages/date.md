---
layout: doc
---

# @genlib/toolkit-date

日期工具（显式 API，无全局 polyfill）。

## 安装
```bash
pnpm add @genlib/toolkit-date
```

## API
- `isSameDay(a: Date, b: Date): boolean`
- `addDays(d: Date, days: number): Date`
- `formatISO(d: Date): string`

## 示例
```ts
import { isSameDay, addDays, formatISO } from '@genlib/toolkit-date';

isSameDay(new Date('2020-01-01Z'), new Date('2020-01-01Z')); // true
addDays(new Date('2020-01-01Z'), 1);                          // 2020-01-02Z
formatISO(new Date());                                        // '2025-10-31T...Z'
```
