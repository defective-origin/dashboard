import { canvas } from 'common/tools'

// ---| self |---
import styles from './SelectionBoard.module.scss'

export type SelectionBoardStyles = {
  card?: {
    radius?: number
    invalid?: canvas.ShapeStyleOptions
    valid?: canvas.ShapeStyleOptions
    outdated?: canvas.ShapeStyleOptions
  }
  grid?: canvas.ShapeStyleOptions
}

export const DEFAULT_STYLES: Required<SelectionBoardStyles> = {
  card: {
    radius: 2,
    invalid: {
      strokeStyle: styles.invalidCardColor,
      fillStyle: styles.invalidCardColor,
      lineWidth: 2,
    },
    valid: {
      strokeStyle: styles.validCardColor,
      fillStyle: styles.validCardColor,
      lineWidth: 2,
    },
    outdated: {
      strokeStyle: styles.outdatedCardColor,
      fillStyle: styles.outdatedCardColor,
      lineWidth: 2,
    },
  },
  grid: {
    strokeStyle: styles.gridLineColor,
    lineWidth: 1,
  },
}
