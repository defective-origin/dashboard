/* INJECT_IMPORT_PLACE */

/* INJECT_DEFAULT_EXPORT_PLACE */

/* INJECT_EXPORT_PLACE */
export * from './router.constant'

export {
  useParams,
  useMatch,
  Outlet,
  generatePath,
  BrowserRouter,
  createSearchParams,
  NavLink as RouteLink,
} from 'react-router-dom'

export type { URLSearchParamsInit, PathParam } from 'react-router-dom'

// Don't export anything more.
// It creates circle dependencies.
