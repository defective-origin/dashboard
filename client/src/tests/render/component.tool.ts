// eslint-disable-next-line import/no-extraneous-dependencies
import { render, fireEvent, RenderResult, waitForElementToBeRemoved, waitFor, Matcher, RenderOptions } from '@testing-library/react'

// FIXME: В testing-library/react события не нужно оборачивать в act(он содержится в waitFor). Следовательно также не нужен вэйтер https://testing-library.com/docs/react-testing-library/migrate-from-enzyme/#using-act-and-wrapperupdate

// TESTING LIBRARY IMPLEMENTATION
export default class ComponentTestUtil {
  private render: RenderResult

  // LIFECYCLE
  private constructor(...args: Parameters<typeof render>) {
    this.render = render(...args)
  }

  // public static render(...args: Parameters<typeof render>): ComponentTestUtil {
  public static render(ui: React.ReactElement, options: Omit<RenderOptions, 'queries'> = {}): ComponentTestUtil {
    return new ComponentTestUtil(ui, options)
  }

  public rerender(...args: Parameters<RenderResult['rerender']>): this {
    this.render.rerender(...args)

    return this
  }

  public unmount(): this {
    this.render.unmount()

    return this
  }

  // EVENTS
  public setValue(id: Matcher, value: string | number): this {
    fireEvent.change(this.get(id), { target: { value } })

    return this
  }

  private _click<T extends HTMLElement>(elem: T): this {
    fireEvent.click(elem)

    return this
  }

  public click(id: Matcher): this {
    return this._click(this.get(id))
  }

  public clickOnText(id: Matcher): this {
    return this._click(this.getByText(id))
  }

  public focus(id: Matcher): this {
    fireEvent.focus(this.get(id))

    return this
  }

  public blur(id: Matcher): this {
    fireEvent.blur(this.get(id))

    return this
  }

  // SELECTORS
  public get<T extends HTMLElement>(id: Matcher): T {
    return this.render.getByTestId(id) as T
  }

  public getByText<T extends HTMLElement>(id: Matcher): T {
    return this.render.getByText(id) as T
  }

  public getAll(id: Matcher): HTMLElement[] {
    return this.render.getAllByTestId(id)
  }

  // findBy = getBy + waitFor
  // eslint-disable-next-line max-len
  // public find<T extends HTMLElement = HTMLElement>(...args: Parameters<RenderResult['findByTestId']>) {
  //   return this.render.findByTestId(...args) as Promise<T>
  // }

  // public findByText<T extends HTMLElement>(...args: Parameters<RenderResult['findByText']>) {
  //   return this.render.findByText(...args) as Promise<T>
  // }

  // public findAll(...args: Parameters<RenderResult['findAllByTestId']>) {
  //   return this.render.findAllByTestId(...args)
  // }

  // public findAllByText(...args: Parameters<RenderResult['findAllByText']>) {
  //   return this.render.findAllByText(...args)
  // }

  // CHECKS
  public snapshot(base = false): Element | DocumentFragment {
    return base ? this.render.baseElement : this.render.asFragment()
  }

  public isEmpty(): boolean {
    return this.render.container.firstChild === null
  }

  public debug(...args: Parameters<RenderResult['debug']>): this {
    this.render.debug(...args)

    return this
  }

  // EXTENSIONS
  // private act = act
  // public wait() {
  //   return this.act(() => new Promise(setImmediate))
  // }

  public waitFor = waitFor

  public waitForElementToBeRemoved = waitForElementToBeRemoved
}
