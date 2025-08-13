import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import MarkdownIt from "https://cdn.skypack.dev/markdown-it";
import { parse_markdown } from "../pkg/rust_wasm_markdown.js";

function runMarkedTest() {
    console.log("**Inside the runMarkedTest() function...**");

    // Large markdown string:
    const bigMarkdown = "# Title\n" + ("**Bold text** and some more text.\n\n".repeat(5000));

    // Testing marked (JS):
    let startM = performance.now();
    marked(bigMarkdown);
    let markedSpeed = performance.now() - startM;

    // Testing markdown-it (JS):
    const mdParser = new MarkdownIt();
    let startMI = performance.now();
    mdParser.render(bigMarkdown)
    let markdownItSpeed = performance.now() - startMI;

    // Testing the Comrak parser (RUST):
    let startC = performance.now();
    parse_markdown(bigMarkdown);
    let comrakSpeed = performance.now() - startC;

    console.log("The time it takes to run the marked(bigMarkdown) [JS] function => ", markedSpeed, "ms");
    console.log("The time it takes to run the MarkdownIt(bigMarkdown) [JS] function => ", markdownItSpeed, "ms");
    console.log("The time it takes to run the parse_markdown(bigMarkdown) [RUST] function => ", comrakSpeed, "ms");
}
function runMarkedItTest() {
    console.log("**Inside the runMarkedItTest() function...**");
}

document.getElementById("testMarkedBtn").addEventListener("click", () => runMarkedTest());
