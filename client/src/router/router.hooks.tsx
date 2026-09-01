
import { NavigateOptions as ReactNavigateOptions, useNavigate as useRouterNavigate } from 'react-router-dom'
import { RouteLinks } from './router.constants'
import { useFunc } from 'hooks'
import { generateRouterPath, GenerateRouterPathOptions } from './router.tools'

export type NavigateOptions<Name extends RouteLinks> = ReactNavigateOptions & {
  params: GenerateRouterPathOptions<Name>
}

export function useNavigate<Name extends RouteLinks>() {
  const nav = useRouterNavigate()

  return useFunc((name: Name, options?: NavigateOptions<Name>) => {
    return nav(
      generateRouterPath(
        name,
        options?.params as any,
      ),
      options,
    )
  },
  )
}
