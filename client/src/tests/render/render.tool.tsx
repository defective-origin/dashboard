// eslint-disable-next-line import/no-extraneous-dependencies
import { RenderOptions, render as renderTestComponent } from '@testing-library/react'
import React from 'react'

export function withWrapper<
  TWrapper extends React.ComponentType<TProps>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  TProps extends object = React.ComponentProps<TWrapper>,
>(Component: React.JSXElementConstructor<TProps>) {
  return function wrapProps(wrappedProps?: Omit<TProps, 'children'>): React.FC<TProps> {
    return function overrideWrapper(props: TProps) {
      return <Component {...wrappedProps} {...props} />
    }
  }
}

export type CustomRenderOptions = Omit<RenderOptions, 'queries' | 'wrapper'>

/**
 * Build custom render function with wrapper and override default options.
 * @example
 * import { renderHook } from "@testing-library/react-hooks"
 * import React from "react"
 * import ComponentTestUtil from "./component.utils"
 * import { buildCustomRender } from "./render.utils"
 *
 * const ThemeContext = React.createContext('light')
 * const LocalizationContext = React.createContext(null)
 * const UserContext = React.createContext(null)
 *
 * type MockRootModuleProps = {
 *   mockLocalizationProps?: any
 *   mockThemeProps?: any
 *   mockUserProps?: any
 *   children?: React.ReactNode
 * }
 *
 * export function MockRootModule(props: MockRootModuleProps) {
 *   return (
 *     <LocalizationContext.Provider value={props.mockLocalizationProps}>
 *       <ThemeContext.Provider value={props.mockThemeProps}>
 *         <UserContext.Provider value={props.mockUserProps}>
 *           {props.children}
 *         </UserContext.Provider>
 *       </ThemeContext.Provider>
 *     </LocalizationContext.Provider>
 *   )
 * }
 *
 * const render = ComponentTestUtil.render
 * const renderWithRootModule = buildCustomRender(ComponentTestUtil.render, MockRootModule)
 *
 * export { render, renderWithRootModule, renderHook }
 *
 * renderWithRootModule(<Component/>, {
 *   mockLocalizationProps: {},
 *   mockThemeProps: {},
 *   mockUserProps: {},
 * })
 *
 * @param render Render function.
 * @param wrapper Component which wrap test component.
 * @param defaultOptions Default options for render which can be overrided.
 * @returns Custom render function.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function buildCustomRender<
  TRender extends (...args: Parameters<typeof renderTestComponent>) => any,
  TWrapper extends React.ComponentType<any>,
>(render: TRender, wrapper?: TWrapper, defaultOptions: CustomRenderOptions = {}) {
  const wrappedModule = wrapper && withWrapper(wrapper)
  return function customRender(
    ui: React.ReactElement,
    wrapperProps?: React.ComponentProps<TWrapper>,
    options: CustomRenderOptions = {},
  ): ReturnType<TRender> {
    const wrappedTestComponent = wrappedModule && wrappedModule(wrapperProps)
    return render(ui, { wrapper: wrappedTestComponent, ...defaultOptions, ...options })
  }
}
