import Directions from "./Directions.js"
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

    this.previousTimestamp = 0
    this.tick()
  }

  addKeyboardListeners() {
    const keysToDirection = new Map([
      ["ArrowUp", Directions.UP],
      ["ArrowDown", Directions.DOWN],
      ["ArrowLeft", Directions.LEFT],
      ["ArrowRight", Directions.RIGHT],
    ])

    this.document.addEventListener("keydown", event => {
      // TODO: Remove this – only for testing purposes
      if (event.key === " ") {
        this.tick()
        return
      }

      if (keysToDirection.has(event.key)) {
        this.game.turnSnakeTo(keysToDirection.get(event.key))
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

  tick = timestamp => {
    const elapsedTime = timestamp - this.previousTimestamp

    if (!this.previousTimestamp || elapsedTime >= 200) {
      this.previousTimestamp = timestamp

      const updateResult = this.game.updateState()

      if (!updateResult) {
        alert("Game over! Refresh the page to start again.")
        return
      }

      const { FRAME_WIDTH, FRAME_HEIGHT } = GameSettings
      this.ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT)
      this.drawFrame()
    }

    this.window.requestAnimationFrame(this.tick)
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas")
  const context = canvas.getContext("2d")

  new CanvasGame(window, document, context)
})

export default CanvasGame
