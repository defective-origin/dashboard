import { useCallback, useMemo, useState } from 'react'

export type UseDialogReturnOptions = {
  onClickOpen: () => void
  onClose: () => void
  open: boolean
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useDialog(conf)
 */
export const useDialog = (): UseDialogReturnOptions => {
  const [open, setOpen] = useState(false)

  const onClickOpen = useCallback(() => setOpen(true), [])

  const onClose = useCallback(() => setOpen(false), [])

  return useMemo<UseDialogReturnOptions>(() => ({ onClickOpen, onClose, open }), [onClickOpen, onClose, open])
}

export default useDialog
