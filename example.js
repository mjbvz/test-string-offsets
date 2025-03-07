const StringOffsets = require('./index');

const text = "☀️hello\n🗺️world";
const offsets = new StringOffsets(text);

console.log(offsets.lines() === 2);
// ☀️ is 6 UTF-8 bytes and 3 UTF-16 code units
console.log('UTF-16 position ' +offsets.utf8ToUtf16(6));