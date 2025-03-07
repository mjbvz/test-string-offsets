const StringOffsets = require('./index');

{
    // Example with simple ASCII text
    const simpleText = "Hello\nWorld\nHow are you?";
    const offsets = new StringOffsets(simpleText);

    // Get total number of lines
    console.log('Number of lines:', offsets.lines()); // 3

    // Get UTF-8 byte positions for line 1 (0-based index)
    const line1 = offsets.lineToUtf8s(1);
    console.log('Line 1 byte range:', line1); // { start: 6, end: 12 }

    // Get line number for a UTF-8 byte position
    console.log('Line number for byte 8:', offsets.utf8ToLine(8)); // 1
}
{
    // Example with Unicode text
    const unicodeText = "Hello ☀️\n世界\n🌍 Earth";
    const unicodeOffsets = new StringOffsets(unicodeText);

    // Converting between UTF-8 and UTF-16 positions
    const utf8Pos = 6; // Position of ☀️
    const utf16Pos = unicodeOffsets.utf8ToUtf16(utf8Pos);
    console.log('UTF-16 position:', utf16Pos);

    // Convert back to UTF-8
    const backToUtf8 = unicodeOffsets.utf16ToUtf8(utf16Pos);
    console.log('Back to UTF-8 position:', backToUtf8);

    // Get line ranges for a byte range
    const lineRange = unicodeOffsets.utf8sToLines(0, 20);
    console.log('Lines spanning bytes 0-20:', lineRange);
}