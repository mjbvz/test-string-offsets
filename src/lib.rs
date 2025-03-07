use wasm_bindgen::prelude::*;
use string_offsets::StringOffsets;

#[wasm_bindgen]
pub struct WasmStringOffsets {
    inner: StringOffsets,
}

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}


#[wasm_bindgen]
impl WasmStringOffsets {
    #[wasm_bindgen(constructor)]
    pub fn new(content: &str) -> Self {
        Self {
            inner: StringOffsets::new(content)
        }
    }

    #[wasm_bindgen]
    pub fn from_bytes(bytes: &[u8]) -> Self {
        Self {
            inner: StringOffsets::from_bytes(bytes)
        }
    }

    #[wasm_bindgen]
    pub fn lines(&self) -> usize {
        self.inner.lines()
    }

    #[wasm_bindgen]
    pub fn utf8_to_utf16(&self, byte_number: usize) -> usize {
        let out = self.inner.utf8_to_utf16(byte_number);
        log(&format!("utf8_to_utf16 {} {}", byte_number, out));
        out
    }

    #[wasm_bindgen]
    pub fn utf8_to_line(&self, byte_number: usize) -> usize {
        self.inner.utf8_to_line(byte_number)
    }

    #[wasm_bindgen]
    pub fn line_to_utf8s(&self, line_number: usize) -> Vec<usize> {
        let range = self.inner.line_to_utf8s(line_number);
        vec![range.start, range.end]
    }

    #[wasm_bindgen]
    pub fn utf8s_to_lines(&self, start: usize, end: usize) -> Vec<usize> {
        let range = self.inner.utf8s_to_lines(start..end);
        vec![range.start, range.end]
    }
}
