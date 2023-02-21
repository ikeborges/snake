class GameSettings {
  WIDTH_IN_BLOCKS: number;
  HEIGHT_IN_BLOCKS: number;

  constructor(
    public BLOCK_SIZE: number,
    public FRAME_WIDTH: number,
    public FRAME_HEIGHT: number
  ) {
    this.WIDTH_IN_BLOCKS = FRAME_WIDTH / BLOCK_SIZE;
    this.HEIGHT_IN_BLOCKS = FRAME_HEIGHT / BLOCK_SIZE;
  }
}

export default new GameSettings(20, 400, 600);
