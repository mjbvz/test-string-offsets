use string_offsets::StringOffsets;

fn main() {
    // Example with Unicode text, similar to the JS example
    let unicode_text = "☀️hello\n🗺️world";
    let offsets = StringOffsets::new(unicode_text);

    // Converting between UTF-8 and UTF-16 positions
    let utf8_pos = 6; // Position of ☀️
    let utf16_pos = offsets.utf8_to_utf16(utf8_pos);
    println!("UTF-16 position: {}", utf16_pos);
}
