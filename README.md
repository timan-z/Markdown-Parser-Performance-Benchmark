## Findings
Comrak (Rust-WASM) is consistently fast, particularly at scale.
- For <b>small inputs</b>, Comrak generally comes ahead of the others, but the difference is a matter of microseconds so there is no meaningful difference to humans.
- For <b>large inputs</b>, Comrak is often <b>3-50x faster</b> (especially for the "large" inputs) than marked, and is often slightly faster or tied with markdown-it.

Some extreme examples of the above can be seen:
- Unit Test:`largeMixed`: Comrak <b>30.57ms</b> vs marked <b>974.11ms</b> vs markdown-it <b>35.55ms</b>
- Unit Test:`largeEsc`: Comrak <b>7.81ms</b> vs marked <b>3719.53ms</b>	vs markdown-it <b>12.04ms</b>
- Unit Test:`largeParagraphs`: Comrak <b>11.53ms</b> vs marked <b>34.07ms</b> vs markdown-it <b>11.63ms</b>

Markdown-it is much more competitive than marked.
- Markdown-it generally stays within ~10–30% of Comrak’s times.
- Sometimes it’s even faster on medium-sized inputs (e.g., mediumCodeBlock).
- However, Comrak still tends to win in huge-scale scenarios.

Marked shows catastrophic slowdowns on certain input types (largeMixed, largeEscape, largeLink, largeInlineCode, largeParagraphs).

Reasons may be the following:
[This is what GPT suspects I have no idea if there's anything to it -- figure out later]
******************************************************************************************
1. Large Escaped Text (largeEsc)

String: \*not italics\* \*\*not bold\*\* repeated 5000×.

Escapes mean the parser has to decide whether something is literal or formatting.

In regex-heavy parsers like Marked, escape sequences often require lookbehinds/lookaheads or repeated backtracking.

Because this is repeated thousands of times, Marked’s regex engine is probably matching and failing over and over in a worst-case backtracking pattern.

This explains why it’s 3.7 seconds vs Comrak’s 7 ms.

2. Large Mixed (largeMixed)

String: combinations of bold, strikethrough, inline code, italics — repeated 5000×.

This pattern forces Marked to re-run multiple inline parsing passes on the same text chunks, because each style can nest or overlap.

Regex engines here can get stuck in a “try all combinations” situation.

Markdown-It and Comrak are both tokenizing, so they escape the combinatorial explosion.

3. Large Inline Code (largeInlineCode)

String: `const x = 46;` and then some. repeated 5000×.

Inline code in Marked uses regex to find matching backticks.

If the parser’s regex isn’t well-anchored or is too permissive, it can scan the entire remaining text multiple times looking for matches, instead of short-circuiting.

4. Large Link (largeLink)

String: [Link to Google](https://www.google.com/) repeated 5000×.

Parsing Markdown links with regex is notoriously tricky because URLs can contain parentheses, brackets, escapes, etc.

Marked probably tries multiple matching strategies before locking in a result, leading to quadratic or worse time complexity here.

5. Large Paragraphs (largeParagraphs)

Giant paragraphs mean Marked’s inline parser runs over a massive contiguous text block without breaks, applying every possible inline-matching regex.

Unlike Comrak and Markdown-It (which break text into tokens early), Marked is likely re-scanning the same region for each inline element type.

General Cause

All these failures point to catastrophic regex backtracking from:

Complex patterns that aren’t anchored.

Nested parsing requiring repeated regex passes.

Large inputs without “short-circuit” tokenization.

Rust Comrak → Uses a handwritten parser + AST building (no catastrophic regex).
Markdown-It → Uses a state machine + tokenization, also avoiding bad regex traps.
Marked → Mostly regex-driven inline parsing, making it vulnerable to these pathological patterns.
******************************************************************************************





## Testing Methodology:

I test each category of markdown formatting (bold, italics, headers, lists, and so on) in their isolated unit tests varying sizes (small, medium, and large). The idea that we can have like single-line markdown (e.g., smallHeadingV1 = "# Small Heading") would be equivalent to a small .md file of ~1kb or however much, then a markdown that's repeated for ~100 lines might be equivalent to a medium sized ~100kb file. Lastly, perhaps a little extreme, there would be a markdown repeated for ~5000 lines could constitute a large ~>1mb file.

Instead of running and timing each Unit Test once, I decided to run 100 iterations of each test and then average out the time it takes for each parser to parse the Markdown (timed in miliseconds). Of course, the aim in doing this is to reduce as much statistical bias and "noise" in the results as possible. Granted, I must admit that I take this logic to an extreme as I *still* do this for "large"-sized unit tests where I parse input that is 5000 lines in length. This causes the benchmark testing to be quite long (~10 minutes) but I maintain this principle to uphold statistical integrity (also the fact this whole project exists literally just for research, to examine the data we get from these many tests).
^ Compensates for:
- any jitters with `performance.now()`, which is what I'm using to measure execution time in ms.


My event listener for the "benchmarksBtn" button is the single-go benchmark runner (that'll loop through all the test cases, run all three markdown parsers and record the average time over 100 runs per test, including the large-sized ones).

Again, the data extracted is what's important here. I put next to no thought in the UI of the .html page, it is just a means to an end to obtain the data and it didn't matter to me that the benchmarks run could take incredibly long (~10 minutes).

## Other things to note:

- markdown-it tends to be much faster than marked, which was surprising. (expand on why later).

## Making benchmarking as fair as possible:

I disabled unnecessary features in both the marked and markdown-it parsers to make the benchmarking as fair as possible:
```
marked.use({mangle: false, headerIds: false});
...
const mdParser = new MarkdownIt({html: false, linkify: false, typographer: false});
```

This is neglible, but when doing `const htmlOutput = parse_markdown(mdInput);` it adds an extremely tiny amount of overhead to the runtime and to compensate for that, I assigned and discarded the JavaScript parser results with the `_` character:
```
let _ = marked(mdInput);
let _ = mdParser.render(mdInput);
```

I run an initial test of the Comrak parser prior to every unit test to make up for potential WASM warm-up:
```
// Warm-up run (JIT & WASM initialization).
runParsers(mdText);
```
For fairness, I always run the parsers in the same order (Comrak -> marked -> markdown-it)