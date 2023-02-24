import { assert, describe, it } from "vitest";
import Direction, { oppositeDirection } from "../src/Direction";

describe("oppositeDirection(direction)", () => {
  it("should return the opposite direction of its parameter", () => {
    const oppositeDirections = new Map([
      [Direction.UP, Direction.DOWN],
      [Direction.DOWN, Direction.UP],
      [Direction.LEFT, Direction.RIGHT],
      [Direction.RIGHT, Direction.LEFT],
    ]);

    for (let [direction, opposite] of oppositeDirections) {
      assert.strictEqual(oppositeDirection(direction), opposite);
    }
  });
});
