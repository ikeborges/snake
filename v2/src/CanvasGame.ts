import Directions from "./Direction";
import Game, { GameStatus } from "./Game";
import GameSettings from "./GameSettings";
import Position from "./Position";

class CanvasGame {
  private game: Game;
  private previousTimestamp: number = 0;

  constructor(
    public window: Window,
    public document: Document,
    public context: CanvasRenderingContext2D
  ) {
    this.context.fillStyle = "white";
    this.game = new Game();
    this.addKeyboardListeners();
  }

  start() {
    this.gameLoop();
  }

  addKeyboardListeners() {
    const keysToDirections = new Map([
      ["ArrowUp", Directions.UP],
      ["ArrowDown", Directions.DOWN],
      ["ArrowLeft", Directions.LEFT],
      ["ArrowRight", Directions.RIGHT],
    ]);

    this.document.addEventListener("keydown", event => {
      if (keysToDirections.has(event.key)) {
        this.game.turnSnakeTo(keysToDirections.get(event.key)!);
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

  drawFood({ x, y }: Position) {
    this.drawBlock(x, y);
  }

  drawSnake(positions: Position[]) {
    positions.forEach(({ x, y }) => {
      this.drawBlock(x, y);
    });
  }

  drawFrame() {
    const snakePositions = this.game.getSnakePositions();
    const foodPosition = this.game.getFoodPosition();

    this.drawFood(foodPosition);
    this.drawSnake(snakePositions);
  }

  updateView(gameStatus: GameStatus) {
    // Update game status
  }

  gameOver(): void {
    // Show game ended screen
  }

  gameLoop = (timestamp: number = 0) => {
    const elapsedTime = timestamp - this.previousTimestamp;

    if (!this.previousTimestamp || elapsedTime >= 200) {
      this.previousTimestamp = timestamp;

      const gameStatus = this.game.runCycle();

      if (gameStatus.gameEnded) {
        return this.gameOver();
      }

      this.updateView(gameStatus);

      const { FRAME_WIDTH, FRAME_HEIGHT } = GameSettings;
      this.context.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
      this.drawFrame();
    }

    this.window.requestAnimationFrame(this.gameLoop);
  };
}

export default CanvasGame;
