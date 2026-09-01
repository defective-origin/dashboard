// ---| tests |---
import { render } from 'tests'

// ---| self |---
import MarkupBoard from './MarkupBoard.component'
// import useBoard from './MarkupBoard.hooks'
// import BoardProvider, MarkupBoard from './MarkupBoard.context'
import * as tools from './MarkupBoard.tools'

describe('[MarkupBoard] component', () => {
  it('should render component', () => {
    const container = render(<MarkupBoard />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

describe('[MarkupBoard] tools', () => {
  const options = {
    width: 992,
    height: '100%',
    areas: [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '.'],
    ],
    rows: ['1fr', '1fr', '1fr'],
    columns: ['1fr', '1fr', '1fr'],
    gap: ['4px', '4px'],
  }

  const emptyOptions = {
    width: 992,
    height: '100%',
    areas: [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ],
    rows: ['1fr', '1fr', '1fr'],
    columns: ['1fr', '1fr', '1fr'],
    gap: ['4px', '4px'],
  }

  const markup = {
    width: 992,
    height: "100%",
    areas: [
      [".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "."],
    ],
    gap: ["0","0"],
    rows: ["auto", "1fr", "4px", "1fr", "4px", "1fr", "auto"],
    columns: ["auto", "1fr", "4px", "1fr", "4px", "1fr", "auto"],
    items: {
      ".": { "endCol": 2, "endRow": 2, "startCol": 2, "startRow": 2 },
      "1": { "endCol": 0, "endRow": 0, "startCol": 0, "startRow": 0 },
      "2": { "endCol": 1, "endRow": 0, "startCol": 1, "startRow": 0 },
      "3": { "endCol": 2, "endRow": 0, "startCol": 2, "startRow": 0 },
      "4": { "endCol": 0, "endRow": 1, "startCol": 0, "startRow": 1 },
      "5": { "endCol": 1, "endRow": 1, "startCol": 1, "startRow": 1 },
      "6": { "endCol": 2, "endRow": 1, "startCol": 2, "startRow": 1 },
      "7": { "endCol": 0, "endRow": 2, "startCol": 0, "startRow": 2 },
      "8": { "endCol": 1, "endRow": 2, "startCol": 1, "startRow": 2 },
    },
  }

  describe('[toMarkupGrid] func', () => {
    it('should convert grid into markup', () => {
      expect(tools.toMarkupGrid(options)).toEqual(markup)
    })
  })

  describe('[toCssGrid] func', () => {
    it('should return css grid options', () => {
      expect(tools.toCssGrid(options)).toEqual({
        height: '100%',
        // minWidth: '992px',
        display: "grid",
        gap: "4px 4px",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        gridTemplateAreas: `"1 2 3"\n"4 5 6"\n"7 8 ."`,
      })
    })
  })

  describe('[initMarkup] func', () => {
    it('should return empty options', () => {
      expect(tools.initMarkup(992, 3, 3, 4)).toEqual(emptyOptions)
    })
  })
})

// describe('[MarkupBoard] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useBoard())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[MarkupBoard] context', () => {
//   const wrapper = (props: BoardProps) => <BoardProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useBoard(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
