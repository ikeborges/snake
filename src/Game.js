import Snake from "./Snake.js"
import Food from "./Food.js"

class Game {
  constructor() {
    this.score = 0
    this.food = new Food()
    this.snake = new Snake()
  }

  updateState() {
    console.log("TODO: Update game state")
  }
}

export default Game
