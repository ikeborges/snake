import Directions from "../src/Directions"
import SnakeBodyPart from "../src/SnakeBodyPart"
import Position from "../src/Position"

describe("SnakeBodyPart", () => {
  let bodyPart
  const startingCoordinates = { xCoordinate: 2, yCoordinate: 4 }
  const maxWidthAndHeight = {
    MAX_WIDTH_IN_BLOCKS: 20,
    MAX_HEIGHT_IN_BLOCKS: 30,
  }

  beforeEach(() => {
    bodyPart = new SnakeBodyPart({
      direction: Directions.RIGHT,
      position: new Position(startingCoordinates),
    })
  })

  it("Should have a position and a direction", () => {
    const { xCoordinate, yCoordinate } = bodyPart.getPosition()

    expect(xCoordinate).toBe(startingCoordinates.xCoordinate)
    expect(yCoordinate).toBe(startingCoordinates.yCoordinate)

    expect(bodyPart.getDirection()).toBe(Directions.RIGHT)
  })

  it("Should turn its direction", () => {
    bodyPart.turnTo(Directions.LEFT)
    expect(bodyPart.getDirection()).toBe(Directions.LEFT)

    bodyPart.turnTo(Directions.DOWN)
    expect(bodyPart.getDirection()).toBe(Directions.DOWN)

    bodyPart.turnTo(Directions.RIGHT)
    expect(bodyPart.getDirection()).toBe(Directions.RIGHT)

    bodyPart.turnTo(Directions.UP)
    expect(bodyPart.getDirection()).toBe(Directions.UP)

    // Successive turns
    bodyPart.turnTo(Directions.DOWN)
    bodyPart.turnTo(Directions.RIGHT)
    bodyPart.turnTo(Directions.LEFT)
    expect(bodyPart.getDirection()).toBe(Directions.LEFT)
  })

  describe("Should be able to move", () => {
    it("left", () => {
      bodyPart.turnTo(Directions.LEFT)
      bodyPart.moveOneStep(maxWidthAndHeight)

      const { xCoordinate, yCoordinate } = bodyPart.getPosition()
      expect(xCoordinate).toBe(startingCoordinates.xCoordinate - 1)
      expect(yCoordinate).toBe(startingCoordinates.yCoordinate)
    })

    it("right", () => {
      bodyPart.turnTo(Directions.RIGHT)
      bodyPart.moveOneStep(maxWidthAndHeight)

      const { xCoordinate, yCoordinate } = bodyPart.getPosition()
      expect(xCoordinate).toBe(startingCoordinates.xCoordinate + 1)
      expect(yCoordinate).toBe(startingCoordinates.yCoordinate)
    })

    it("up", () => {
      bodyPart.turnTo(Directions.UP)
      bodyPart.moveOneStep(maxWidthAndHeight)

      const { xCoordinate, yCoordinate } = bodyPart.getPosition()
      expect(xCoordinate).toBe(startingCoordinates.xCoordinate)
      expect(yCoordinate).toBe(startingCoordinates.yCoordinate - 1)
    })

    it("down", () => {
      bodyPart.turnTo(Directions.DOWN)
      bodyPart.moveOneStep(maxWidthAndHeight)

      const { xCoordinate, yCoordinate } = bodyPart.getPosition()
      expect(xCoordinate).toBe(startingCoordinates.xCoordinate)
      expect(yCoordinate).toBe(startingCoordinates.yCoordinate + 1)
    })
  })

  describe("should teleport to the parallel side if it's near a wall", () => {
    it("up", () => {
      bodyPart = new SnakeBodyPart({
        direction: Directions.UP,
        position: new Position({ xCoordinate: 0, yCoordinate: 0 }),
      })

      bodyPart.moveOneStep(maxWidthAndHeight)

      const { xCoordinate, yCoordinate } = bodyPart.getPosition()

      expect(xCoordinate).toBe(0)
      expect(yCoordinate).toBe(29)
    })

    it("down", () => {
      bodyPart = new SnakeBodyPart({
        direction: Directions.DOWN,
        position: new Position({
          xCoordinate: 0,
          yCoordinate: maxWidthAndHeight.MAX_HEIGHT_IN_BLOCKS - 1,
        }),
      })

      bodyPart.moveOneStep(maxWidthAndHeight)

      const { xCoordinate, yCoordinate } = bodyPart.getPosition()

      expect(xCoordinate).toBe(0)
      expect(yCoordinate).toBe(0)
    })

    it("left", () => {
      bodyPart = new SnakeBodyPart({
        direction: Directions.LEFT,
        position: new Position({
          xCoordinate: 0,
          yCoordinate: 0,
        }),
      })

      bodyPart.moveOneStep(maxWidthAndHeight)

      const { xCoordinate, yCoordinate } = bodyPart.getPosition()

      expect(xCoordinate).toBe(maxWidthAndHeight.MAX_WIDTH_IN_BLOCKS - 1)
      expect(yCoordinate).toBe(0)
    })

    it("right", () => {
      bodyPart = new SnakeBodyPart({
        direction: Directions.RIGHT,
        position: new Position({
          xCoordinate: maxWidthAndHeight.MAX_WIDTH_IN_BLOCKS - 1,
          yCoordinate: 0,
        }),
      })

      bodyPart.moveOneStep(maxWidthAndHeight)

      const { xCoordinate, yCoordinate } = bodyPart.getPosition()

      expect(xCoordinate).toBe(0)
      expect(yCoordinate).toBe(0)
    })
  })
})
