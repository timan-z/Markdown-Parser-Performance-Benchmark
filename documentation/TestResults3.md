# Markdown Compiler Benchmark Results - **Test Run #3**

Below are the benchmark results (in milliseconds) for the three Markdown compilers tested:
- **Comrak** — Rust-powered
- **Marked** — JavaScript-powered
- **Markdown-it** — JavaScript-powered

Each Unit Test was run for 100 iterations to remove any statistical bias resulting from "technical jitters" and such.

The specific tests and their contents can be found in the [**benchmark.js**](../utility/benchmark.js) file where they were programmatically defined (*perhaps I could have more formally defined them elsewhere, but that really wasn't the point of this project — which was just to observe some trends to justify a modification in a pre-existing project of mine*).

## Anyhow, the results for **Test Run #3** are as follows:
| Unit Test          | Comrak (RUST) | Marked (JS) | Markdown-it (JS) |
|--------------------|---------------|-------------|------------------|
| smallHeadingV1     | 0.02ms        | 0.03ms      | 0.03ms           |
| smallHeadingV2     | 0.03ms        | 0.03ms      | 0.05ms           |
| mediumHeading      | 0.15ms        | 0.14ms      | 0.13ms           |
| largeHeading       | 4.82ms        | 5.67ms      | 4.24ms           |
| smallParagraphs    | 0.02ms        | 0.03ms      | 0.03ms           |
| mediumParagraphs   | 0.27ms        | 0.72ms      | 0.29ms           |
| **largeParagraphs**    | 12.44ms       | 34.41ms     | 12.82ms          |
| smallBold          | 0.02ms        | 0.02ms      | 0.03ms           |
| mediumBold         | 0.17ms        | 0.30ms      | 0.22ms           |
| largeBold          | 7.48ms        | 13.97ms     | 8.52ms           |
| smallItalics       | 0.03ms        | 0.03ms      | 0.03ms           |
| mediumItalics      | 0.11ms        | 0.17ms      | 0.13ms           |
| largeItalics       | 4.12ms        | 6.66ms      | 4.80ms           |
| smallUnList        | 0.04ms        | 0.07ms      | 0.06ms           |
| mediumUnList       | 0.26ms        | 0.88ms      | 0.44ms           |
| largeUnList        | 10.94ms       | 44.34ms     | 19.31ms          |
| smallOrList        | 0.02ms        | 0.08ms      | 0.06ms           |
| mediumOrList       | 0.28ms        | 0.94ms      | 0.43ms           |
| largeOrList        | 11.79ms       | 47.26ms     | 26.43ms          |
| smallInlineCode    | 0.01ms        | 0.05ms      | 0.03ms           |
| mediumInlineCode   | 0.18ms        | 0.37ms      | 0.22ms           |
| **largeInlineCode**    | 7.11ms        | 538.78ms    | 12.36ms          |
| smallCodeBlock     | 0.01ms        | 0.02ms      | 0.02ms           |
| mediumCodeBlock    | 0.32ms        | 0.14ms      | 0.23ms           |
| largeCodeBlock     | 12.17ms       | 8.45ms      | 9.53ms           |
| smallLink          | 0.02ms        | 0.03ms      | 0.07ms           |
| mediumLink         | 0.20ms        | 0.61ms      | 0.77ms           |
| **largeLink**          | 10.52ms       | 811.31ms    | 45.99ms          |
| smallImage         | 0.10ms        | 0.10ms      | 0.17ms           |
| mediumImage        | 0.79ms        | 1.62ms      | 2.41ms           |
| largeImage         | 3.95ms        | 30.18ms     | 17.76ms          |
| smallBlockQ        | 0.04ms        | 0.07ms      | 0.06ms           |
| mediumBlockQ       | 0.21ms        | 0.40ms      | 0.55ms           |
| largeBlockQ        | 10.50ms       | 18.68ms     | 11.48ms          |
| smallBreaks        | 0.03ms        | 0.02ms      | 0.02ms           |
| mediumBreaks       | 0.16ms        | 0.07ms      | 0.20ms           |
| largeBreaks        | 10.10ms       | 3.12ms      | 18.25ms          |
| smallLine          | 0.01ms        | 0.01ms      | 0.03ms           |
| mediumLine         | 0.08ms        | 0.12ms      | 0.18ms           |
| largeLine          | 2.11ms        | 3.11ms      | 4.47ms           |
| smallMixed         | 0.02ms        | 0.04ms      | 0.03ms           |
| mediumMixed        | 0.51ms        | 1.00ms      | 0.53ms           |
| largeMixed         | 46.19ms       | 1279.38ms   | 51.15ms          |
| smallEsc           | 0.02ms        | 0.04ms      | 0.03ms           |
| medEsc             | 0.17ms        | 1.04ms      | 0.24ms           |
| **largeEsc**           | 7.60ms        | 3483.86ms   | 12.20ms          |
| tableV1            | 0.02ms        | 0.04ms      | 0.05ms           |
| tableV2            | 0.03ms        | 0.03ms      | 0.05ms           |
| tableV3            | 0.04ms        | 0.07ms      | 0.09ms           |
| tableV4            | 0.03ms        | 0.03ms      | 0.04ms           |
| sampleMDFile       | 0.12ms        | 0.24ms      | 0.23ms           |

## Averaging the results:
- ### Comrak (RUST) Average Runtime: ~3.26ms
- ### Marked (JavaScript) Average Runtime: ~124.29ms
- ### Markdown-It (JavaScript) Average Runtime: ~5.24ms

### For [**Test Run #1 Results**](./TestResults1.md) and [**Test Run #2 Results**](./TestResults2.md).