export class BoardError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BoardError' // (2)
  }
}

export class PositionBoardError extends BoardError {
  constructor(message = 'Position is occupied') {
    super(message) // (1)
    this.name = 'PositionBoardError'
  }
}
