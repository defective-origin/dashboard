// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useTestLauncher } from './TestLauncher.context'
import TestLauncher, { TestLauncherProps } from './TestLauncher.component'

/**
 * Context descriptions
 *
 * @example
 * const { result } = renderHook(() => useCounter())
 *
 * act(() => {
 *   result.current.increment()
 * })
 *
 * expect(result.current.count).toBe(1)
 */
describe('[TestLauncher] context', () => {
  const wrapper = (props: TestLauncherProps) => <TestLauncher { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useTestLauncher(), { wrapper })

    expect(result.current).toBeTruthy()
  })
})
