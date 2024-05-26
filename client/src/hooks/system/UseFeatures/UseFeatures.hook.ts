import { useCallback } from 'react'

export type FeatureVariant = 'languages'

export type FeaturesReturnOptions = (type: FeatureVariant) => boolean

/**
 * Hook descriptions
 *
 * @example
 * const options = useFeatures(conf)
 */
export const useFeatures = (): FeaturesReturnOptions => {
  return useCallback((type: FeatureVariant) => !!new URLSearchParams(window.location.search).get(type), [])
}

export default useFeatures
