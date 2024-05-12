/* INJECT_IMPORT_PLACE */

/* INJECT_DEFAULT_EXPORT_PLACE */

/* INJECT_EXPORT_PLACE */
export * from './router.constant'

export { useMatch, Outlet, NavLink as RouteLink } from 'react-router-dom'

// Don't export anything more.
// It creates circle dependencies.
