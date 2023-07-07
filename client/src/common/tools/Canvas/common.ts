import { Square, square, squareHeight, squareWidth } from '../Placement'

export type ShapeStyleOptions =
  Partial<CanvasShadowStyles> & // shadow
  Partial<Omit<CanvasPathDrawingStyles, 'getLineDash' | 'setLineDash'>> & // line
  Partial<Pick<CanvasFillStrokeStyles, 'fillStyle' | 'strokeStyle'>> // colors

export type CanvasOrContext = HTMLCanvasElement | RenderingContext | null

export function initCanvasContext(elem?: CanvasOrContext | null, contextId?: '2d', options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D | null
export function initCanvasContext(elem?: CanvasOrContext | null, contextId?: 'bitmaprenderer', options?: ImageBitmapRenderingContextSettings): ImageBitmapRenderingContext | null
export function initCanvasContext(elem?: CanvasOrContext | null, contextId?: 'webgl', options?: WebGLContextAttributes): WebGLRenderingContext | null
export function initCanvasContext(elem?: CanvasOrContext | null, contextId?: 'webgl2', options?: WebGLContextAttributes): WebGL2RenderingContext | null
export function initCanvasContext(elem?: CanvasOrContext | null, contextId = '2d', options?: any): RenderingContext | null {
  return elem instanceof HTMLElement ? elem.getContext(contextId, options) : elem ?? null
}

export function clear(canvas?: CanvasOrContext, area?: Square): void {
  const context = initCanvasContext(canvas, '2d')

  if (context) {
    const canvasArea = area ? area : square(0, context.canvas.width, context.canvas.height)

    context.clearRect(
      canvasArea.v1.x,
      canvasArea.v1.y,
      squareWidth(canvasArea),
      squareHeight(canvasArea),
    )
  }
}

export function setCanvasStyles(canvas: CanvasOrContext, styles: ShapeStyleOptions): void {
  const context = initCanvasContext(canvas, '2d')

  if (context) {
    Object.assign(context, styles)
  }
}

export type Painter2DFunction<TOptions> = (
  ctx: CanvasRenderingContext2D,
  options: TOptions,
  styles: ShapeStyleOptions,
) => void

export function painter2D<T>(callback: Painter2DFunction<T>) {
  return {
    paint(canvas?: CanvasOrContext, options = {} as T, styles: ShapeStyleOptions = {}): void {
      const context = initCanvasContext(canvas, '2d')
    
      if (context) {
        // Note: Be aware that clearRect() may cause unintended
        // side effects if you're not using paths properly.
        // Make sure to call beginPath() before
        // starting to draw new items after calling clearRect().
        context.beginPath()
    
        setCanvasStyles(context, styles)
        callback(context, options, styles)
      }
    },
    clean(canvas?: CanvasOrContext, options = {} as T, styles: ShapeStyleOptions = {}): void {
      const context = initCanvasContext(canvas, '2d')
    
      if (context) {
        // to clear pixels which we are painted
        context.globalCompositeOperation = 'destination-out'
    
        setCanvasStyles(context, styles)
        callback(context, options, styles)
      }
    }
  }
}
