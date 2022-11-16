class Position {
  constructor({ xCoordinate, yCoordinate }) {
    this.xCoordinate = xCoordinate
    this.yCoordinate = yCoordinate
  }

  static generateRandomPosition(widthBlocks, heightBlocks) {
    const xCoordinate = Math.floor(Math.random() * widthBlocks)
    const yCoordinate = Math.floor(Math.random() * heightBlocks)

    return { xCoordinate, yCoordinate }
  }

  equals = otherPosition => {
    return (
      this.xCoordinate === otherPosition.xCoordinate &&
      this.yCoordinate === otherPosition.yCoordinate
    )
  }
}

export default Position
