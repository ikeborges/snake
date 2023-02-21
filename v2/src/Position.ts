import GameSettings from "./GameSettings";

class Position {
  constructor(public x: number, public y: number) {}

  static generateRandomPosition() {
    const xCoordinate = Math.floor(
      Math.random() * GameSettings.WIDTH_IN_BLOCKS
    );
    const yCoordinate = Math.floor(
      Math.random() * GameSettings.HEIGHT_IN_BLOCKS
    );

    return new Position(xCoordinate, yCoordinate);
  }

  equals(position: Position): boolean {
    return this.x === position.x && this.y === position.y;
  }
}

export default Position;
