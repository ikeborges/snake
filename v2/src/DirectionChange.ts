import Direction from "./Direction";
import Position from "./Position";

class DirectionChange {
  constructor(private direction: Direction, private position: Position) {}

  getPosition() {
    return this.position;
  }

  getDirection() {
    return this.direction;
  }
}

export default DirectionChange;
