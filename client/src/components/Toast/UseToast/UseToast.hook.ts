import { ToastOptions, showAlert, showGuard, showMessage } from 'components/Toast'
import { useCallback, useMemo, useState } from 'react'

export type UseToastReturnOptions = {
  message: (...args: ToastOptions[]) => void
  alert: (...args: ToastOptions[]) => void
  guard: (...args: ToastOptions[]) => void

  // TODO: (kseniya_boldak) move to ui page hook

  page: React.ReactNode
  setPageName: (name?: React.ReactNode) => void
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useToast(conf)
 */

export const useToast = (): UseToastReturnOptions => {
  const [page, setPage] = useState<React.ReactNode>('')

  const message = useCallback((...args: ToastOptions[]) => args.forEach(showMessage), [])
  const alert = useCallback((...args: ToastOptions[]) => args.forEach(showAlert), [])
  const guard = useCallback((...args: ToastOptions[]) => args.forEach(showGuard), [])

  //FIXME: (kseniya_boldak) Add portals in Page component for header name and actions

  const setPageName = useCallback((name?: React.ReactNode) => setPage(name), [])

  return useMemo(() => ({ message, alert, guard, setPageName, page }), [message, alert, guard, setPageName, page])
}

export default useToast
