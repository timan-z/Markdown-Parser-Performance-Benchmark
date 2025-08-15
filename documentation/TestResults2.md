# Markdown Compiler Benchmark Results - **Test Run #2**

Below are the benchmark results (in milliseconds) for the three Markdown compilers tested:
- **Comrak** — Rust-powered
- **Marked** — JavaScript-powered
- **Markdown-it** — JavaScript-powered

Each Unit Test was run for 100 iterations to remove any statistical bias resulting from "technical jitters" and such.

The specific tests and their contents can be found in the [**benchmark.js**](../utility/benchmark.js) file where they were programmatically defined (*perhaps I could have more formally defined them elsewhere, but that really wasn't the point of this project — which was just to observe some trends to justify a modification in a pre-existing project of mine*).

## Anyhow, the results for **Test Run #2** are as follows:
| Unit Test          | Comrak (RUST) | Marked (JS) | Markdown-it (JS) |
|--------------------|---------------|-------------|------------------|
| smallHeadingV1     | 0.02ms        | 0.06ms      | 0.05ms           |
| smallHeadingV2     | 0.04ms        | 0.04ms      | 0.07ms           |
| mediumHeading      | 0.15ms        | 0.16ms      | 0.16ms           |
| largeHeading       | 5.76ms        | 7.88ms      | 5.27ms           |
| smallParagraphs    | 0.02ms        | 0.04ms      | 0.03ms           |
| mediumParagraphs   | 0.38ms        | 0.96ms      | 0.38ms           |
| **largeParagraphs**    | 15.88ms       | 44.15ms     | 16.07ms          |
| smallBold          | 0.02ms        | 0.02ms      | 0.04ms           |
| mediumBold         | 0.24ms        | 0.45ms      | 0.34ms           |
| largeBold          | 9.19ms        | 17.19ms     | 10.50ms          |
| smallItalics       | 0.02ms        | 0.02ms      | 0.02ms           |
| mediumItalics      | 0.10ms        | 0.19ms      | 0.14ms           |
| largeItalics       | 4.59ms        | 7.19ms      | 5.09ms           |
| smallUnList        | 0.03ms        | 0.08ms      | 0.06ms           |
| mediumUnList       | 0.30ms        | 1.01ms      | 0.54ms           |
| largeUnList        | 11.32ms       | 43.78ms     | 18.77ms          |
| smallOrList        | 0.06ms        | 0.18ms      | 0.13ms           |
| mediumOrList       | 0.34ms        | 1.21ms      | 0.55ms           |
| largeOrList        | 13.34ms       | 56.53ms     | 31.17ms          |
| smallInlineCode    | 0.02ms        | 0.05ms      | 0.04ms           |
| mediumInlineCode   | 0.19ms        | 0.45ms      | 0.27ms           |
| **largeInlineCode**    | 6.90ms        | 588.07ms    | 12.31ms          |
| smallCodeBlock     | 0.01ms        | 0.02ms      | 0.02ms           |
| mediumCodeBlock    | 0.39ms        | 0.18ms      | 0.29ms           |
| largeCodeBlock     | 13.81ms       | 8.73ms      | 12.56ms          |
| smallLink          | 0.02ms        | 0.03ms      | 0.07ms           |
| mediumLink         | 0.21ms        | 0.64ms      | 0.80ms           |
| **largeLink**          | 8.20ms        | 715.13ms    | 36.99ms          |
| smallImage         | 0.02ms        | 0.04ms      | 0.07ms           |
| mediumImage        | 0.27ms        | 0.70ms      | 0.96ms           |
| largeImage         | 2.66ms        | 21.43ms     | 9.75ms           |
| smallBlockQ        | 0.01ms        | 0.03ms      | 0.03ms           |
| mediumBlockQ       | 0.18ms        | 0.38ms      | 0.42ms           |
| largeBlockQ        | 7.08ms        | 15.32ms     | 8.58ms           |
| smallBreaks        | 0.01ms        | 0.01ms      | 0.02ms           |
| mediumBreaks       | 0.14ms        | 0.05ms      | 0.17ms           |
| largeBreaks        | 6.89ms        | 2.20ms      | 8.39ms           |
| smallLine          | 0.01ms        | 0.02ms      | 0.02ms           |
| mediumLine         | 0.11ms        | 0.23ms      | 0.24ms           |
| largeLine          | 2.01ms        | 2.74ms      | 3.81ms           |
| smallMixed         | 0.03ms        | 0.06ms      | 0.05ms           |
| mediumMixed        | 0.58ms        | 1.19ms      | 0.64ms           |
| largeMixed         | 30.78ms       | 946.44ms    | 32.95ms          |
| smallEsc           | 0.02ms        | 0.03ms      | 0.03ms           |
| medEsc             | 0.24ms        | 1.26ms      | 0.29ms           |
| **largeEsc**           | 8.26ms        | 3737.29ms   | 14.35ms          |
| tableV1            | 0.04ms        | 0.06ms      | 0.07ms           |
| tableV2            | 0.03ms        | 0.06ms      | 0.08ms           |
| tableV3            | 0.04ms        | 0.09ms      | 0.12ms           |
| tableV4            | 0.03ms        | 0.05ms      | 0.04ms           |
| sampleMDFile       | 0.19ms        | 0.41ms      | 0.32ms           |

## Averaging the results:
- ### Comrak (RUST) Average Runtime: ~2.96ms
- ### Marked (JavaScript) Average Runtime: ~122.05ms
- ### Markdown-It (JavaScript) Average Runtime: ~4.59ms

### For [**Test Run #1 Results**](./TestResults1.md) and [**Test Run #3 Results**](./TestResults3.md).