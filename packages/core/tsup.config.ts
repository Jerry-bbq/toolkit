import { defineConfig } from "tsup";
export default defineConfig({
  entry: {
    index: "src/index.ts",
    "object/index": "src/object/index.ts",
    "number/index": "src/number/index.ts",
    "func/index": "src/func/index.ts",
    "object/pick": "src/object/pick.ts"
  },
  dts: true,
  format: ["esm", "cjs"],
  treeshake: true,
  sourcemap: true,
  clean: true,
  target: "es2020",
  minify: false
});
