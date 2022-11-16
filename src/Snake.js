import DirectionChange from "./DirectionChange.js"
import Directions, { getOppositeDirection } from "./Directions.js"
import Position from "./Position.js"
import SnakeBodyPart from "./SnakeBodyPart.js"

class Snake {
  constructor(length = 3) {
    this.bodyParts = []
    this.directionChanges = []

    this.initializeBodyParts(length)
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

  eat = foodPosition => {
    if (this.bodyParts[0].position.equals(foodPosition)) {
      const currentTail = this.bodyParts[this.bodyParts.length - 1]
      let newTail

      switch (currentTail.direction) {
        case Directions.UP:
          newTail = new SnakeBodyPart(
            currentTail.direction,
            new Position(
              currentTail.position.xCoordinate,
              currentTail.position.yCoordinate + 1
            )
          )

          break
        case Directions.DOWN:
          newTail = new SnakeBodyPart(
            currentTail.direction,
            new Position(
              currentTail.position.xCoordinate,
              currentTail.position.yCoordinate - 1
            )
          )

          break

        case Directions.LEFT:
          newTail = new SnakeBodyPart(
            currentTail.direction,
            new Position(
              currentTail.position.xCoordinate - 1,
              currentTail.position.yCoordinate
            )
          )

          break

        case Directions.RIGHT:
          newTail = new SnakeBodyPart(
            currentTail.direction,
            new Position(
              currentTail.position.xCoordinate + 1,
              currentTail.position.yCoordinate
            )
          )

          break
      }

      this.bodyParts.push(newTail)
      return true
    }

    return false
  }

  initializeBodyParts(length) {
    for (let i = 0; i < length; i++) {
      const bodyPart = new SnakeBodyPart(Directions.UP, new Position(1, i + 1))
      this.bodyParts.push(bodyPart)
    }
  }

  turnSnakeTo = targetDirection => {
    const snakeHead = this.bodyParts[0]

    if (
      targetDirection === snakeHead.direction ||
      targetDirection === getOppositeDirection(snakeHead.direction)
    )
      return

    let newDirectionChange

    // TODO: Make sure position is always recreated and not referenced
    const snakeHeadPosition = new Position(
      snakeHead.position.xCoordinate,
      snakeHead.position.yCoordinate
    )

    switch (targetDirection) {
      case Directions.UP:
        newDirectionChange = new DirectionChange(
          Directions.UP,
          snakeHeadPosition
        )
        break
      case Directions.DOWN:
        newDirectionChange = new DirectionChange(
          Directions.DOWN,
          snakeHeadPosition
        )
        break
      case Directions.RIGHT:
        newDirectionChange = new DirectionChange(
          Directions.RIGHT,
          snakeHeadPosition
        )
        break
      case Directions.LEFT:
        newDirectionChange = new DirectionChange(
          Directions.LEFT,
          snakeHeadPosition
        )
        break
      default:
        throw new Error("Can't turn snake to invalid direction")
    }

    this.directionChanges.push(newDirectionChange)
  }

  moveOneStep = foodPosition => {
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

    for (const [index, bodyPart] of Object.entries(this.bodyParts)) {
      if (index > 0 && this.bodyParts[0].position.equals(bodyPart.position)) {
        this.bodyParts = []
        return -1
      } else {
        bodyPart.moveOneStep()
      }
    }
    const hasEaten = this.eat(foodPosition)

    return hasEaten ? 1 : 0
  }
}

export default Snake
