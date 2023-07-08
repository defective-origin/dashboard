import React from 'react'
import ReactDOM from 'react-dom/client'

// ---| pages |---
import AppPage from 'pages/AppPage'

// ---| root |---
import Launcher from 'Launcher'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Launcher>
    <AppPage />
  </Launcher>,
)
