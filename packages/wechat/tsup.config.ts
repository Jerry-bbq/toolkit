import { defineConfig } from 'tsup';
const config = defineConfig({
  entry: { index: 'src/index.ts' },
  dts: true,
  format: ['esm', 'cjs'],
  treeshake: true,
  sourcemap: true,
  clean: true,
  target: 'es2020',
  minify: false,
}) as ReturnType<typeof defineConfig>;
export default config;

