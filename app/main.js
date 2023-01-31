import { Grid } from "./core/Grid.js";
import { States } from "./core/States.js";

let config = null;

// Refresh HTML table content
function refreshTable(forest) {
  let tableRef = document.getElementById("forest");
  tableRef.innerHTML = "";
  for (let row = 0; row < config.height; row++) {
    let rowTmp = tableRef.insertRow(row);
    for (let col = 0; col < config.width; col++) {
      let currentCell = forest.getCell(row, col);
      let cellTmp = rowTmp.insertCell(col);
      cellTmp.classList.add(States.getName(currentCell.state));
    }
  }
}

// Start fire propagation simulation
function simulateHTML(forest) {
  let i = 0;
  let stepText = document.getElementById("step");

  function loop() {
    setTimeout(function () {
      stepText.textContent = `Step ${i}`;
      refreshTable(forest);
      forest.step();
      i++;
      if (forest.isBurning) {
        loop();
      } else {
        stepText.textContent = "Final step";
        refreshTable(forest);
      }
    }, 1000);
  }
  loop();
}

// HTML Elements
const inputFile = document.getElementById("configFile");
const inputLabel = document.getElementById("inputLabel");
const startBtn = document.getElementById("startSim");

// Input on change listener
inputFile.addEventListener("change", (event) => {
  const file = event.target.files[0];
  inputLabel.textContent = file.name;
  const reader = new FileReader();
  reader.addEventListener("load", function (event) {
    config = JSON.parse(event.target.result);
  });
  reader.readAsText(file);
  startBtn.disabled = false;
});

// Button start simulation on click listener
startBtn.addEventListener("click", () => {
  if (config !== null) {
    // Change text content
    startBtn.textContent = "Restart simulation";
    // Create a new forest
    let { height, width, prob, fireStarters } = config;
    let forest = new Grid(height, width, prob, fireStarters);
    simulateHTML(forest);
  }
});
