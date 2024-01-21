import { useMemo } from 'react'

// ---| common |---

// ---| self |---
import { LoggerReturnOptions, useLogger } from './UseLogger'
import { FeaturesReturnOptions, useFeatures } from './UseFeatures'

export type MonitorReturnOptions = {
  logger: LoggerReturnOptions
  features: FeaturesReturnOptions
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useMonitor(conf)
 */
export const useMonitor = (): MonitorReturnOptions => {
  const logger = useLogger()
  const features = useFeatures()

  return useMemo(() => ({ logger, features }), [logger, features])
}

export default useMonitor
