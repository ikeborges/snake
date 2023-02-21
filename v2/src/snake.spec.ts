import { describe, it, assert } from "vitest";
import Snake from "./Snake";

describe("Snake", () => {
  let snake: Snake;

  describe("body", () => {
    it("should have new body part appended to the end when it eats", () => {
      snake = new Snake(2);

      snake.eat();
      snake.eat();

      assert.strictEqual(snake.body.length, 4);
    });

    it("should have new body part with the same direction as the previous tail", () => {
      snake = new Snake(3);

      const tailBeforeEating = snake.tail;
      snake.eat();
      const tailAfterEating = snake.tail;

      assert.strictEqual(tailAfterEating.direction, tailBeforeEating.direction);
    });
  });
});
