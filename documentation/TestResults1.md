# Markdown Compiler Benchmark Results - **Test Run #1**

Below are the benchmark results (in milliseconds) for the three Markdown compilers tested:
- **Comrak** — Rust-powered
- **Marked** — JavaScript-powered
- **Markdown-it** — JavaScript-powered

Each Unit Test was run for 100 iterations to remove any statistical bias resulting from "technical jitters" and such.

The specific tests and their contents can be found in the [**benchmark.js**](../utility/benchmark.js) file where they were programmatically defined (*perhaps I could have more formally defined them elsewhere, but that really wasn't the point of this project — which was just to observe some trends to justify a modification in a pre-existing project of mine*).

## Anyhow, the results for **Test Run #1** are as follows:
| Unit Test          | Comrak (RUST) | Marked (JS) | Markdown-it (JS) |
|--------------------|---------------|-------------|------------------|
| smallHeadingV1     | 0.03ms        | 0.04ms      | 0.05ms           |
| smallHeadingV2     | 0.04ms        | 0.05ms      | 0.08ms           |
| mediumHeading      | 0.14ms        | 0.15ms      | 0.18ms           |
| largeHeading       | 4.90ms        | 5.86ms      | 4.27ms           |
| smallParagraphs    | 0.02ms        | 0.02ms      | 0.03ms           |
| mediumParagraphs   | 0.28ms        | 0.70ms      | 0.28ms           |
| **largeParagraphs**    | 11.53ms       | 34.07ms     | 11.63ms          |
| smallBold          | 0.03ms        | 0.05ms      | 0.07ms           |
| mediumBold         | 0.27ms        | 0.47ms      | 0.40ms           |
| largeBold          | 7.77ms        | 13.29ms     | 8.80ms           |
| smallItalics       | 0.02ms        | 0.03ms      | 0.02ms           |
| mediumItalics      | 0.11ms        | 0.19ms      | 0.14ms           |
| largeItalics       | 4.20ms        | 6.72ms      | 4.80ms           |
| smallUnList        | 0.04ms        | 0.11ms      | 0.09ms           |
| mediumUnList       | 0.32ms        | 1.07ms      | 0.58ms           |
| largeUnList        | 11.46ms       | 42.23ms     | 19.11ms          |
| smallOrList        | 0.05ms        | 0.10ms      | 0.09ms           |
| mediumOrList       | 0.26ms        | 0.90ms      | 0.40ms           |
| largeOrList        | 15.35ms       | 56.01ms     | 32.93ms          |
| smallInlineCode    | 0.01ms        | 0.04ms      | 0.03ms           |
| mediumInlineCode   | 0.14ms        | 0.31ms      | 0.18ms           |
| **largeInlineCode**    | 7.66ms        | 583.88ms    | 16.11ms          |
| smallCodeBlock     | 0.01ms        | 0.02ms      | 0.03ms           |
| mediumCodeBlock    | 0.32ms        | 0.15ms      | 0.29ms           |
| largeCodeBlock     | 11.92ms       | 8.05ms      | 10.72ms          |
| smallLink          | 0.02ms        | 0.04ms      | 0.08ms           |
| mediumLink         | 0.22ms        | 0.64ms      | 0.81ms           |
| **largeLink**          | 8.25ms        | 718.44ms    | 42.01ms          |
| smallImage         | 0.02ms        | 0.04ms      | 0.07ms           |
| mediumImage        | 0.30ms        | 0.80ms      | 1.18ms           |
| largeImage         | 2.12ms        | 19.47ms     | 8.44ms           |
| smallBlockQ        | 0.01ms        | 0.04ms      | 0.03ms           |
| mediumBlockQ       | 0.16ms        | 0.30ms      | 0.33ms           |
| largeBlockQ        | 6.28ms        | 14.33ms     | 7.40ms           |
| smallBreaks        | 0.01ms        | 0.01ms      | 0.01ms           |
| mediumBreaks       | 0.14ms        | 0.06ms      | 0.16ms           |
| largeBreaks        | 6.19ms        | 1.83ms      | 7.62ms           |
| smallLine          | 0.01ms        | 0.01ms      | 0.01ms           |
| mediumLine         | 0.08ms        | 0.11ms      | 0.13ms           |
| largeLine          | 1.92ms        | 2.85ms      | 3.57ms           |
| smallMixed         | 0.04ms        | 0.06ms      | 0.04ms           |
| mediumMixed        | 0.62ms        | 1.24ms      | 0.69ms           |
| **largeMixed**         | 30.57ms       | 974.11ms    | 35.55ms          |
| smallEsc           | 0.02ms        | 0.04ms      | 0.04ms           |
| medEsc             | 0.19ms        | 0.99ms      | 0.24ms           |
| **largeEsc**           | 7.81ms        | 3719.53ms   | 12.04ms          |
| tableV1            | 0.06ms        | 0.12ms      | 0.10ms           |
| tableV2            | 0.04ms        | 0.06ms      | 0.06ms           |
| tableV3            | 0.06ms        | 0.08ms      | 0.12ms           |
| tableV4            | 0.04ms        | 0.05ms      | 0.05ms           |
| sampleMDFile       | 0.19ms        | 0.43ms      | 0.38ms           |

## Averaging the results:
- ### Comrak (RUST) Average Runtime: ~2.79ms
- ### Marked (JavaScript) Average Runtime: ~121.77ms
- ### Markdown-It (JavaScript) Average Runtime: ~4.56ms

### For [**Test Run #2 Results**](./TestResults2.md) and [**Test Run #3 Results**](./TestResults3.md).