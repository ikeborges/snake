import GameSettings from "./GameSettings";

class Position {
  constructor(public x: number, public y: number) {}

  static generateRandomPosition() {
    const xCoordinate = Math.floor(
      Math.random() * (GameSettings.FRAME_WIDTH / GameSettings.BLOCK_SIZE)
    );
    const yCoordinate = Math.floor(
      Math.random() * (GameSettings.FRAME_HEIGHT / GameSettings.BLOCK_SIZE)
    );

    return new Position(xCoordinate, yCoordinate);
  }

  static from(position: Position) {
    return new Position(position.x, position.y);
  }

  equals(position: Position): boolean {
    return this.x === position.x && this.y === position.y;
  }
}

export default Position;
