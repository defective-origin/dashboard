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
// TODO: ERROR
// export class SizeBoardError extends BoardError {
//   constructor(message = 'Selected area does not match the size') {
//     super(message)
//     this.name = 'SizeBoardError'
//   }
// }
