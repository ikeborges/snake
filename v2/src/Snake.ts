import Direction, { oppositeDirection } from "./Direction";

export interface InitialSnakeState {
  size: number;
  direction: Direction;
}

class Snake {
  private _size: number;
  private _direction: Direction;

  constructor({ size, direction }: InitialSnakeState) {
    this._size = size;
    this._direction = direction;
  }

  turnTo(direction: Direction): Direction {
    if (direction === oppositeDirection(this._direction)) {
      return this._direction;
    }

    this._direction = direction;

    return this._direction;
  }

  get size() {
    return this._size;
  }

  get direction() {
    return this._direction;
  }
}

export default Snake;
