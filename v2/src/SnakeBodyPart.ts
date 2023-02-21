import Direction from "./Direction";
import Position from "./Position";

class SnakeBodyPart {
  constructor(public position: Position, public direction: Direction) {}
}

export default SnakeBodyPart;
