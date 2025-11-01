import { defineConfig } from 'vitest/config';
const config = defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      thresholds: { lines: 90, branches: 85, functions: 90, statements: 90 },
    },
  },
}) as ReturnType<typeof defineConfig>;
export default config;
