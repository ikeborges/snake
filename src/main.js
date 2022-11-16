import CanvasGame from "./CanvasGame.js"
import GameSettings from "./GameSettings.js"

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas")
  const context = canvas.getContext("2d")

  GameSettings.BLOCK_SIZE = 20
  GameSettings.FRAME_HEIGHT = canvas.clientHeight
  GameSettings.FRAME_WIDTH = canvas.clientWidth

  new CanvasGame(window, document, context)
})

// let previousTimeStamp = 0

// function update(timestamp) {
//   const elapsed = timestamp - previousTimeStamp

//   if (!previousTimeStamp || elapsed >= 200) {
//     previousTimeStamp = timestamp
//     ctx.clearRect(0, 0, 400, 600)
//     drawBlock()
//   }

//   requestAnimationFrame(update)
// }

// requestAnimationFrame(update)
