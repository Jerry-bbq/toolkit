import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
  },
}) as ReturnType<typeof defineConfig>;
