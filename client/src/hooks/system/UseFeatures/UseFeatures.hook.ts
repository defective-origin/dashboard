import { useCallback, useMemo } from 'react'

export type FeatureVariant = 'languages'

export type FeaturesReturnOptions = {
  feature: (type: FeatureVariant) => boolean
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useFeatures(conf)
 */
export const useFeatures = (): FeaturesReturnOptions => {
  const feature = useCallback((type: FeatureVariant) => !!new URLSearchParams(window.location.search).get(type), [])

  return useMemo(() => ({ feature }), [feature])
}

export default useFeatures
