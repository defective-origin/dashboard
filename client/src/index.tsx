import { createRoot } from 'react-dom/client'

// ---| pages |---
import AppPage from 'pages/AppPage'

// ---| root |---
import reportWebVitals from 'reportWebVitals'
import AppLauncher from 'launchers/AppLauncher'

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)

root.render(
  <AppLauncher>
    <AppPage />
  </AppLauncher>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
