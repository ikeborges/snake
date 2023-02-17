import { describe, it, assert, beforeAll } from "vitest";
import Direction from "./Direction";
import Snake from "./Snake";

describe("Snake", () => {
  describe("initial state", () => {
    let snake: Snake;

    beforeAll(() => {
      snake = new Snake();
    });

    it("should have size 3", () => {
      const expected = 3;
      const actual = snake.size;

      assert.strictEqual(actual, expected);
    });

    it("should have an initial direction of UP", () => {
      const expected = Direction.UP;
      const actual = snake.direction;

      assert.strictEqual(expected, actual);
    });
  });
});
