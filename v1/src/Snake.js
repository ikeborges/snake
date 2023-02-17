import DirectionChange from "./DirectionChange.js"
import Directions, { getOppositeDirection } from "./Directions.js"
import Position from "./Position.js"
import SnakeBodyPart from "./SnakeBodyPart.js"

class Snake {
  constructor(length = 3) {
    this.bodyParts = []
    this.directionChanges = []

    this._initializeBodyParts(length)
  }

  _initializeBodyParts(length) {
    for (let i = 0; i < length; i++) {
      const bodyPart = new SnakeBodyPart({
        direction: Directions.UP,
        position: new Position({ xCoordinate: 1, yCoordinate: i + 1 }),
      })
      this.bodyParts.push(bodyPart)
    }
  }

  getLength() {
    return this.bodyParts.length
  }

  getPositions() {
    return this.bodyParts.map(bodyPart => bodyPart.position)
  }

  getHeadPosition() {
    return this.bodyParts[0].position
  }

  shouldEatFood(foodPosition) {
    return this.bodyParts[0].position.equals(foodPosition)
  }

  eat() {
    const currentTail = this.bodyParts[this.bodyParts.length - 1]
    let newTail

    switch (currentTail.direction) {
      case Directions.UP:
        newTail = new SnakeBodyPart({
          direction: currentTail.direction,
          position: new Position({
            xCoordinate: currentTail.position.xCoordinate,
            yCoordinate: currentTail.position.yCoordinate + 1,
          }),
        })

        break
      case Directions.DOWN:
        newTail = new SnakeBodyPart({
          direction: currentTail.direction,
          position: new Position({
            xCoordinate: currentTail.position.xCoordinate,
            yCoordinate: currentTail.position.yCoordinate - 1,
          }),
        })

        break

      case Directions.LEFT:
        newTail = new SnakeBodyPart({
          direction: currentTail.direction,
          position: new Position({
            xCoordinate: currentTail.position.xCoordinate + 1,
            yCoordinate: currentTail.position.yCoordinate,
          }),
        })

        break

      case Directions.RIGHT:
        newTail = new SnakeBodyPart({
          direction: currentTail.direction,
          position: new Position({
            xCoordinate: currentTail.position.xCoordinate - 1,
            yCoordinate: currentTail.position.yCoordinate,
          }),
        })

        break
    }

    this.bodyParts.push(newTail)
  }

  turnSnakeTo(targetDirection) {
    const snakeHead = this.bodyParts[0]

    if (
      targetDirection === snakeHead.direction ||
      targetDirection === getOppositeDirection(snakeHead.direction)
    )
      return

    // Make sure position is always recreated and not referenced
    const snakeHeadPosition = new Position({ ...snakeHead.position })
    const newDirectionChange = new DirectionChange({
      direction: targetDirection,
      position: snakeHeadPosition,
    })

    this.directionChanges.push(newDirectionChange)
  }

  isThereHeadCollision() {
    for (const [index, bodyPart] of Object.entries(this.bodyParts)) {
      if (index > 0 && this.bodyParts[0].position.equals(bodyPart.position)) {
        return true
      }
    }

    return false
  }

  moveOneStep() {
    // The direction change item that the body is gonna go through is
    // always the first on the list
    let removeFirstDirectionChange = false

    // Turn body part direction if its in a directionChange position
    this.directionChanges.forEach(directionChange => {
      for (let i = 0; i < this.bodyParts.length; i++) {
        if (directionChange.position.equals(this.bodyParts[i].position)) {
          this.bodyParts[i].direction = directionChange.direction

          if (i === this.bodyParts.length - 1) {
            removeFirstDirectionChange = true
          }
        }
      }
    })

    if (removeFirstDirectionChange) {
      this.directionChanges = this.directionChanges.slice(1)
    }

    this.bodyParts.forEach(bodyPart => bodyPart.moveOneStep())
  }
}

export default Snake
