// ---| self |---
import * as tools from './Matrix.tools'


describe('[Matrix] tools', () => {
  const matrix = () => [
    [1, 2],
    [3, 4],
    [5, 6],
  ]

  const complexMatrix = () => [
    [0,2,0,0],
    [0,1,1,2],
    [2,1,1,0],
    [0,0,2,0],
  ]

  describe('[initMatrix] func', () => {
    it('should create matrix and fil it', () => {
      expect(tools.initMatrix(2, 3, () => 0)).toEqual([
        [0, 0, 0],
        [0, 0, 0],
      ])
    })
  })

  describe('[toString] func', () => {
    it('should return string matrix representation', () => {
      expect(tools.toString(matrix(), ' ')).toEqual(`"1 2"\n"3 4"\n"5 6"`)
    })
  })

  describe('[map] func', () => {
    it('should iterate by each item and return new matrix', () => {
      expect(tools.map(matrix(), item => item + 10)).toEqual([
        [11, 12],
        [13, 14],
        [15, 16],
      ])
    })
  })

  describe('[some] func', () => {
    it('should return true if some item is fit condition', () => {
      expect(tools.some(matrix(), item => item > 5)).toEqual(true)
      expect(tools.some(matrix(), item => item > 10)).toEqual(false)
    })
  })

  describe('[every] func', () => {
    it('should return true if all items are fit condition', () => {
      expect(tools.every(matrix(), item => item < 10)).toEqual(true)
      expect(tools.every(matrix(), item => item < 5)).toEqual(false)
    })
  })

  describe('[replace] func', () => {
    it('should replace one item to another', () => {
      expect(tools.replace(matrix(), 3, 0)).toEqual([
        [1, 2],
        [0, 4],
        [5, 6],
      ])
    })
  })

  describe('[replaceArea] func', () => {
    it('should replace area of matrix', () => {
      expect(tools.replaceArea(matrix(), 1, 0, 1, 1, -1)).toEqual([
        [1, 2],
        [-1, -1],
        [5, 6],
      ])
    })
  })

  describe('[toItems] func', () => {
    it('should return uniq items', () => {
      expect(tools.toItems(matrix())).toEqual([1, 2, 3, 4, 5, 6])
    })
  })

  describe('[selectArea] func', () => {
    it('should select sub matrix by coordinate', () => {
      expect(tools.selectArea(complexMatrix(), 1, 1, 2, 2)).toEqual([
        [1, 1],
        [1, 1],
      ])
    })
  })

  describe('[selectRowsMatch] func', () => {
    it('should return line with matched items in both lines or fill if not matching', () => {
      expect(tools.selectRowsMatch(complexMatrix(), 1, 2, -1)).toEqual([-1, 1, 1, -1])
    })

    it('should return line with empty values if index is not exist', () => {
      expect(tools.selectRowsMatch(complexMatrix(), 1, 9, -1)).toEqual([-1, -1, -1, -1])
    })
  })

  describe('[selectColumnsMatch] func', () => {
    it('should return line with matched items in both lines or fill if not matching', () => {
      expect(tools.selectColumnsMatch(complexMatrix(), 1, 2, -1)).toEqual([-1, 1, 1, -1])
    })

    it('should return line with empty values if index is not exist', () => {
      expect(tools.selectColumnsMatch(complexMatrix(), 1, 9, -1)).toEqual([-1, -1, -1, -1])
    })
  })

  describe('[extendRows] func', () => {
    it('should return line with matched items in both lines or fill if not matching', () => {
      expect(tools.extendRows(complexMatrix(), 1, 0)).toEqual([
        [0,2,0,0],
        [0,1,1,2],
        [0,1,1,2],
        [2,1,1,0],
        [0,0,2,0],
      ])
    })
  })

  describe('[extendColumns] func', () => {
    it('should return line with matched items in both lines or fill if not matching', () => {
      expect(tools.extendColumns(complexMatrix(), 1, 0)).toEqual([
        [0,2,2,0,0],
        [0,1,1,1,2],
        [2,1,1,1,0],
        [0,0,0,2,0],
      ])
    })
  })

  describe('[selectRow] func', () => {
    it('should select row by index', () => {
      expect(tools.selectRow(matrix(), 1)).toEqual([3, 4])
    })
  })

  describe('[selectColumn] func', () => {
    it('should select row by index', () => {
      expect(tools.selectColumn(matrix(), 1)).toEqual([2, 4, 6])
    })
  })

  describe('[insertRow] func', () => {
    it('should insert row by index', () => {
      expect(tools.insertRow(matrix(), 1, [0, 0])).toEqual([
        [1, 2],
        [0, 0],
        [3, 4],
        [5, 6],
      ])
    })
  })

  describe('[insertColumn] func', () => {
    it('should insert column by index', () => {
      expect(tools.insertColumn(matrix(), 1, [0, 0, 0])).toEqual([
        [1, 0, 2],
        [3, 0, 4],
        [5, 0, 6],
      ])
    })
  })

  describe('[removeRow] func', () => {
    it('should remove row by index', () => {
      expect(tools.removeRow(matrix(), 1)).toEqual([
        [1, 2],
        [5, 6],
      ])
    })
  })

  describe('[removeColumn] func', () => {
    it('should remove column by index', () => {
      expect(tools.removeColumn(matrix(), 1)).toEqual([
        [1],
        [3],
        [5],
      ])
    })
  })

  describe('[around] func', () => {
    it('should remove column by index', () => {
      expect(tools.around(matrix(), 0)).toEqual([
        [0, 0, 0, 0],
        [0, 1, 2, 0],
        [0, 3, 4, 0],
        [0, 5, 6, 0],
        [0, 0, 0, 0],
      ])
    })
  })
})
