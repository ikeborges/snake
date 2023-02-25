import { Formatting } from "../util/Formatting";
import Directions from "./Direction";
import Game, { GameStatus } from "./Game";
import { GameAPIClient } from "./GameAPIClient";
import GameSettings from "./GameSettings";
import Position from "./Position";

class CanvasGame {
  private game: Game;
  private previousTimestamp: number = 0;
  private playerName: string = "John Doe";

  constructor(
    public window: Window,
    public document: Document,
    public context: CanvasRenderingContext2D
  ) {
    this.context.fillStyle = "white";
    this.game = new Game();
    this.addKeyboardListeners();
  }

  retrievePlayername() {}

  start() {
    const newGameScreen = this.document.getElementById(
      "game-start"
    ) as HTMLElement;

    const playerDataForm = this.document.getElementById(
      "player-data"
    ) as HTMLElement;
    const playerNameInput = this.document.getElementById(
      "player-name"
    ) as HTMLInputElement;

    playerDataForm.addEventListener("submit", ev => {
      ev.preventDefault();

      this.playerName = playerNameInput.value;
      newGameScreen.className = "";
      this.gameLoop();
    });
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
    const gameScoreElement = document.getElementById(
      "score"
    ) as HTMLSpanElement;
    gameScoreElement.innerText = gameStatus.score.toString();

    const gameTimeElement = document.getElementById("time") as HTMLSpanElement;
    const elapsedTime = new Date(Date.now() - gameStatus.startTime);
    gameTimeElement.innerText = Formatting.formatElapsedTime(elapsedTime);
  }

  async gameOver(gameStatus: GameStatus): Promise<void> {
    const gameOverScreen = this.document.getElementById(
      "game-over"
    ) as HTMLElement;
    gameOverScreen.className = "active";

    const finalScoreElement = document.getElementById(
      "final-score"
    ) as HTMLSpanElement;
    finalScoreElement.innerText = gameStatus.score.toString();

    const elapsedTimeElement = document.getElementById(
      "time-elapsed"
    ) as HTMLSpanElement;
    const elapsedTime = new Date(Date.now() - gameStatus.startTime);
    elapsedTimeElement.innerText = Formatting.formatElapsedTime(elapsedTime);

    try {
      await GameAPIClient.saveStatsInRanking(
        this.playerName,
        gameStatus.score,
        elapsedTime.getTime()
      );
    } catch (error) {
      console.error(error);
    }
  }

  gameLoop(timestamp: number = 0) {
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
}

export default CanvasGame;
