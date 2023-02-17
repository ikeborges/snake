import Position from "./Position.js"

class Food {
  constructor(position = Position.generateRandomPosition()) {
    this.position = new Position({ ...position })
  }
}

export default Food
