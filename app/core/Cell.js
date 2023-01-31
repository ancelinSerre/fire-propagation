import { States } from "./States.js";

export class Cell {
  constructor(state = States.SAFE) {
    this.setState(state);
  }

  get isBurning() {
    return this.state === States.FIRE;
  }

  setState(state) {
    // Check if state is valid
    if (state >= 0 && state < 3) {
      // Prevent setting fire to an already burned cell
      if (state === States.FIRE && this.state === States.ASH) {
        throw new Error("This cell has already burnt");
      }
      this.state = state;
    } else {
      throw new Error(`Given state is invalid: ${state}`);
    }
  }

  toString() {
    return this.state;
  }
}
