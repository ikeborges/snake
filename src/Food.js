import GameSettings from "./GameSettings.js"
import Position from "./Position.js"

class Food {
  constructor() {
    const randomPosition = Position.generateRandomPosition(
      GameSettings.WIDTH_IN_BLOCKS,
      GameSettings.HEIGHT_IN_BLOCKS
    )

    this.position = new Position(
      randomPosition.xCoordinate,
      randomPosition.yCoordinate
    )
  }
}

export default Food
