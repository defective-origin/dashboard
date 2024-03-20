import { useCallback, useMemo, useRef, useState } from 'react'

// ---| core |---

export type SnapshotReturnOptions<T> = {
  value: T
  hasPrev: boolean
  hasNext: boolean
  prev: () => void
  next: () => void
  set: (value: T) => void
  reset: (value?: T) => void
}

/**
 * Hook descriptions
 *
 * @example
 * const snapshot = useSnapshot(1)
 *
 * snapshot.set(2)
 * snapshot.set(3)
 * console.log(snapshot.value) // 3
 *
 * // navigate by snapshot history
 * snapshot.prev()
 * console.log(snapshot.value) // 2
 * snapshot.next()
 * console.log(snapshot.value) // 3
 *
 * // reset snapshot history
 * snapshot.reset()
 * console.log(snapshot.value) // 1
 * snapshot.reset(5)
 * console.log(snapshot.value) // 5
 *
 * <button disabled={!snapshot.hasPrev} onClick={snapshot.prev}>Undo</button>
 * <button disabled={!snapshot.hasNext} onClick={snapshot.next}>Redo</button>
 */
export const useSnapshot = <T>(value: T): SnapshotReturnOptions<T> => {
  const snapshotsRef = useRef([value])
  const [position, setPosition] = useState(0)
  const hasPrev = position !== 0
  const hasNext = position !== snapshotsRef.current.length - 1

  const update = useCallback((snapshots: T[]) => {
    snapshotsRef.current = snapshots
    setPosition(snapshotsRef.current.length - 1)
  }, [])

  return useMemo(
    () => ({
      value: snapshotsRef.current[position],
      hasPrev,
      hasNext,
      prev: () => { hasPrev && setPosition(position - 1) },
      next: () => { hasNext && setPosition(position + 1) },
      set: (value: T) => update(snapshotsRef.current.splice(0, position + 1).concat(value)),
      reset: (newValue: T = value) => update([newValue]),
    }),
    [position, hasPrev, hasNext, update, value],
  )
}

export default useSnapshot
