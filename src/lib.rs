use wasm_bindgen::prelude::*;
use comrak::{markdown_to_html, ComrakOptions};

#[wasm_bindgen]
pub fn parse_markdown(input: &str) -> String {
    let options = ComrakOptions::default();
    markdown_to_html(input, &options)
}

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
