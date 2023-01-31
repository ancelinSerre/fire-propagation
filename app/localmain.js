import { readFileSync } from "fs";
import { Grid } from "./core/Grid.js";

// Load config file
const loadJSON = (path) =>
  JSON.parse(readFileSync(new URL(path, import.meta.url)));
const { height, width, prob, fireStarters } = loadJSON("./config.json");

function simulateConsole(forest) {
  let i = 0;
  console.log("0 = Safe; 1 = Fire; 2 = Ash");
  console.log(`Step ${i}:\n----`);
  console.log(forest.toString());
  while (forest.isBurning) {
    forest.step();
    i++;
    console.log(`Step ${i}:\n----`);
    console.log(forest.toString());
  }
}

let forest = new Grid(height, width, prob, fireStarters);
simulateConsole(forest);