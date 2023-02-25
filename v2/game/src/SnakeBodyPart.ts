import Direction from "./Direction";
import GameSettings from "./GameSettings";
import Position from "./Position";

class SnakeBodyPart {
  constructor(private position: Position, private direction: Direction) {}

  getPosition() {
    return this.position;
  }

  getDirection() {
    return this.direction;
  }

  turnTo(direction: Direction) {
    this.direction = direction;
  }

  moveOneStep() {
    // The Y axis in canvas is upside down, so to go up we need to subtract from Y
    switch (this.direction) {
      case Direction.UP:
        this.position.y -= 1;
        break;
      case Direction.DOWN:
        this.position.y += 1;
        break;
      case Direction.LEFT:
        this.position.x -= 1;
        break;
      case Direction.RIGHT:
        this.position.x += 1;
        break;
    }
  }
}

export default SnakeBodyPart;
