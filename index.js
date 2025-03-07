const wasm = require('./pkg/string_offsets_js.js');

class StringOffsets {
  constructor(content) {
    this.inner = wasm.from_bytes(new TextEncoder().encode(content));
  }

  lines() {
    return this.inner.lines();
  }

  utf8ToUtf16(bytePos) {
    return this.inner.utf8_to_utf16(bytePos);
  }

  utf16ToUtf8(utf16Pos) {
    return this.inner.utf16_to_utf8(utf16Pos);
  }

  utf8ToLine(bytePos) {
    return this.inner.utf8_to_line(bytePos);
  }

  lineToUtf8s(lineNumber) {
    const [start, end] = this.inner.line_to_utf8s(lineNumber);
    return { start, end };
  }

  utf8sToLines(start, end) {
    const [startLine, endLine] = this.inner.utf8s_to_lines(start, end);
    return { start: startLine, end: endLine };
  }
}

module.exports = StringOffsets;
