# @genlib/toolkit-money

金额工具（最小货币单位换算、舍入与格式化）。

## 安装
```bash
pnpm add @genlib/toolkit-money
```

## API
- `toMinor(amount: number): number`（主 → 分/美分）
- `fromMinor(cents: number): number`（分/美分 → 主）
- `roundMoney(amount: number, digits = 2): number`
- `formatMoney(amount: number, currency?: 'CNY'|'USD'|'EUR', locale?: string): string`

## 示例
```ts
import { toMinor, fromMinor, roundMoney, formatMoney } from '@genlib/toolkit-money';

toMinor(12.34);            // 1234
fromMinor(1234);           // 12.34
roundMoney(1.005, 2);      // 1.01
formatMoney(12.34, 'CNY'); // '¥12.34'
```
