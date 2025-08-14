import init, { parse_markdown } from "../pkg/rust_wasm_markdown.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import MarkdownIt from "https://cdn.skypack.dev/markdown-it";

await init(); // NOTE: VERY IMPORTANT! Load and init WASM or else I won't be able to call any of the RUST functions!!!

const tests = {
    // 1. HEADING:
    smallHeadingV1: "# Small Heading",
    smallHeadingV2: "# Small Heading\n## Small Heading\n### Small Heading\n#### Small Heading\n##### Small Heading\n###### Small Heading", 
    /* ^ NOTE: Includes hard breaks which may affect RUST parser's speed -- RUST is normally *always* fastest excluding the occasion where
    the very first test ran has it the slowest, but in this instance, it comes in like 2nd place ~30-40% of the time which is odd (TO-DO: Definitely something to note in the README!) */
    mediumHeading: "# Heading\n" + ("### Heading\n".repeat(99)) + "##### Heading",
    largeHeading: "# Heading\n" + ("#### Heading\n".repeat(5000)) + "###### Heading",

    // 2. PARAGRAPHS (normal plain text separated by two line breaks):
    smallParagraphs: "ihavenomouthandimustscreamihavenomouthandimustscreamihavenomouthandimustscream\n\nihavenomouthandimustscreamihavenomouthandimustscreamihavenomouthandimustscream",
    mediumParagraphs: ("ihavenomouthandimustscreamihavenomouthandimustscreamihavenomouthandimustscream\n\nihavenomouthandimustscreamihavenomouthandimustscreamihavenomouthandimustscream".repeat(99)),
    largeParagraphs: ("ihavenomouthandimustscreamihavenomouthandimustscreamihavenomouthandimustscream\n\nihavenomouthandimustscreamihavenomouthandimustscreamihavenomouthandimustscream".repeat(5000)),
    
    // 3. BOLD:
    smallBold: "**bald**",
    mediumBold: ("**bald** ".repeat(100)),
    largeBold: ("**bald** ".repeat(5000)),

    // 4. ITALICS:
    smallItalics: "~~Squiggly Line~~",
    mediumItalics: ("~~Squiggly Line~~".repeat(100)),
    largeItalics: ("~~Squiggly Line~~".repeat(5000)),
    
    // 5. UNORDERED LIST:
    smallUnList: "- Whopper\n-Whopper\n-Whopper\n-Whopper\n-Flame-grilled Taste\n-Perfect Toppers\n-Lettuce\n-Mayo\n-Pickle\n-Ketchup",
    mediumUnList: ("- Whopper\n-Whopper\n".repeat(100)) + "- Whopper",
    largeUnList: ("- Whopper\n-Whopper\n".repeat(5000)) + "- Whopper",
    // 6. ORDERED LIST:
    smallOrList: "1. Un\n2. Deux\n3. Trois\n4. Quatre\n5. Cinq\n6. Six\n7. Sept\n8. Huit\n9. Neuf\n10. Dix",
    mediumOrList: ("1. Un\n2. Deux\n".repeat(100)) + "3. Trois",
    largeOrList: ("1. Un\n2. Deux\n".repeat(5000)) + "3. Trois",

    // 7. INLINE CODE (stuff like `code`, single-line code boxes):
    smallInlineCode: "Some `inline code` for testing.",
    mediumInlineCode: ("`const x = 42;` and then some.\n".repeat(100)),
    largeInlineCode: ("`const x = 46;` and then some.\n".repeat(5000)),

    // 8. CODE BLOCKS:
    smallCodeBlock: "```\nconsole.log('Hello World');\n```",
    mediumCodeBlock:
    ("```\n" +
    "function add(a, b) {\n" +
      " return a + b;\n" +
    "}\n" +
    "console.log(add(2, 3));\n" +
    "```\n\n").repeat(100),
    largeCodeBlock:
    ("```\n" +
    "for (let i = 0; i < 1000; i++) {\n" +
      " console.log(i);\n" +
    "}\n" +
    "```\n\n").repeat(5000),

    // 9. LINKS:
    smallLink: "[Link to Google](https://www.google.com/)",
    mediumLink: ("[Link to Google](https://www.google.com/) ".repeat(100)),
    largeLink: ("[Link to Google](https://www.google.com/) ".repeat(5000)),

    // 10. IMAGES (CLOUDINARY):
    smallLink: "![Image](https://res.cloudinary.com/dsduz3inl/image/upload/v1750292077/krusty_s5hekd.png)",
    mediumLink: ("![Image](https://res.cloudinary.com/dsduz3inl/image/upload/v1750292077/krusty_s5hekd.png) ".repeat(100)),
    largeLink:  ("![Image](https://res.cloudinary.com/dsduz3inl/image/upload/v1750292077/krusty_s5hekd.png) ".repeat(1000)),
    
    // 11. BLOCKQUOTES:
    smallBlockQ: "> ihavenomouthandimustscreamihavenomouthandimustscreamihavenomouthandimustscream",
    mediumBlockQ: ("> ihavenomouthandimustscreamihavenomouthandimustscreamihavenomouthandimustscream\n".repeat(100)) + "> ihavenomouthandimustscreamihavenomouthandimustscreamihavenomouthandimustscream",
    largeBlockQ: ("> ihavenomouthandimustscreamihavenomouthandimustscreamihavenomouthandimustscream\n".repeat(5000)) + "> ihavenomouthandimustscreamihavenomouthandimustscreamihavenomouthandimustscream",

    // 12. HARD BREAKS:
    smallBreaks: "text\ntext",
    mediumBreaks: ("text\ntext\n".repeat(100)) + "text",
    largeBreaks: ("text\ntext\n".repeat(5000)) + "text",

    // 13. LINE BREAKS:
    smallLine: "---",
    mediumBreaks: ("---\n".repeat(100)) + "---",
    largeBreaks: ("---\n".repeat(5000)) + "---",

    // 14. Mixed cases (and nested formatting):
    smallMixed: "> # **~~Bold Strikethrough~~** with `inline code` and *italics*",
    mediumMixed: ("**~~Bold Strikethrough~~** with `inline code` and *italics* ".repeat(100)),
    largeMixed: ("**~~Bold Strikethrough~~** with `inline code` and *italics* ".repeat(5000)),

    // 15. Escaped characters:
    smallEsc: "\\*not italics\\* \\*\\*not bold\\*\\*",
    medEsc: ("\\*not italics\\* \\*\\*not bold\\*\\* ".repeat(100)),
    largeEsc: ("\\*not italics\\* \\*\\*not bold\\*\\* ".repeat(5000)),

    // 16. Table:
    tableV1: "| Col A | Col B |\n|-------|-------|\n| 1     | 2     |\n| 3     | 4     |",
    tableV2: "| Left   | Center | Right |\n|--------|:------:|------:|\n| A      | B      | C     |\n| 10     | 20     | 30    |",
    tableV3: "| Feature      | Description            |\n|--------------|------------------------|\n| **Bold**     | Text in **bold**        |\n| *Italics*    | Text in *italics*       |\n| `Code`       | Inline `code` snippet   |\n| ~~Strike~~   | ~~Strikethrough~~ text  |",
    tableV4: "| Name | Age | Note |\n|------|-----|------|\n| John | 30  |      |\n| Ann  |     | N/A  |",

    // 17. Going to test a proper 
    sampleMDFile: 
    `# SAMPLE MARKDOWN FILE TEST:
    \nHere is some **bold text** and some *italic text*, and even **_bold italic text_** all together.
    \nWe can also mix in \`inline code\` like \`const x = 42;\` right in the sentence.
    \n---
    \n## Lists
    \n- **Bold list item**
    \n- *Italic list item*
    \n- A list with \`inline code\` inside
    \n- A [link to the Wikipedia page for Nicholas Winding Refn's 2013 Only God Forgives](https://en.wikipedia.org/wiki/Only_God_Forgives)
    \n
    \n1. Numbered **item one**
    \n2. Numbered _item two_
    \n3. Numbered with **\`bold inline code\`**
    \n## A TABLE
    \n| Header 1 | Header 2 | Header 3 |\n|---|---|---|\n| Content 1 | Content 2 | Content 3 |\n| Content 4 | Content 5 | Content 6 |
    \n---
    \n
    \n> This is a blockquote with **bold** and \`inline code\`.
    \n---
    \nHere’s **nested stuff**: *italic with \`inline code\`* inside the same sentence.
    \n**Code block with JS**:
    \n\`\`\`
    \nfunction greet(name) {
    \n    console.log("Me name is ", name);
    \n}
    \ngreet("Markdown");\n\`\`\`\n
    \n---
    `,
}

function runParsers(mdText) {
    let startC = performance.now();
    const htmlOutput = parse_markdown(mdText); // Comrak will be used for the parsing, but I'm also going to record the time it took.
    let comrakSpeed = performance.now() - startC;
    document.getElementById("renderBox").innerHTML = htmlOutput;

    /* comrakSpeed will hold the ms speed it took for Comrak to compile the markdown code.
    Under the render panel, I'm going to have text that appears showing how long it for Comrak to render the
    markdown as opposed to marked and markdown-it (two JS-powered markdown parsers). */
    function getRenderTime(func) {
        const start = performance.now();
        let _ = func(); // For complete "apples-to-apples" fairness, I will assign the JS parser results to a var (to be discarded) since I do that with Comrak (and this adds a very tiny overhead).
        return performance.now() - start;
    }

    // Testing marked (JS):
    marked.use({mangle: false, headerIds: false});  // Configurations to strip away any extra processing.
    let markedSpeed = getRenderTime(() => marked(mdText));

    // Testing markdown-it (JS):
    const mdParser = new MarkdownIt({html: false, linkify: false, typographer: false}); // W/ Configurations to strip away any extra processing.
    let markdownItSpeed = getRenderTime(() => mdParser.render(mdText));

    let returnRes = {
        parsedHtml: htmlOutput,
        comrakS: comrakSpeed,
        markedS: markedSpeed,
        markdownItS: markdownItSpeed,
    };
    return returnRes;
}

// Event listener for the renderBtn:
document.getElementById("renderBtn").addEventListener("click", () => {
    // Just for simply rendering whatever Markdown text is currently present in the LHS box into the RHS box (render panel):
    const mdInput = document.getElementById("markdownInput").value;
    let results = runParsers(mdInput);
    document.getElementById("renderBox").innerHTML = results.parsedHtml;

    /* Manually assigning variables (tedious and arbitrary but mostly because the contents of func "runParsers" was originally
    all in this event listener, and I was too lazy to change the contents of renderPanelInfo after modularizing). */
    let comrakSpeed = results.comrakS;
    let markedSpeed = results.markedS;
    let markdownItSpeed = results.markdownItS;
    let comrakSpeedR = comrakSpeed.toFixed(2);
    let markedSpeedR = markedSpeed.toFixed(2);
    let markdownItSpeedR = markdownItSpeed.toFixed(2);

    const renderPanelInfo = `|<b>[RUST] Comrak Speed:</b> ${comrakSpeedR}<b>ms</b> (${comrakSpeed})<br>|<b>[JS] marked Speed:</b> ${markedSpeedR}<b>ms</b> (${markedSpeed})<br>|<b>[JS] markdown-it Speed:</b> ${markdownItSpeedR}<b>ms</b> (${markdownItSpeed})`;
    document.getElementById("renderBoxInfo").innerHTML = renderPanelInfo;
});

// Event listener for the benchmarksBtn:
document.getElementById("benchmarksBtn").addEventListener("click", () => {
    const runCount = 100;
    const results = [];
    for(const [testName, mdText] of Object.entries(tests)) {
        /* TO-DO: Going to want to make it so that each testName will be clickable and when you click it,
        it'll insert the mdText of that Unit Test into the Markdown Input Box. (Not sure if "mdText" will be useful for that - probably?) */

        let comrakTimes = [];
        let markedTimes = [];
        let markdownItTimes = [];
        // Warm-up run (JIT & WASM initialization).
        runParsers(mdText);
        // Going to have each parser run the test 100 times (and this will then be averaged out later).
        for(let i = 0; i < runCount; i++) {
            let res = runParsers(mdText);
            comrakTimes.push(res.comrakS);
            markedTimes.push(res.markedS);
            markdownItTimes.push(res.markdownItS);
        }
        // Averaging the results:
        const avg = arr => arr.reduce((a,b) => a+b, 0) / arr.length;
        results.push({
            testName: testName,
            comrakSpeed: avg(comrakTimes).toFixed(2),
            markedSpeed: avg(markedTimes).toFixed(2),
            markdownItSpeed: avg(markdownItTimes).toFixed(2),
        });
    }

    let resTable =
    `<table>
        <thead>
        <tr>
            <th>Unit Test</th>
            <th>Comrak (RUST)</th>
            <th>Marked (JS)</th>
            <th>MarkdownIt (JS)</th>
        </tr>
    </thead>
    <tbody>`;

    for(const res of results) {
        resTable +=
        `<tr>
            <td>${res.testName}</td>
            <td>${res.comrakSpeed}<b>ms</b></td>
            <td>${res.markedSpeed}<b>ms</b></td>
            <td>${res.markdownItSpeed}<b>ms</b></td>
        </tr>`;
    }
    resTable += `</tbody></table>`;
    document.getElementById("bmResWrapper").innerHTML = resTable;
});
