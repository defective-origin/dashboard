import { useMemo, useRef, useState } from 'react'
import useFunc from '../UseFunc'

export type SnapshotReturnOptions<T> = {
  value: T
  hasPrev: boolean
  hasNext: boolean
  prev: () => void
  next: () => void
  pull: () => T
  push: (value: T) => void
  reset: (value?: T) => void
}

// TODO: rename to Stack?
/**
 * Allows to save value change history.
 *
 * @example
 * // if value is not set then undefined will be first value
 * const snapshot = useHistory()
 * console.log(snapshot.value) // undefined
 *
 * snapshot.push(2)
 * snapshot.push(3)
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
 * console.log(snapshot.value) // undefined
 * snapshot.reset(5)
 * console.log(snapshot.value) // 5
 *
 * <button disabled={!snapshot.hasPrev} onClick={snapshot.prev}>Undo</button>
 * <button disabled={!snapshot.hasNext} onClick={snapshot.next}>Redo</button>
 */
export function useHistory<T = undefined>(): SnapshotReturnOptions<T | undefined>;
export function useHistory<T>(value: T): SnapshotReturnOptions<T>;
export function useHistory(value?: unknown) {
  const [stack, setStack] = useState([value])
  const [position, setPosition] = useState(0)
  const hasPrev = position !== 0
  const hasNext = position !== stack.length - 1

  const update = useFunc((snapshots: unknown[], pos = 0) => {
    setStack(snapshots)
    setPosition(pos)
  })

  return useMemo(
    () => ({
      value: stack[position],
      hasPrev,
      hasNext,
      prev: () => { hasPrev && setPosition(position - 1) },
      next: () => { hasNext && setPosition(position + 1) },
      reset: (newValue = value) => update([newValue]),
      push: (value: unknown) => update([...stack, value], position + 1),
      pull: (value: unknown) => {
        // https://stackoverflow.com/questions/26568536/remove-all-items-after-an-index
        stack.length = position
        update(stack, position - 1)

        return value
      },
    }),
    [stack, position, hasPrev, hasNext, update, value],
  )
}

export default useHistory
