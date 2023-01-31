import { States } from "../core/States.js";
import { Cell } from "../core/Cell.js";

test("Default cell is not burning", () => {
  expect(new Cell().isBurning).toBeFalsy();
});

test("Cell with FIRE state is burning", () => {
  expect(new Cell(States.FIRE).isBurning).toBeTruthy();
});

test("Cell with ASH state is not burning", () => {
  expect(new Cell(States.ASH).isBurning).toBeFalsy();
});

test("Set fire on a SAFE cell", () => {
  const cell = new Cell();
  cell.setState(States.FIRE);
  expect(cell.isBurning).toBeTruthy();
});

test("Set fire on an ASH cell doesn't work", () => {
  const cell = new Cell(States.ASH);
  expect(() => cell.setState(States.FIRE)).toThrow(Error);
});

test("Set an invalid state on a cell doesn't work", () => {
  const cell = new Cell();
  expect(() => cell.setState(-1)).toThrow(Error);
  expect(() => cell.setState(3)).toThrow(Error);
  expect(() => cell.setState("abc")).toThrow(Error);
});