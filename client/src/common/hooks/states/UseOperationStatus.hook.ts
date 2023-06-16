import { useCallback, useLayoutEffect } from 'react';
import { StatusReturnOptions, useStatus } from './UseStatus.hook';
import { TypeHandler } from './UseType.hook';

export type OperationStatus = {
  started: boolean;
  completed: boolean;
  canceled: boolean;
  stopped: boolean;
  failed: boolean;
}

export type OperationStatusReturnOptions = StatusReturnOptions<OperationStatus>
  & TypeHandler<'start', () => void>
  & TypeHandler<'complete', () => void>
  & TypeHandler<'fail', () => void>
  & TypeHandler<'stop', () => void>
  & TypeHandler<'cancel', () => void>


const OPERATION_STATUS_DEFAULT_VALUE: OperationStatus = {
  started: false,
  completed: false,
  canceled: false,
  stopped: false,
  failed: false,
}

/**
 * Allows to manipulate operation statuses.
 *
 * @example
 * // any value will be converted into boolean value
 * const operationStatus = useOperationStatus()
 *
 * // change several values
 * operationStatus.change({ started: false, failed: true })
 *
 * // toggle by status key name
 * operationStatus.toggle('started')
 * operationStatus.toggle('failed')
 *
 * // restore init value
 * operationStatus.reset()
 *
 * // operation toggle functions
 * operationStatus.start()
 * operationStatus.complete()
 * operationStatus.fail()
 * operationStatus.stop()
 * operationStatus.cancel()
 *
 * // flags
 * operationStatus.current.started
 * operationStatus.current.completed
 * operationStatus.current.failed
 * operationStatus.current.stopped
 * operationStatus.current.canceled
 * operationStatus.current.isChanged
 */
export const useOperationStatus = (): OperationStatusReturnOptions => {
  const ref = useStatus(OPERATION_STATUS_DEFAULT_VALUE) as OperationStatusReturnOptions

  // extend functionality
  useLayoutEffect(() => {
    ref.registerHandler('start', () => ({ ...OPERATION_STATUS_DEFAULT_VALUE, started: true }))
    ref.registerHandler('stop', () => ({ ...OPERATION_STATUS_DEFAULT_VALUE, stopped: true }))
    ref.registerHandler('cancel', () => ({ ...OPERATION_STATUS_DEFAULT_VALUE, canceled: true }))
    ref.registerHandler('complete', () => ({ ...OPERATION_STATUS_DEFAULT_VALUE, completed: true }))
    ref.registerHandler('fail', () => ({ ...OPERATION_STATUS_DEFAULT_VALUE, failed: true }))
  }, [ref])

  return ref
}

export default useOperationStatus
