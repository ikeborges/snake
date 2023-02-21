import { describe, it, assert, beforeEach } from "vitest";
import Direction, { oppositeDirection } from "./Direction";
import Position from "./Position";
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

  describe("body", () => {
    it("should increase size when it eats", () => {
      const initialSize = 3;
      const expected = 4;

      snake = new Snake({ size: initialSize, direction: Direction.UP });
      snake.eat();
      const actual = snake.size;

      assert.strictEqual(actual, expected);
    });

    it("should have new body part appended to the end when it eats", () => {
      snake = new Snake({ size: 2, direction: Direction.UP });

      snake.eat();
      snake.eat();

      assert.strictEqual(snake.body.length, 4);
    });

    it("should have new body part with the same direction as the previous tail", () => {
      snake = new Snake({ size: 3, direction: Direction.DOWN });

      const tailBeforeEating = snake.tail;
      snake.eat();
      const tailAfterEating = snake.tail;

      assert.strictEqual(tailAfterEating.direction, tailBeforeEating.direction);
    });

    it("should have new body part in a position next to the previous tail", () => {
      snake = new Snake({ size: 3, direction: Direction.UP });

      const tailBeforeEating = snake.tail;
      snake.eat();
      const tailAfterEating = snake.tail;

      let expected: Position;

      switch (tailBeforeEating.direction) {
        case Direction.UP:
          expected = {
            x: tailBeforeEating.position.x,
            y: tailBeforeEating.position.y - 1,
          };
          break;
        case Direction.DOWN:
          expected = {
            x: tailBeforeEating.position.x,
            y: tailBeforeEating.position.y + 1,
          };
          break;
        case Direction.LEFT:
          expected = {
            x: tailBeforeEating.position.x + 1,
            y: tailBeforeEating.position.y,
          };
          break;
        case Direction.RIGHT:
          expected = {
            x: tailBeforeEating.position.x - 1,
            y: tailBeforeEating.position.y,
          };
          break;
      }

      assert.deepEqual(tailAfterEating.position, expected);
    });
  });
});
