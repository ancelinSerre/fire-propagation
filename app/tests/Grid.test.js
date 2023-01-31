import { States } from "../core/States";
import { Grid } from "../core/Grid";

function simulateTest(forest) {
  let i = 0;
  while (forest.isBurning) {
    forest.step();
    i++;
  }
}

test("Grid with one cell, fire starts at (0, 0), prob 1", () => {
  const grid = new Grid(1, 1, 1, [[0, 0]]);

  expect(grid.cells.length).toEqual(1);
  expect(grid.getCell(0, 0).isBurning).toBeTruthy();

  simulateTest(grid);

  expect(grid.getCell(0, 0).isBurning).toBeFalsy();
  expect(grid.isBurning).toBeFalsy();
  expect(grid.getCell(0, 0).state).toEqual(States.ASH);
});

// Corner test
test("Grid with 4 cells, fire starts at (0,0), prob 1", () => {
  const grid = new Grid(2, 2, 1, [[0, 0]]);

  expect(grid.cells.length).toEqual(2);
  expect(grid.cells[0].length).toEqual(2);
  expect(grid.isBurning).toBeTruthy();
  expect(grid.getCell(0, 0).isBurning).toBeTruthy();

  simulateTest(grid);

  expect(grid.getCell(0, 0).isBurning).toBeFalsy();
  expect(grid.getCell(0, 0).state).toEqual(States.ASH);
  expect(grid.isBurning).toBeFalsy();
});

// Middle test
test("Grid with 9 cells, fire starts at (1, 1), prob 1", () => {
  const grid = new Grid(3, 3, 1, [[1, 1]]);
  grid.step();
  expect(grid.getCell(0,1).isBurning).toBeTruthy();
  expect(grid.getCell(2,1).isBurning).toBeTruthy();
  expect(grid.getCell(1,0).isBurning).toBeTruthy();
  expect(grid.getCell(1,2).isBurning).toBeTruthy();
  expect(grid.getCell(1,1).isBurning).toBeFalsy();
});

// Border middle test
test("Grid with 9 cells, fire starts at (1, 0), prob 1", () => {
  const grid = new Grid(3, 3, 1, [[1, 0]]);
  grid.step();
  expect(grid.getCell(0,0).isBurning).toBeTruthy();
  expect(grid.getCell(2,0).isBurning).toBeTruthy();
  expect(grid.getCell(1,1).isBurning).toBeTruthy();
  expect(grid.getCell(1,0).isBurning).toBeFalsy();
  simulateTest(grid);
});

