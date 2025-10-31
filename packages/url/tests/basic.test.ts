import { describe, it, expect } from 'vitest';
import { placeholder } from '../src/index';

describe('placeholder', () => {
  it('returns ok', () => {
    expect(placeholder()).toMatch(/-ok$/);
  });
});
