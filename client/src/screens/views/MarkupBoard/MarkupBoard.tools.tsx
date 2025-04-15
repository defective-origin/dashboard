import { arr, matrix } from 'tools'

export const EMPTY_CELL = '.'
export const CSS_VARS_SPACE = ' '
export const DEFAULT_CSS_SIZE = '1fr'

export type MarkupOptions = {
  /** Height relative to container */
  height: string
  /** Max width */
  width: number
  /** Row sizes */
  rows: string[]
  /** Column sizes */
  columns: string[]
  /** space between rows and columns */
  gap: string[]
  /** Board layout */
  areas: string[][]
}


const px = (value: string | number) => `${value}px`


/** Create grid config */
export function initMarkup(width: number, rows: number, columns: number, gap: number): MarkupOptions {
  return {
    width,
    height: '100%',
    areas: matrix.initMatrix(rows, columns, () => EMPTY_CELL),
    rows: arr.repeat(rows, () => DEFAULT_CSS_SIZE),
    columns: arr.repeat(columns, () => DEFAULT_CSS_SIZE),
    gap: arr.repeat(rows, () => px(gap)),
  }
}

export function toMarkupGrid(options: MarkupOptions) {
  const gap = ['0','0']
  const rows = ['auto', ...arr.between(options.rows, options.gap[0]), 'auto']
  const columns = ['auto', ...arr.between(options.columns, options.gap[1]), 'auto']
  const areas = matrix.initMatrix(rows.length, columns.length, () => EMPTY_CELL)
  const items = matrix.toPlaces(options.areas)

  return { ...options, rows, columns, areas, gap, items }
}

/** Convert into css grid options */
export function toCssGrid(options: MarkupOptions) {
  return {
    display: 'grid',
    height: options.height,
    // minWidth: px(options.width),
    gridTemplateRows: options.rows.join(CSS_VARS_SPACE),
    gridTemplateColumns: options.columns.join(CSS_VARS_SPACE),
    // gridTemplateAreas: matrix.toString(options.areas),
    gap: options.gap.join(CSS_VARS_SPACE),
  }
}

/** return markup items */
export function toItems(options?: MarkupOptions) {
  if (!options) {
    return []
  }

  return matrix.toItems(options.areas).filter(item => item !== EMPTY_CELL)
}


/** return markup items */
export function sort(items: MarkupOptions[] = []) {
  return items?.sort((a, b) => a.width - b.width)
}


/** return grid area */
export function toArea(row1: number, col1: number, row2 = row1, col2 = col1, mul = 1) {
  return `${(row1 + 1) * mul}/${(col1 + 1) * mul}/${(row2 + 1) * mul + 1}/${(col2 + 1) * mul + 1}`
}
