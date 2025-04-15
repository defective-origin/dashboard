export type MatrixCoordinate = {
  startRow: number
  endRow: number
  startCol: number
  endCol: number
}

export const toCoordinate = (row1: number, column1: number, row2 = row1, column2 = column1): MatrixCoordinate => ({
  startRow: Math.min(row1, row2),
  endRow: Math.max(row1, row2),
  startCol: Math.min(column1, column2),
  endCol: Math.max(column1, column2),
})


export const initMatrix = <T>(rows: number, columns: number, fill: (row: number, column: number) => T) => {
  return Array.from({ length: rows }, (_, row) => Array.from({ length: columns }, (_, column) => fill(row, column)))
}

export const toString = <T>(matrix: T[][], sep = ' ') => {
  return matrix.map(line => `"${line.join(sep)}"`).join('\n')
}


export const checkMatrix = <T>(matrix: T[][]) => {
  if (matrix.length === 0 || !Array.isArray(matrix[0])) {
    throw new Error('Matrix is empty or improperly formatted.')
  }
}

export const checkMatrixIndex = (length: number, index: number) => {
  if (index < 0 || index >= length) {
    throw new Error(`Invalid index. It should be between 0 and ${length - 1}. Current: ${index}`)
  }
}

export const checkMatrixLine = (matrixLength: number, lineLength: number) => {
  if (matrixLength !== lineLength) {
    throw new Error(`The length of the line (${lineLength}) must match the number of lines (${matrixLength}) in the matrix.`)
  }
}

/** iterate by each item and return new matrix */
export const map = <T>(matrix: T[][], iter: (cell: T, row: number, column: number) => T) => {
  checkMatrix(matrix)

  return matrix.map((row, rowIndex) => row.map((cell, columnIndex) => iter(cell, rowIndex, columnIndex)))
}

/** return matrix clone */
export const clone = <T>(matrix: T[][]) => map(matrix, cell => cell)

/** Determines whether the specified callback function returns true for any element of an matrix */
export const some = <T>(matrix: T[][], iter: (item: T, row: number, column: number) => boolean) => {
  checkMatrix(matrix)

  return matrix.some((row, rowIndex) => row.some((cell, columnIndex) => iter(cell, rowIndex, columnIndex)))
}

/** Determines whether all the members of an array satisfy the specified test */
export const every = <T>(matrix: T[][], iter: (item: T, row: number, column: number) => boolean) => {
  checkMatrix(matrix)

  return matrix.every((row, rowIndex) => row.every((cell, columnIndex) => iter(cell, rowIndex, columnIndex)))
}

/** replace one item to another */
export const replace = <T>(matrix: T[][], from: T, to: T) => {
  checkMatrix(matrix)

  return map(matrix, item => item === from ? to : item)
}

/** replace area of matrix */
export const replaceArea = <T>(matrix: T[][], row1: number, column1: number, row2: number, column2: number, value: T) => {
  checkMatrix(matrix)

  const place = toCoordinate(row1, column1, row2, column2)

  for (let i = place.startRow; i <= place.endRow; i++) {
    for (let j = place.startCol; j <= place.endCol; j++) {
      matrix[i][j] = value
    }
  }

  return clone(matrix)
}

/** return uniq matrix items */
export const toItems = <T>(matrix: T[][] = []): T[] => {
  checkMatrix(matrix)

  const items = new Set(matrix.flat())

  return [...items]
}


/** Parse matrix and return item places */
export const toPlaces = <T extends string | number>(matrix: T[][]): Record<T, MatrixCoordinate> => {
  const places = {} as Record<T, MatrixCoordinate>

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      const cell = matrix[r][c]
      if (!places[cell]) {
        places[cell] = toCoordinate(r, c)
      } else {
        places[cell].endRow = r
        places[cell].endCol = Math.max(places[cell].endCol, c)
      }
    }
  }

  return places
}


/** select sub matrix by coordinate */
export const selectArea = <T>(matrix: T[][], row1: number, column1: number, row2: number, column2: number) => {
  checkMatrix(matrix)

  const place = toCoordinate(row1, column1, row2, column2)

  const area = []
  for (let i = place.startRow; i <= place.endRow; i++) {
    const row = []
    for (let j = place.startCol; j <= place.endCol; j++) {
      row.push(matrix[i][j])
    }
    area.push(row)
  }

  return area
}

/** return line with matched items in both lines or fill if not matching */
export const selectRowsMatch = <T>(matrix: T[][], index1: number, index2: number, fill: T) => {
  checkMatrix(matrix)

  // return line with empty values if index is not correct
  if (matrix[index1] === undefined || matrix[index2] === undefined) {
    return matrix[0].map(() => fill)
  }

  return matrix[0].map((_, idx) => {
    return matrix[index1][idx] === matrix[index2][idx] ? matrix[index1][idx] : fill
  })
}

/** return line with matched items in both lines or fill if not matching */
export const selectColumnsMatch = <T>(matrix: T[][], index1: number, index2: number, fill: T) => {
  checkMatrix(matrix)

  // return line with empty values if index is not correct
  if (matrix[index1] === undefined || matrix[index2] === undefined) {
    return matrix.map(() => fill)
  }

  return matrix.map(row => {
    return row[index1] === row[index2] ? row[index1] : fill
  })
}

/** select a specific row from the matrix */
export const selectRow = <T>(matrix: T[][], index: number) => {
  checkMatrix(matrix)
  checkMatrixIndex(matrix.length, index)

  return matrix[index]
}

/** select a specific column from the matrix */
export const selectColumn = <T>(matrix: T[][], index: number) => {
  checkMatrix(matrix)
  checkMatrixIndex(matrix[0].length, index)

  return matrix.map(row => row[index])
}

/** insert a row to the matrix by index */
export const insertRow = <T>(matrix: T[][], index: number, row: T[]) => {
  checkMatrix(matrix)
  checkMatrixLine(matrix[0].length, row.length)

  matrix.splice(index, 0, row)
  return clone(matrix)
}

/** insert a column to the matrix by index */
export const insertColumn = <T>(matrix: T[][], index: number, column: T[]) => {
  checkMatrix(matrix)
  checkMatrixLine(matrix.length, column.length)

  for (let i = 0; i < matrix.length; i++) {
    matrix[i].splice(index, 0, column[i])
  }

  return clone(matrix)
}

/** remove a row from the matrix */
export const removeRow = <T>(matrix: T[][], index: number) => {
  checkMatrix(matrix)
  checkMatrixIndex(matrix.length, index)

  matrix.splice(index, 1)
  return clone(matrix)
}

/** remove a column from the matrix */
export const removeColumn = <T>(matrix: T[][], index: number) => {
  checkMatrix(matrix)
  checkMatrixIndex(matrix[0].length, index)

  for (let i = 0; i < matrix.length; i++) {
    matrix[i].splice(index, 1)
  }

  return clone(matrix)
}

/** extend rows by index */
export const extendRows = <T>(matrix: T[][], index: number, empty: T) => {
  checkMatrix(matrix)

  const line = selectRowsMatch(matrix, index, index, empty)

  return insertRow(matrix, index + 1, line)
}

/** extend columns by index */
export const extendColumns = <T>(matrix: T[][], index: number, empty: T) => {
  checkMatrix(matrix)

  const line = selectColumnsMatch(matrix, index, index, empty)

  return insertColumn(matrix, index + 1, line)
}


/** Add item around matrix  */
export const around = <T>(matrix: T[][], what: T): T[][] => {
  const rows = matrix.length
  const cols = matrix[0].length

  const result = initMatrix(rows + 2, cols + 2, () => what)

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[i + 1][j + 1] = matrix[i][j]
    }
  }

  return result
}


export default {
  initMatrix,
  toString,
  toCoordinate,
  toItems,
  toPlaces,
  map,
  some,
  clone,
  every,
  replace,
  replaceArea,
  selectArea,
  selectRowsMatch,
  selectColumnsMatch,
  selectRow,
  selectColumn,
  insertRow,
  insertColumn,
  removeRow,
  removeColumn,
  extendRows,
  extendColumns,
  around,
}
