import os
import glob
from pathlib import Path

import pandas as pd
import matplotlib.pyplot as plt

INPUT_DIR = Path("./repTests")
OUTPUT_DIR = Path("./genPlots")
SVG_DPI = 300
FIGSIZE = (8, 5)

def make_plot_from_csv(csv_path: Path, out_dir: Path):
    df = pd.read_csv(csv_path)
    # x-axis is for input size:
    x_raw = df.iloc[:, 0].astype(str).str.strip()
    x_labels = list(x_raw)
    x_positions = list(range(len(x_labels)))

    # y-axis is for the parser runtime columns:
    parser_cols = df.columns[1:]
    # convert columns to numeric (in case there are stray spaces)
    for col in parser_cols:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    # Plot
    plt.figure(figsize=FIGSIZE)
    for col in parser_cols:
        plt.plot(x_positions, df[col].values, marker="o", label=col)

    plt.xticks(x_positions, x_labels)
    plt.xlabel("Input Size")
    plt.ylabel("Runtime (ms)")
    plt.title(f"Scaling: {csv_path.stem}")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()

    out_file = out_dir / f"{csv_path.stem}.svg"
    plt.savefig(out_file, dpi=SVG_DPI, format="svg")
    plt.close()
    print(f"Saved: {out_file}")

def main():
    # Ensure input directory exists
    if not INPUT_DIR.exists() or not INPUT_DIR.is_dir():
        print(f"Input directory '{INPUT_DIR}' not found.")
        return

    # Find CSV files
    csv_files = sorted(INPUT_DIR.glob("*.csv"))
    if not csv_files:
        print(f"No CSV files found in {INPUT_DIR}. (Stuff like: 'paragraphsTest.csv').")
        return
    
    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Process each CSV
    for csv_path in csv_files:
        try:
            make_plot_from_csv(csv_path, OUTPUT_DIR)
        except Exception as e:
            print(f"Error processing {csv_path.name}: {e}")

if __name__ == "__main__":
    main()
