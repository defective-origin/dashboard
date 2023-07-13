import React from 'react'
import ReactDOM from 'react-dom/client'

// ---| pages |---
import App from 'App'

// ---| root |---
import Launcher from 'Launcher'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Launcher>
    <App />
  </Launcher>,
)
