import Directions from "./Direction";
import Game, { GameStatus } from "./Game";
import GameSettings from "./GameSettings";
import Position from "./Position";

class CanvasGame {
  private game = new Game();
  private previousTimestamp = 0;

  constructor(
    private window: Window,
    private document: Document,
    private context: CanvasRenderingContext2D
  ) {
    this.context.fillStyle = "white";
    this.addKeyboardListeners();
  }

  start() {
    this.gameLoop();
  }

  private gameLoop(timestamp: number = 0) {
    const elapsedTime = timestamp - this.previousTimestamp;

    if (!this.previousTimestamp || elapsedTime >= 200) {
      this.previousTimestamp = timestamp;

      const gameStatus = this.game.runCycle();

      if (gameStatus.gameEnded) {
        return this.gameOver(gameStatus);
      }

      this.updateView(gameStatus);

      const { FRAME_WIDTH, FRAME_HEIGHT } = GameSettings;
      this.context.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
      this.drawFrame();
    }

    this.window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  private gameOver(gameStatus: GameStatus): void {
    // TODO: Call GameOver API
  }

  private addKeyboardListeners() {
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

  private drawBlock(x: number, y: number) {
    const { BLOCK_SIZE } = GameSettings;

    this.context.fillRect(
      x * BLOCK_SIZE,
      y * BLOCK_SIZE,
      1 * BLOCK_SIZE,
      1 * BLOCK_SIZE
    );
  }

  private drawFood({ x, y }: Position) {
    this.drawBlock(x, y);
  }

  private drawSnake(positions: Position[]) {
    positions.forEach(({ x, y }) => {
      this.drawBlock(x, y);
    });
  }

  private drawFrame() {
    const snakePositions = this.game.getSnakePositions();
    const foodPosition = this.game.getFoodPosition();

    this.drawFood(foodPosition);
    this.drawSnake(snakePositions);
  }

  private formatElapsedTime(time: Date): string {
    const getPaddedValue = (number: number) => {
      return number < 10 ? "0" + number.toString() : number;
    };

    const hours = getPaddedValue(time.getUTCHours());
    const minutes = getPaddedValue(time.getUTCMinutes());
    const seconds = getPaddedValue(time.getUTCSeconds());

    return `${hours}:${minutes}:${seconds}`;
  }

  private updateView(gameStatus: GameStatus) {
    const gameScoreElement = document.getElementById(
      "score"
    ) as HTMLSpanElement;
    gameScoreElement.innerText = gameStatus.score.toString();

    const gameTimeElement = document.getElementById("time") as HTMLSpanElement;
    const elapsedTime = new Date(Date.now() - gameStatus.startTime);
    gameTimeElement.innerText = this.formatElapsedTime(elapsedTime);
  }
}

export default CanvasGame;
