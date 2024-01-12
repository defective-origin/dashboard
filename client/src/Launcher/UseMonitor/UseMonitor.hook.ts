import { useMemo } from 'react'

// ---| common |---

// ---| self |---
import { UseLoggerReturnOptions, useLogger } from './UseLogger'
import { UseFeaturesReturnOptions, useFeatures } from './UseFeatures'

export type UseMonitorReturnOptions = {
  logger: UseLoggerReturnOptions
  features: UseFeaturesReturnOptions
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useMonitor(conf)
 */
export const useMonitor = (): UseMonitorReturnOptions => {
  const logger = useLogger()
  const features = useFeatures()

  return useMemo(() => ({ logger, features }), [logger, features])
}

export default useMonitor
