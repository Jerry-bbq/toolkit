import { defineConfig } from "tsup";
export default defineConfig({
  entry: { index: "src/index.ts" },
  dts: true,
  format: ["esm", "cjs"],
  treeshake: true,
  sourcemap: true,
  clean: true,
  target: "es2020",
  minify: false
});
