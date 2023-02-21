import Direction, { oppositeDirection } from "./Direction";
import Position from "./Position";
import SnakeBodyPart from "./SnakeBodyPart";

export interface InitialSnakeState {
  size: number;
  direction: Direction;
}

class Snake {
  private _size: number;
  private _direction: Direction;
  private _body: SnakeBodyPart[] = [];

  constructor({ size, direction }: InitialSnakeState) {
    this._size = size;
    this._direction = direction;

    if (size < 1) {
      this._size = 1;
    }

    for (let i = 0; i < this._size; i++) this.appendBodyPart();
  }

  turnTo(direction: Direction): Direction {
    if (direction === oppositeDirection(this._direction)) {
      return this._direction;
    }

    this._direction = direction;

    return this._direction;
  }

  eat() {
    this._size += 1;
    this.appendBodyPart();
  }

  get size() {
    return this._size;
  }

  get direction() {
    return this._direction;
  }

  get tail() {
    return (
      this._body.at(-1) || new SnakeBodyPart(new Position(0, 0), Direction.UP)
    );
  }

  get body() {
    return this._body;
  }

  private appendBodyPart() {
    const currentTailPosition = this.tail.position;
    let newPosition;

    switch (this.tail.direction) {
      case Direction.UP:
        newPosition = new Position(
          currentTailPosition.x,
          currentTailPosition.y - 1
        );
        break;
      case Direction.DOWN:
        newPosition = new Position(
          currentTailPosition.x,
          currentTailPosition.y + 1
        );
        break;
      case Direction.LEFT:
        newPosition = new Position(
          currentTailPosition.x + 1,
          currentTailPosition.y
        );
        break;
      case Direction.RIGHT:
        newPosition = new Position(
          currentTailPosition.x - 1,
          currentTailPosition.y
        );
        break;
    }

    const newBodyPart = new SnakeBodyPart(newPosition, this.tail.direction);
    this._body.push(newBodyPart);
  }
}

export default Snake;
