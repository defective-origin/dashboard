// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useLauncher } from './Launcher.context'
import Launcher, { LauncherProps } from './Launcher.component'


describe('[Launcher] context', () => {
  const wrapper = (props: LauncherProps) => <Launcher { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useLauncher(), { wrapper })

    expect(result.current).toBeTruthy()
  })
})
