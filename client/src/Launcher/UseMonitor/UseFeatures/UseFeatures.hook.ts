import { useMemo } from 'react'
import { useFunc } from 'hooks'

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
  const feature = useFunc((type: string) => !!new URLSearchParams(window.location.search).get(type))

  return useMemo(() => ({ feature }), [feature])
}

export default useFeatures
