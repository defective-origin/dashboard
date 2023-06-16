import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'

// ---| common |---
import { Canvas } from 'common/tools'

export const PAINTER_MAP = {
  line: Canvas.LinePainter2D.paint,
  grid: Canvas.GridPainter2D.paint,
  card: Canvas.SquarePainter2D.paint,
}

export type Item = { type: 'line', options?: Canvas.LineShapeOptions, styles?: Canvas.ShapeStyleOptions }
| { type: 'card', options?: Canvas.SquareShapeOptions, styles?: Canvas.ShapeStyleOptions }
| { type: 'grid', options?: Canvas.GridShapeOptions, styles?: Canvas.ShapeStyleOptions }

export type Canvas2DPainterOptions = {
  context: CanvasRenderingContext2D
  paintLine: (options?: Canvas.LineShapeOptions, styles?: Canvas.ShapeStyleOptions) => void
  paintGrid: (options?: Canvas.GridShapeOptions, styles?: Canvas.ShapeStyleOptions) => void
  paintCard: (options?: Canvas.SquareShapeOptions, styles?: Canvas.ShapeStyleOptions) => void
  paint: (item: Item) => void
  paintItems: (item: Item[]) => void
  clear: (area?: Canvas.SquareShapeOptions) => void
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

  const paintLine = useCallback(Canvas.LinePainter2D.paint.bind(null, context), [context])
  const paintGrid = useCallback(Canvas.GridPainter2D.paint.bind(null, context), [context])
  const paintCard = useCallback(Canvas.SquarePainter2D.paint.bind(null, context), [context])

  const paint = useCallback((item: Item) => PAINTER_MAP[item.type](context, item.options, item.styles), [context])
  const paintItems = useCallback((items: Item[] = []) => items.forEach(paint), [paint])

  const clear = useCallback((area?: Canvas.SquareShapeOptions) => Canvas.clear(context, area), [context])

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
