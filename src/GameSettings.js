class GameSettings {
  static BLOCK_SIZE
  static FRAME_WIDTH
  static FRAME_HEIGHT

  static get WIDTH_IN_BLOCKS() {
    if (!this.FRAME_WIDTH || !this.BLOCK_SIZE)
      throw Error(
        "FRAME_WIDTH and BLOCK_SIZE settings must be set before getting WIDTH_IN_BLOCKS"
      )
    return this.FRAME_WIDTH / this.BLOCK_SIZE
  }

  static get HEIGHT_IN_BLOCKS() {
    if (!this.FRAME_HEIGHT || !this.BLOCK_SIZE)
      throw Error(
        "FRAME_HEIGHT and BLOCK_SIZE settings must be set before getting HEIGHT_IN_BLOCKS"
      )
    return this.FRAME_HEIGHT / this.BLOCK_SIZE
  }
}

export default GameSettings
