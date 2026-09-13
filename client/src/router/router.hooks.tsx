
import { NavigateOptions as ReactNavigateOptions, useMatch, useNavigate as useRouterNavigate } from 'react-router-dom'
import { useFunc } from 'hooks'
import { generateAppPath, AppLinkOptions, AppLinkVariant } from './router.tools'

export type AppNavigateOptions<Name extends AppLinkVariant> = ReactNavigateOptions & AppLinkOptions<Name>

export function useAppNavigate<Name extends AppLinkVariant>() {
  const nav = useRouterNavigate()

  return useFunc((options: AppNavigateOptions<Name> = {}) => {
    const { to, params, search, ...other } = options
    const path = generateAppPath({ to, params, search })

    return nav(path, other)
  },
  )
}

export const useAppMatch = <Name extends AppLinkVariant>(options: AppLinkOptions<Name>) => {
  return useMatch(generateAppPath(options))
}

