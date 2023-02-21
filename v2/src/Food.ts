import Position from "./Position";

class Food {
  constructor(public position = Position.generateRandomPosition()) {
    this.position = new Position(position.x, position.y);
  }
}

export default Food;
