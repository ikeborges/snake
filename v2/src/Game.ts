import Direction from "./Direction";
import Food from "./Food";
import Snake from "./Snake";

class Game {
  constructor(public score = 0, public food: Food, public snake: Snake) {}

  turnSnakeTo(direction: Direction) {
    this.snake.turnSnakeTo(direction);
  }

  updateState(): boolean {
    if (this.snake.collisionHappened()) return false;

    if (this.snake.shouldEatFood(this.food.position)) {
      this.snake.eat();
      this.score += 1;
      this.food = new Food();
    }

    this.snake.moveOneStep();

    return true;
  }
}

export default Game;
