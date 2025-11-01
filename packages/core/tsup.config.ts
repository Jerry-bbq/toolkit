import { defineConfig } from 'tsup';
const config = defineConfig({
  entry: {
    index: 'src/index.ts',
    'object/index': 'src/object/index.ts',
    'array/index': 'src/array/index.ts',
    'string/index': 'src/string/index.ts',
    'number/index': 'src/number/index.ts',
    'func/index': 'src/func/index.ts',
    'object/pick': 'src/object/pick.ts',
  },
  dts: true,
  format: ['esm', 'cjs'],
  treeshake: true,
  sourcemap: true,
  clean: true,
  target: 'es2020',
  minify: false,
}) as ReturnType<typeof defineConfig>;
export default config;
