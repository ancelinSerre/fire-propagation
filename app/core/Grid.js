import { Cell } from "./Cell.js";
import { States } from "./States.js";

export class Grid {
  constructor(height, width, probFire, fireStarters) {
    this.height = height;
    this.width = width;
    this.probFire = probFire;

    // Init grid (2D array)
    this.cells = new Array(this.height)
      .fill()
      .map(() => new Array(this.width).fill().map(() => new Cell()));

    // Start fire on some cells
    fireStarters.forEach((coordinates) => {
      this.setCell(coordinates[0], coordinates[1], States.FIRE);
    });
  }

  get isBurning() {
    return this.cells.some((row) => row.some((cell) => cell.isBurning));
  }

  getCell(x, y) {
    // Check if we are within bounds
    if (x >= 0 && x < this.height && y >= 0 && y < this.width) {
      return this.cells[x][y];
    } else {
      throw new Error(
        `Given coordinates are not within bounds [${this.height}, ${this.width}]`
      );
    }
  }

  setCell(x, y, state) {
    let cell = this.getCell(x, y);
    cell.setState(state);
  }

  step() {
    // Prepare next grid
    let nextGrid = this.cells.map((row) =>
      row.map((cell) => new Cell(cell.state))
    );

    // Loop on the grid
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.getCell(row, col).isBurning) {
          nextGrid[row][col].setState(States.ASH);

          // Top cell
          if (row > 0) {
            let top = nextGrid[row - 1][col];
            if (top.state !== States.ASH && Math.random() <= this.probFire) {
              top.setState(States.FIRE);
            }
          }

          // Bottom cell
          if (row < this.height - 1 && Math.random() <= this.probFire) {
            let bottom = nextGrid[row + 1][col];
            if (bottom.state !== States.ASH) {
              bottom.setState(States.FIRE);
            }
          }

          // Left cell
          if (col > 0) {
            let left = nextGrid[row][col - 1];
            if (left.state !== States.ASH && Math.random() <= this.probFire) {
              left.setState(States.FIRE);
            }
          }

          // Right cell
          if (col < this.width - 1) {
            let right = nextGrid[row][col + 1];
            if (right.state !== States.ASH && Math.random() <= this.probFire) {
              right.setState(States.FIRE);
            }
          }
        }
      }
    }
    this.cells = nextGrid;
  }

  toString() {
    let repr = "";
    for (let row = 0; row < this.height; row++) {
      repr += this.cells[row].join(", ") + "\n";
    }
    return repr;
  }
}
