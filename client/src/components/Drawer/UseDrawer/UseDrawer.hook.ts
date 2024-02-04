import { useCallback, useMemo, useState } from 'react'

export type AnchorVariant = {
  top: boolean
  left: boolean
  bottom: boolean
  right: boolean
}

export type UseDrawerReturnOptions = {
  toggle: (anchor: keyof AnchorVariant, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
  side: AnchorVariant
}


/**
 * Hook descriptions
 *
 * @example
 * const options = useDrawer(conf)
 */
export const useDrawer = (): UseDrawerReturnOptions => {
  const [side, setSide] = useState<AnchorVariant>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggle = useCallback((anchor: keyof AnchorVariant, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown'
          && ((event as React.KeyboardEvent).key === 'Tab'
          || (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setSide({ ...side, [anchor]: open })
    }, [side])

  return useMemo<UseDrawerReturnOptions>(() => ({ toggle, side }), [toggle, side])
}

export default useDrawer
