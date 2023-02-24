import DirectionChange from "./DirectionChange";
import Direction, { oppositeDirection } from "./Direction";
import Position from "./Position";
import SnakeBodyPart from "./SnakeBodyPart";
import Queue from "../util/Queue";

class Snake {
  private body: SnakeBodyPart[] = [];
  private directionChanges: Queue<DirectionChange> = new Queue();

  constructor(length = 3) {
    this.populateBody(length);
  }

  populateBody(length: number) {
    for (let i = 0; i < length; i++) {
      const bodyPart = new SnakeBodyPart(new Position(1, i + 1), Direction.UP);
      this.body.push(bodyPart);
    }
  }

  appendBodyPart() {
    const currentTail = this.getTail();

    let newPosition;

    switch (currentTail.getDirection()) {
      case Direction.UP:
        newPosition = new Position(
          currentTail.getPosition().x,
          currentTail.getPosition().y + 1
        );

        break;
      case Direction.DOWN:
        newPosition = new Position(
          currentTail.getPosition().x,
          currentTail.getPosition().y - 1
        );

        break;

      case Direction.LEFT:
        newPosition = new Position(
          currentTail.getPosition().x + 1,
          currentTail.getPosition().y
        );

        break;

      case Direction.RIGHT:
        newPosition = new Position(
          currentTail.getPosition().x - 1,
          currentTail.getPosition().y
        );

        break;
    }

    this.body.push(new SnakeBodyPart(newPosition, currentTail.getDirection()));
  }

  getBody() {
    return this.body;
  }

  getHead() {
    return this.body[0];
  }

  getTail() {
    return (
      this.body.at(-1) || new SnakeBodyPart(new Position(0, 0), Direction.UP)
    );
  }

  getLength() {
    return this.body.length;
  }

  getPositions() {
    return this.body.map(bodyPart => bodyPart.getPosition());
  }

  shouldEatFood(foodPosition: Position): boolean {
    return this.getHead().getPosition().equals(foodPosition);
  }

  eat() {
    this.appendBodyPart();
  }

  turnSnakeTo(targetDirection: Direction) {
    const snakeHead = this.getHead();

    if (
      targetDirection === snakeHead.getDirection() ||
      targetDirection === oppositeDirection(snakeHead.getDirection())
    )
      return;

    // Make sure position is always recreated and not referenced
    const snakeHeadPosition = Position.from(snakeHead.getPosition());
    const newDirectionChange = new DirectionChange(
      targetDirection,
      snakeHeadPosition
    );

    this.directionChanges.enqueue(newDirectionChange);
  }

  collisionHappened() {
    for (const [index, bodyPart] of Object.entries(this.body)) {
      if (
        parseInt(index) > 0 &&
        this.getHead().getPosition().equals(bodyPart.getPosition())
      )
        return true;
    }

    return false;
  }

  moveOneStep() {
    let shouldDequeue = false;

    // Turn bodyPart's direction if it's in a directionChange position
    this.directionChanges.asArray().forEach(directionChange => {
      this.body.forEach((bodyPart, index, body) => {
        if (directionChange.getPosition().equals(bodyPart.getPosition())) {
          bodyPart.turnTo(directionChange.getDirection());

          if (index === body.length - 1) {
            shouldDequeue = true;
          }
        }
      });
    });

    if (shouldDequeue) {
      this.directionChanges.dequeue();
    }

    this.body.forEach(bodyPart => bodyPart.moveOneStep());
  }
}

export default Snake;
