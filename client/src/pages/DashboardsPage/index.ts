import React from 'react'

/* INJECT_DEFAULT_EXPORT_PLACE */
// export { default } from './DashboardsPage.component'
export default React.lazy(() => import('./DashboardsPage.component'))

/* INJECT_EXPORT_PLACE */
export * from './DashboardsPage.component'
