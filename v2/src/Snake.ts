import DirectionChange from "./DirectionChange";
import Direction, { oppositeDirection } from "./Direction";
import Position from "./Position";
import SnakeBodyPart from "./SnakeBodyPart";

class Snake {
  public body: SnakeBodyPart[] = [];
  private directionChanges: DirectionChange[] = [];

  constructor(length = 3) {
    this._initializeBodyParts(length);
  }

  _initializeBodyParts(length: number) {
    for (let i = 0; i < length; i++) {
      const bodyPart = new SnakeBodyPart(new Position(1, i + 1), Direction.UP);
      this.body.push(bodyPart);
    }
  }

  get tail() {
    return (
      this.body.at(-1) || new SnakeBodyPart(new Position(0, 0), Direction.UP)
    );
  }

  getLength() {
    return this.body.length;
  }

  getPositions() {
    return this.body.map(bodyPart => bodyPart.position);
  }

  getHeadPosition() {
    return this.body[0].position;
  }

  shouldEatFood(foodPosition: Position) {
    return this.body[0].position.equals(foodPosition);
  }

  eat() {
    const currentTail = this.body[this.body.length - 1];
    let newTail;

    switch (currentTail.direction) {
      case Direction.UP:
        newTail = new SnakeBodyPart(
          new Position(currentTail.position.x, currentTail.position.y + 1),
          currentTail.direction
        );

        break;
      case Direction.DOWN:
        newTail = new SnakeBodyPart(
          new Position(currentTail.position.x, currentTail.position.y - 1),
          currentTail.direction
        );

        break;

      case Direction.LEFT:
        newTail = new SnakeBodyPart(
          new Position(currentTail.position.x + 1, currentTail.position.y),
          currentTail.direction
        );

        break;

      case Direction.RIGHT:
        newTail = new SnakeBodyPart(
          new Position(currentTail.position.x - 1, currentTail.position.y),
          currentTail.direction
        );

        break;
    }

    this.body.push(newTail);
  }

  turnSnakeTo(targetDirection: Direction) {
    const snakeHead = this.body[0];

    if (
      targetDirection === snakeHead.direction ||
      targetDirection === oppositeDirection(snakeHead.direction)
    )
      return;

    // Make sure position is always recreated and not referenced
    const snakeHeadPosition = new Position(
      snakeHead.position.x,
      snakeHead.position.y
    );
    const newDirectionChange = new DirectionChange(
      targetDirection,
      snakeHeadPosition
    );

    this.directionChanges.push(newDirectionChange);
  }

  isThereHeadCollision() {
    for (const [index, bodyPart] of Object.entries(this.body)) {
      if (
        parseInt(index) > 0 &&
        this.body[0].position.equals(bodyPart.position)
      ) {
        return true;
      }
    }

    return false;
  }

  moveOneStep() {
    // The direction change item that the body is gonna go through is
    // always the first on the list
    let removeFirstDirectionChange = false;

    // Turn body part direction if its in a directionChange position
    this.directionChanges.forEach(directionChange => {
      for (let i = 0; i < this.body.length; i++) {
        if (directionChange.position.equals(this.body[i].position)) {
          this.body[i].direction = directionChange.direction;

          if (i === this.body.length - 1) {
            removeFirstDirectionChange = true;
          }
        }
      }
    });

    if (removeFirstDirectionChange) {
      this.directionChanges = this.directionChanges.slice(1);
    }

    this.body.forEach(bodyPart => bodyPart.moveOneStep());
  }
}

export default Snake;
