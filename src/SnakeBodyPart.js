import Directions from "./Directions.js"
import GameSettings from "./GameSettings.js"

class SnakeBodyPart {
  constructor({ direction, position }) {
    this.direction = direction
    this.position = position
  }

  getPosition() {
    return this.position
  }

  getDirection() {
    return this.direction
  }

  turnTo(direction) {
    this.direction = direction
  }

  moveOneStep() {
    const lastYPosition = GameSettings.HEIGHT_IN_BLOCKS - 1
    const lastXPosition = GameSettings.WIDTH_IN_BLOCKS - 1

    // The Y axis in canvas is upside down, so to go up we need to subtract from Y
    switch (this.direction) {
      case Directions.UP:
        if (this.position.yCoordinate === 0)
          this.position.yCoordinate = lastYPosition
        else this.position.yCoordinate -= 1

        break
      case Directions.DOWN:
        if (this.position.yCoordinate === lastYPosition)
          this.position.yCoordinate = 0
        else this.position.yCoordinate += 1

        break
      case Directions.LEFT:
        if (this.position.xCoordinate === 0)
          this.position.xCoordinate = lastXPosition
        else this.position.xCoordinate -= 1

        break
      case Directions.RIGHT:
        if (this.position.xCoordinate === lastXPosition)
          this.position.xCoordinate = 0
        else this.position.xCoordinate += 1

        break
    }
  }
}

export default SnakeBodyPart
