import GameSettings from "./GameSettings.js"

class Position {
  constructor({ xCoordinate, yCoordinate }) {
    this.xCoordinate = xCoordinate
    this.yCoordinate = yCoordinate
  }

  static generateRandomPosition() {
    const xCoordinate = Math.floor(Math.random() * GameSettings.WIDTH_IN_BLOCKS)
    const yCoordinate = Math.floor(
      Math.random() * GameSettings.HEIGHT_IN_BLOCKS
    )

    return new Position({ xCoordinate, yCoordinate })
  }

  equals = otherPosition => {
    return (
      this.xCoordinate === otherPosition.xCoordinate &&
      this.yCoordinate === otherPosition.yCoordinate
    )
  }
}

export default Position
