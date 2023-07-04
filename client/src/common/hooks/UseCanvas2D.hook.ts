import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'

// ---| common |---
import { canvas } from 'common/tools'

export const PAINTER_MAP = {
  line: canvas.LinePainter2D.paint,
  grid: canvas.GridPainter2D.paint,
  card: canvas.SquarePainter2D.paint,
}

export type Item = { type: 'line', options?: canvas.LineShapeOptions, styles?: canvas.ShapeStyleOptions }
| { type: 'card', options?: canvas.SquareShapeOptions, styles?: canvas.ShapeStyleOptions }
| { type: 'grid', options?: canvas.GridShapeOptions, styles?: canvas.ShapeStyleOptions }

export type Canvas2DPainterOptions = {
  context: CanvasRenderingContext2D
  paintLine: (options?: canvas.LineShapeOptions, styles?: canvas.ShapeStyleOptions) => void
  paintGrid: (options?: canvas.GridShapeOptions, styles?: canvas.ShapeStyleOptions) => void
  paintCard: (options?: canvas.SquareShapeOptions, styles?: canvas.ShapeStyleOptions) => void
  paint: (item: Item) => void
  paintItems: (item: Item[]) => void
  clear: (area?: canvas.SquareShapeOptions) => void
}

export type Canvas2DReturnOptions = Omit<Canvas2DPainterOptions, 'context'> & {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
  redraw: () => void
}

export function useCanvas2D(
  ref: React.MutableRefObject<HTMLCanvasElement | null>,
  options: {
    painter?: (options: Canvas2DPainterOptions) => void
    items?: Item[]
  } & CanvasRenderingContext2DSettings = {},
  deps: any[] = [],
): Canvas2DReturnOptions {
  const canvasRef = useRef<HTMLCanvasElement | null>(ref.current || null)
  const context = useMemo(() => canvasRef.current?.getContext('2d', options), [canvasRef.current])

  useLayoutEffect(() => { canvasRef.current = ref.current }, [ref.current])

  const paintLine = useCallback(canvas.LinePainter2D.paint.bind(null, context), [context])
  const paintGrid = useCallback(canvas.GridPainter2D.paint.bind(null, context), [context])
  const paintCard = useCallback(canvas.SquarePainter2D.paint.bind(null, context), [context])

  const paint = useCallback((item: Item) => PAINTER_MAP[item.type](context, item.options, item.styles), [context])
  const paintItems = useCallback((items: Item[] = []) => items.forEach(paint), [paint])

  const clear = useCallback((area?: canvas.SquareShapeOptions) => canvas.clear(context, area), [context])

  const redraw = useCallback(() => {
    if (context) {
      clear()
      paintItems(options.items)
      options.painter?.({ context, paint, paintItems, clear, paintLine, paintGrid, paintCard })
    }
  }, [context, clear, paintItems, paintLine, paintGrid, paintCard, options.items, options.painter])

  useEffect(() => {
    redraw()

    return clear
  }, [clear, redraw, ...deps])

  return useMemo(
    () => ({ canvasRef, paint, paintItems, paintLine, paintGrid, paintCard, clear, redraw }),
    [canvasRef, paint, paintItems, paintLine, paintGrid, paintCard, clear, redraw],
  )
}

export default useCanvas2D
