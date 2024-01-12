import { useCallback, useMemo } from 'react'

export type UseFeaturesReturnOptions = {
  flag: (type: string) => boolean
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useFeaturesFlag(conf)
 */
export const useFeatures = (): UseFeaturesReturnOptions => {

  const flag = useCallback((type: string) => !!new URLSearchParams(window.location.search).get(type), [])

  return useMemo(() => ({ flag }), [flag])
}

export default useFeatures
