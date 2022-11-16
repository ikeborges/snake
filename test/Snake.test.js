import Directions from "../src/Directions"
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

  // it("Should move correctly", () => {
  //   const snake = new Snake()
  //   const startPositions = snake.getPositions()
  //   const expectedEndPositions = startPositions.map(position => {
  //     return { ...position, yCoordinate: position.yCoordinate - 1 }
  //   })

  //   snake.turnSnakeTo(Directions.UP)

  //   snake.moveOneStep()

  //   const endPositions = snake.getPositions()

  //   expect(endPositions).toStrictEqual(expectedEndPositions)
  // })
})
