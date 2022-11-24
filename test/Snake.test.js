import Directions from "../src/Directions"
import Food from "../src/Food"
import Snake from "../src/Snake"

describe("Snake", () => {
  describe("Should be initialized", () => {
    it("With length 3, if no parameter passed", () => {
      const snake = new Snake()
      expect(snake.getLength()).toBe(3)
    })

    it("With a number a custom size", () => {
      const snake = new Snake(5)
      expect(snake.getLength()).toBe(5)
    })
  })

  it("Should increase length after eating", () => {
    const snake = new Snake(3)
    const food = new Food({ ...snake.getHeadPosition() })

    snake.eat(food.position)
    expect(snake.getLength()).toBe(4)
  })

  it("Should eat the food and head are in the same position", () => {
    const snake = new Snake(3)
    const food = new Food({
      xCoordinate: snake.getHeadPosition().xCoordinate,
      yCoordinate: snake.getHeadPosition().yCoordinate - 1,
    })

    snake.turnSnakeTo(Directions.UP)
    snake.moveOneStep(food.position)

    expect(snake.getLength()).toBe(4)
  })
})
