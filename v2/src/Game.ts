import Position from "./Position";

class Game {
  private _foodPosition: Position;

  constructor(initialFoodPosition: Position) {
    this._foodPosition = initialFoodPosition;
  }

  placeFoodAt(position: Position) {
    this._foodPosition = position;
  }

  get foodPosition(): Position {
    return this._foodPosition;
  }
}

export default Game;
