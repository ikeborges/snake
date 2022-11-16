import Position from "./Position.js"
import Snake from "./Snake.js"
import Food from "./Food.js"

class Game {
  constructor(initialSnakePosition = new Position(9, 25)) {
    this.score = 0
    this.food = new Food()
    this.snake = new Snake()
  }

  updateState() {
    console.log("TODO: Update game state")
  }
}

export default Game
