import { createRoot } from 'react-dom/client'

// ---| pages |---
import App from './pages/App'

// ---| root |---
import reportWebVitals from 'reportWebVitals'
import AppLauncher from 'launchers/AppLauncher'

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)

root.render(
  <AppLauncher>
    <App />
  </AppLauncher>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
