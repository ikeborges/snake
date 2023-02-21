import Directions from "./Direction";
import Food from "./Food";
import Game from "./Game";
import GameSettings from "./GameSettings";
import Snake from "./Snake";

class CanvasGame {
  public game: Game;
  public previousTimestamp: number = 0;

  constructor(
    public window: Window,
    public document: Document,
    public context: CanvasRenderingContext2D
  ) {
    this.context.fillStyle = "white";

    this.game = new Game(0, new Food(), new Snake());

    this.addKeyboardListeners();

    this.tick(0);
  }

  addKeyboardListeners() {
    const keysToDirection = new Map([
      ["ArrowUp", Directions.UP],
      ["ArrowDown", Directions.DOWN],
      ["ArrowLeft", Directions.LEFT],
      ["ArrowRight", Directions.RIGHT],
    ]);

    this.document.addEventListener("keydown", event => {
      if (keysToDirection.has(event.key)) {
        this.game.turnSnakeTo(keysToDirection.get(event.key)!);
      }
    });
  }

  drawBlock(x: number, y: number) {
    const { BLOCK_SIZE } = GameSettings;

    this.context.fillRect(
      x * BLOCK_SIZE,
      y * BLOCK_SIZE,
      1 * BLOCK_SIZE,
      1 * BLOCK_SIZE
    );
  }

  drawFood(food: Food) {
    const { x, y } = food.position;
    this.drawBlock(x, y);
  }

  drawSnake(snake: Snake) {
    for (const bodyPart of snake.body) {
      const { x, y } = bodyPart.position;
      this.drawBlock(x, y);
    }
  }

  drawFrame() {
    const { food, snake } = this.game;

    this.drawFood(food);
    this.drawSnake(snake);
  }

  tick = (timestamp: number) => {
    const elapsedTime = timestamp - this.previousTimestamp;

    if (!this.previousTimestamp || elapsedTime >= 200) {
      this.previousTimestamp = timestamp;

      const updateResult = this.game.updateState();

      if (!updateResult) {
        alert("Game over! Refresh the page to start again.");
        return;
      }

      const { FRAME_WIDTH, FRAME_HEIGHT } = GameSettings;
      this.context.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
      this.drawFrame();
    }

    this.window.requestAnimationFrame(this.tick);
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d");

  new CanvasGame(window, document, context!);
});

export default CanvasGame;
