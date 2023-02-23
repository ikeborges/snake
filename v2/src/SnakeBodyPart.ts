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
    const HEIGHT_IN_BLOCKS =
      GameSettings.FRAME_HEIGHT / GameSettings.BLOCK_SIZE;
    const WIDTH_IN_BLOCKS = GameSettings.FRAME_WIDTH / GameSettings.BLOCK_SIZE;

    const lastYPosition = HEIGHT_IN_BLOCKS - 1;
    const lastXPosition = WIDTH_IN_BLOCKS - 1;

    // The Y axis in canvas is upside down, so to go up we need to subtract from Y
    switch (this.direction) {
      case Direction.UP:
        if (this.position.y === 0) this.position.y = lastYPosition;
        else this.position.y -= 1;

        break;
      case Direction.DOWN:
        if (this.position.y === lastYPosition) this.position.y = 0;
        else this.position.y += 1;

        break;
      case Direction.LEFT:
        if (this.position.x === 0) this.position.x = lastXPosition;
        else this.position.x -= 1;

        break;
      case Direction.RIGHT:
        if (this.position.x === lastXPosition) this.position.x = 0;
        else this.position.x += 1;

        break;
    }
  }
}

export default SnakeBodyPart;
