import Snake from "./Snake.js"
import Food from "./Food.js"

class Game {
  constructor() {
    this.score = 0
    this.food = new Food()
    this.snake = new Snake()
  }

  turnSnakeTo(direction) {
    this.snake.turnSnakeTo(direction)
  }

  updateState() {
    if (this.snake.isThereHeadCollision()) return false

    if (this.snake.shouldEatFood(this.food.position)) {
      this.snake.eat(this.food.position)
      this.food = new Food()
    }

    this.snake.moveOneStep()

    return true
  }
}

export default Game
