import Position from "./Position";

class Food {
  private position: Position;

  constructor(position: Position = Position.generateRandomPosition()) {
    this.position = new Position(position.x, position.y);
  }

  getPosition() {
    return this.position;
  }
}

export default Food;
