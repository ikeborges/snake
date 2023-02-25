import CanvasGame from "./CanvasGame";

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  const game = new CanvasGame(window, document, context);
  game.start();
});
