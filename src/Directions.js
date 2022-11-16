const Directions = {
  UP: "Up",
  DOWN: "Down",
  LEFT: "Left",
  RIGHT: "Right",
}

export const getOppositeDirection = direction => {
  switch (direction) {
    case Directions.UP:
      return Directions.DOWN
    case Directions.DOWN:
      return Directions.UP
    case Directions.LEFT:
      return Directions.RIGHT
    case Directions.RIGHT:
      return Directions.LEFT
  }
}

export default Directions
