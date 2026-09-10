import React from 'react'
import {
  RenderOptions as RenderOptionsTL,
  renderHook as renderHookTL,
  RenderHookOptions as RenderHookOptionsTL,
} from '@testing-library/react'

// ---| core |---
import { MockLauncher } from 'App/App.launcher'

// ---| self |---
import ComponentTestUtil from './component.tools'

export type LauncherOptions = {
  /** Connect App launcher with all providers */
  launcher: true
}

export type RenderOptions = Omit<RenderOptionsTL, 'queries' | 'wrapper'> & LauncherOptions

/**
 * Render react component for testing.  
 * Connect App launcher if necessary.
 * @example
 * // with app context providers
 * render(<Component />, { launcher: true })
 *
 * // without some render options
 * render(<Component />, { opt1: true, opt2: false })
 *
 * // without any contexts
 * render(<Component />)
 */
export const render = (ui: React.ReactElement, options?: RenderOptions) => {
  return ComponentTestUtil.render(ui, { wrapper: options?.launcher && MockLauncher, ...options })
}

export type RenderHookOptions<Props> = Omit<RenderHookOptionsTL<Props>, 'queries' | 'wrapper'> & LauncherOptions

/**
 * Render hook for testing.  
 * Connect App launcher if necessary.
 * @example
 * // with app context providers
 * renderHook(() => useHook(), { launcher: true })
 *
 * // without some render options
 * renderHook(() => useHook(), { opt1: true, opt2: false })
 *
 * // without any contexts
 * renderHook(() => useHook())
 */
export const renderHook = <Result, Props>(render: (initialProps: Props) => Result, options?: RenderHookOptions<Props>) => {
  return renderHookTL(render, { wrapper: options?.launcher && MockLauncher, ...options })
}
