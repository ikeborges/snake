import Directions from "./Directions.js"
import Food from "./Food.js"
import Game from "./Game.js"
import GameSettings from "./GameSettings.js"

class CanvasGame {
  constructor(window, document, context) {
    this.window = window
    this.document = document
    this.ctx = context
    this.ctx.fillStyle = "white"

    this.game = new Game()

    this.addKeyboardListeners()

    this.drawFrame()
  }

  addKeyboardListeners() {
    const keysToDirection = new Map([
      ["ArrowUp", Directions.UP],
      ["ArrowDown", Directions.DOWN],
      ["ArrowLeft", Directions.LEFT],
      ["ArrowRight", Directions.RIGHT],
    ])

    this.document.addEventListener("keydown", event => {
      const { snake } = this.game

      // TODO: Remove this – only for testing purposes
      if (event.key === " ") {
        this.runGameLoop()
        return
      }

      if (keysToDirection.has(event.key)) {
        snake.turnSnakeTo(keysToDirection.get(event.key))
      }
    })
  }

  drawBlock(x, y) {
    const { BLOCK_SIZE } = GameSettings

    this.ctx.fillRect(
      x * BLOCK_SIZE,
      y * BLOCK_SIZE,
      1 * BLOCK_SIZE,
      1 * BLOCK_SIZE
    )
  }

  drawFood(food) {
    const { xCoordinate: x, yCoordinate: y } = food.position
    this.drawBlock(x, y)
  }

  drawSnake(snake) {
    for (const bodyPart of snake.bodyParts) {
      const { xCoordinate: x, yCoordinate: y } = bodyPart.position
      this.drawBlock(x, y)
    }
  }

  drawFrame() {
    const { food, snake } = this.game

    this.drawFood(food)
    this.drawSnake(snake)
  }

  runGameLoop = () => {
    const { FRAME_WIDTH, FRAME_HEIGHT } = GameSettings

    const moveResult = this.game.snake.moveOneStep(this.game.food.position)

    switch (moveResult) {
      case -1:
        alert("Game Over")
        break
      case 0:
        // All good here, good to go
        break
      case 1:
        this.game.food = new Food()
        break
    }

    this.ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT)
    this.drawFrame()

    // this.window.requestAnimationFrame(this.runGameLoop)
  }
}

export default CanvasGame
