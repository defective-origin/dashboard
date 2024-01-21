import { useCallback, useMemo } from 'react'

export type FeaturesReturnOptions = {
  feature: (type: string) => boolean
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useFeaturesFlag(conf)
 */
export const useFeatures = (): FeaturesReturnOptions => {
  const feature = useCallback((type: string) => !!new URLSearchParams(window.location.search).get(type), [])

  return useMemo(() => ({ feature }), [feature])
}

export default useFeatures
