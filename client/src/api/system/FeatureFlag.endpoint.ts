import { useEffect } from 'react'
import { TimeStamps } from '../api.type'
import api from '../api.endpoint'

const PATHNAME = 'system/feature-flags'
const FEATURE_FLAGS_STORE = new Set()

export type FeatureFlag = TimeStamps & {
  id: string
  name: string
  active: boolean
}

export const useFeatureFlags = () => {
  const response = api.useRestReadEndpoint<FeatureFlag[]>(PATHNAME)

  useEffect(() => {
    FEATURE_FLAGS_STORE.clear()

    if (response.data) {
      response.data
        .filter(item => item.active)
        .forEach(item => FEATURE_FLAGS_STORE.add(item.name))
    }
  }, [response.data])

  return response
}

export const ff = (name: string) => {
  const urlFlags = new URLSearchParams(window.location.search).getAll('ff')

  return urlFlags.includes(name) || FEATURE_FLAGS_STORE.has(name)
}
