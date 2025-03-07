const StringOffsets = require('./index');

describe('StringOffsets', () => {
  test('basic ASCII text', () => {
    const text = "hello\nworld";
    const offsets = new StringOffsets(text);
    
    expect(offsets.lines()).toBe(2);
    expect(offsets.utf8ToUtf16(0)).toBe(0);
    expect(offsets.utf8ToLine(0)).toBe(0);
    expect(offsets.lineToUtf8s(0)).toEqual({start: 0, end: 6});
    expect(offsets.lineToUtf8s(1)).toEqual({start: 6, end: 11});
  });

  test.only('Unicode text', () => {
    const text = "☀️hello\n🗺️world";
    const offsets = new StringOffsets(text);
    
    expect(offsets.lines()).toBe(2);
    // ☀️ is 6 UTF-8 bytes and 3 UTF-16 code units
    expect(offsets.utf8ToUtf16(6)).toBe(3);
    expect(offsets.utf16ToUtf8(3)).toBe(6);
    expect(offsets.utf8ToLine(0)).toBe(0);
  });
});
