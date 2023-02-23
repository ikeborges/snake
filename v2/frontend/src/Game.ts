import Direction from "./Direction";
import Food from "./Food";
import Snake from "./Snake";

export interface GameStatus {
  score: number;
  startTime: number;
  gameEnded: boolean;
}

class Game {
  private food: Food;
  private snake: Snake;
  private status: GameStatus;

  constructor() {
    this.food = new Food();
    this.snake = new Snake();

    this.status = {
      score: 0,
      startTime: Date.now(),
      gameEnded: false,
    };
  }

  turnSnakeTo(direction: Direction) {
    this.snake.turnSnakeTo(direction);
  }

  runCycle(): GameStatus {
    if (this.snake.collisionHappened()) this.status.gameEnded = true;

    if (this.snake.shouldEatFood(this.food.getPosition())) {
      this.snake.eat();
      this.food = new Food();
      this.status.score += 1;
    }

    this.snake.moveOneStep();

    return this.status;
  }

  getSnakePositions() {
    return this.snake.getPositions();
  }

  getFoodPosition() {
    return this.food.getPosition();
  }
}

export default Game;
