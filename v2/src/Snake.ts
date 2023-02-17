import Direction from "./Direction";

class Snake {
  public size: number;
  public direction: Direction;

  constructor() {
    this.size = 3;
    this.direction = Direction.UP;
  }
}

export default Snake;
