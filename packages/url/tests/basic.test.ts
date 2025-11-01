import { describe, expect, it } from 'vitest';
import {
  buildUrl,
  cleanUrl,
  fromQuery,
  getBaseUrl,
  getQueryParam,
  getUrlParam,
  isValidUrl,
  joinUrl,
  parseUrl,
  toQuery,
  updateQuery,
} from '../src/index';

describe('toQuery', () => {
  it('should convert object to query string', () => {
    expect(toQuery({ a: 1, b: 'hello' })).toBe('a=1&b=hello');
  });

  it('should handle array values', () => {
    expect(toQuery({ tags: ['a', 'b', 'c'] })).toBe('tags=a&tags=b&tags=c');
  });

  it('should encode special characters', () => {
    expect(toQuery({ name: 'hello world', value: 'x&y=z' })).toBe(
      'name=hello+world&value=x%26y%3Dz'
    );
  });

  it('should skip null and undefined values', () => {
    expect(toQuery({ a: 1, b: null, c: undefined, d: '' })).toBe('a=1&d=');
  });

  it('should handle empty object', () => {
    expect(toQuery({})).toBe('');
  });
});

describe('fromQuery', () => {
  it('should parse query string to object', () => {
    expect(fromQuery('a=1&b=hello')).toEqual({ a: '1', b: 'hello' });
  });

  it('should handle query string with question mark', () => {
    expect(fromQuery('?a=1&b=2')).toEqual({ a: '1', b: '2' });
  });

  it('should decode URL encoded values', () => {
    expect(fromQuery('name=hello+world&value=x%26y')).toEqual({
      name: 'hello world',
      value: 'x&y',
    });
  });

  it('should handle empty query string', () => {
    expect(fromQuery('')).toEqual({});
    expect(fromQuery('?')).toEqual({});
  });

  it('should handle duplicate keys (take last value)', () => {
    const result = fromQuery('a=1&a=2&a=3');
    // URLSearchParams 会保留最后一个值
    expect(result.a).toBe('3');
  });
});

describe('getQueryParam', () => {
  it('should get parameter from query string', () => {
    expect(getQueryParam('a=1&b=2', 'a')).toBe('1');
    expect(getQueryParam('a=1&b=2', 'b')).toBe('2');
  });

  it('should return undefined for non-existent parameter', () => {
    expect(getQueryParam('a=1&b=2', 'c')).toBeUndefined();
  });

  it('should return default value for non-existent parameter', () => {
    expect(getQueryParam('a=1&b=2', 'c', 'default')).toBe('default');
  });

  it('should handle query string with question mark', () => {
    expect(getQueryParam('?a=1&b=2', 'a')).toBe('1');
  });
});

describe('getUrlParam', () => {
  it('should get parameter from full URL', () => {
    expect(getUrlParam('https://example.com?a=1&b=2', 'a')).toBe('1');
    expect(getUrlParam('https://example.com?a=1&b=2', 'b')).toBe('2');
  });

  it('should get parameter from query string', () => {
    // 对于纯查询字符串，getUrlParam 会使用 getQueryParam
    expect(getUrlParam('a=1&b=2', 'a')).toBe('1');
    expect(getUrlParam('?a=1&b=2', 'a')).toBe('1');
  });

  it('should return default value for non-existent parameter', () => {
    expect(getUrlParam('https://example.com?a=1', 'b', 'default')).toBe('default');
  });
});

describe('buildUrl', () => {
  it('should build URL with query parameters', () => {
    expect(buildUrl('/api', { a: 1, b: 'hello' })).toBe('/api?a=1&b=hello');
  });

  it('should handle URL with existing query', () => {
    expect(buildUrl('/api?x=1', { a: 2 })).toBe('/api?x=1&a=2');
  });

  it('should return base URL when no params', () => {
    expect(buildUrl('/api')).toBe('/api');
    expect(buildUrl('/api', {})).toBe('/api');
  });

  it('should handle full URL', () => {
    expect(buildUrl('https://example.com/api', { a: 1 })).toBe('https://example.com/api?a=1');
  });
});

describe('updateQuery', () => {
  it('should merge query parameters', () => {
    expect(updateQuery('/api?a=1&b=2', { c: 3 })).toBe('/api?a=1&b=2&c=3');
    expect(updateQuery('/api?a=1&b=2', { b: 3 })).toBe('/api?a=1&b=3');
  });

  it('should replace all query parameters when replace=true', () => {
    expect(updateQuery('/api?a=1&b=2', { c: 3 }, true)).toBe('/api?c=3');
  });

  it('should handle full URL', () => {
    const result = updateQuery('https://example.com/api?a=1', { b: 2 });
    expect(result).toContain('b=2');
  });

  it('should handle URL without query', () => {
    expect(updateQuery('/api', { a: 1 })).toBe('/api?a=1');
  });
});

describe('parseUrl', () => {
  it('should parse full URL', () => {
    const result = parseUrl('https://example.com:8080/path?a=1&b=2#hash');
    expect(result.protocol).toBe('https:');
    expect(result.hostname).toBe('example.com');
    expect(result.port).toBe('8080');
    expect(result.pathname).toBe('/path');
    expect(result.searchParams).toEqual({ a: '1', b: '2' });
    expect(result.hash).toBe('#hash');
  });

  it('should parse relative path', () => {
    const result = parseUrl('/path/to?query=1#hash');
    expect(result.pathname).toBe('/path/to');
    expect(result.searchParams).toEqual({ query: '1' });
    expect(result.hash).toBe('#hash');
  });

  it('should handle URL without query and hash', () => {
    const result = parseUrl('/path/to');
    expect(result.pathname).toBe('/path/to');
    expect(result.search).toBe('');
    expect(result.hash).toBe('');
  });
});

describe('isValidUrl', () => {
  it('should validate HTTP URLs', () => {
    expect(isValidUrl('http://example.com')).toBe(true);
    expect(isValidUrl('https://example.com')).toBe(true);
  });

  it('should reject invalid URLs', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('ftp://example.com')).toBe(false);
  });

  it('should respect protocol whitelist', () => {
    expect(isValidUrl('http://example.com', ['http:'])).toBe(true);
    expect(isValidUrl('https://example.com', ['http:'])).toBe(false);
    expect(isValidUrl('ftp://example.com', ['ftp:'])).toBe(true);
  });
});

describe('joinUrl', () => {
  it('should join URL paths correctly', () => {
    expect(joinUrl('https://example.com', 'api', 'users')).toBe('https://example.com/api/users');
  });

  it('should handle trailing and leading slashes', () => {
    expect(joinUrl('https://example.com/', '/api/', '/users/')).toBe(
      'https://example.com/api/users'
    );
  });

  it('should handle multiple path segments', () => {
    expect(joinUrl('/base', 'a', 'b', 'c')).toBe('/base/a/b/c');
  });

  it('should handle empty segments', () => {
    expect(joinUrl('/base', '', 'path', '')).toBe('/base/path');
  });
});

describe('cleanUrl', () => {
  it('should remove query and hash from URL', () => {
    expect(cleanUrl('https://example.com/path?a=1&b=2#hash')).toBe('https://example.com/path');
  });

  it('should handle relative path', () => {
    expect(cleanUrl('/path?a=1#hash')).toBe('/path');
  });

  it('should handle URL without query or hash', () => {
    expect(cleanUrl('/path')).toBe('/path');
    expect(cleanUrl('https://example.com/path')).toBe('https://example.com/path');
  });
});

describe('getBaseUrl', () => {
  it('should extract base URL from full URL', () => {
    expect(getBaseUrl('https://example.com:8080/path?a=1')).toBe('https://example.com:8080');
  });

  it('should return empty string for relative path', () => {
    expect(getBaseUrl('/path/to')).toBe('');
  });
});
