import { Bench } from 'tinybench';
import { clamp } from './dist/index.js';
const b = new Bench();
b.add('clamp', () => {
  clamp(123, 0, 1000);
});
await b.run();
console.table(b.table());
