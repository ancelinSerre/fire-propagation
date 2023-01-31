// States for a cell
export const States = {
  SAFE: 0,
  FIRE: 1,
  ASH: 2,

  getName(state) {
    switch(state) {
      case this.SAFE:
        return "safe";
      case this.FIRE:
        return "fire";
      case this.ASH:
        return "ash";
      default:
        throw new Error(`Given state is invalid: ${state}`);
    }
  }
};

