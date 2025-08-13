use wasm_bindgen::prelude::*;
use comrak::{markdown_to_html, ComrakOptions};

#[wasm_bindgen]
pub fn parse_markdown(input: &str) -> String {
    let mut options = ComrakOptions::default();
    /* I'm using this Comrak RUST-powered MD Parser to test its speed against
    JS-powered MD parsers like marked and marked-it. So note that, Markdown is NOT a strict standard.
    (Different parsers implement different extensions and edge cases).

    Comrak follows the CommonMark spec by default, which is much more minimal than markdown-it etc.
    So I gotta manually add a bunch of stuff back including strikethrough, table, tasklist, etc.
    (I think that those are the main ones missing outside of my parser from my "HackMD-clone" project). */
    options.extension.strikethrough = true;
    options.extension.table = true;
    options.extension.tasklist = true;
    options.render.hardbreaks = true;

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
