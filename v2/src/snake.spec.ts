import { describe, it, assert, beforeEach } from "vitest";
import Direction, { oppositeDirection } from "./Direction";
import Snake, { InitialSnakeState } from "./Snake";

describe("Snake", () => {
  let snake: Snake;

  describe("initial state", () => {
    const intialSnakePosition: InitialSnakeState = {
      size: 3,
      direction: Direction.UP,
    };

    beforeEach(() => {
      snake = new Snake(intialSnakePosition);
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

  describe("direction", () => {
    it("should not change to an opposite direction", () => {
      const directions = [
        Direction.UP,
        Direction.DOWN,
        Direction.LEFT,
        Direction.RIGHT,
      ];

      directions.forEach(direction => {
        snake = new Snake({ size: 21, direction });
        const opposite = oppositeDirection(direction);
        const updatedDirection = snake.turnTo(opposite);
        assert.strictEqual(updatedDirection, direction);
      });
    });
  });
});
