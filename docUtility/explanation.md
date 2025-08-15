# WHAT'S THIS `/docUtility` FOLDER FOR???
So this `/docUtility` folder is just a place to hold some files that assisted in writing the `README.md` (in order words, my "***findings report***").

I wanted to embed rough plottings of the scaling behavior that could identified between the parsers within the `.md` file to further punctuate my stated findings:
- namely to illustrate **Comrak**'s linear growth across varying input sizes and its consistently faster speed than the competitive **markdown-it**, not to also mention the tests in which **marked** yields catasrophic results.

You can do this with `.svg` files so I decided to write a Python file `plot_parser_charts.py` to create a Line Chart(s) in `.svg` form for select representative tests.
Tests were chosen to illustrate the aforementioned *observed* findings: 
1. That **Comrak**'s growth across increasing input sizes would be linear.
2. That **markdown-it** would be similar but steeper. 
3. That **marked** would be close to markdown-it until select cases where it would "spike".

And so the following tests were chosen: **Paragraphs**, **Bold**, **Lists**, and **Mixed** (Case). Each unit test would come in three forms (of input size small, medium, and large), these input sizes would constitute the x-axis metric whereas the y-axis would be the runtime of each parser in ms.
- For brevity — and given that they each illustrate the same idea — I will be using [**Test Results #1**](../documentation/TestResults1.md) as the reference point for values used.
- `.csv` files containing the data for each set of unit tests can be found in the `/repTests` directory, they are all of the same form (and `plot_parser_chart.py` will hydrate Line Chart `.svg` files using each of them):
```
Input Size, Comrak (RUST) Avg Time (ms), Marked (JS) Avg Time (ms), Markdown-It (JS) Avg Time (ms)
small, 0.03, 0.05, 0.07
medium, 0.27, 0.47, 0.40
large, 7.77, 13.29, 8.80
```

The generated `.svg` files can found in `/genPlots`, with saved ones that will be referenced in the `README.md` isolated in `/savedPlots` (as you will be able to see from the "closer ones", markdown-it and Comrak are often rather competitive — granted, it's a difference of miliseconds and Comrak *is* typically the faster of the two).
