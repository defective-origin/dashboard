import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// ---| pages |---
import Dashboard from 'pages/Dashboard/Dashboard.component'
import Account from 'pages/Account/Account'

// ---| components |---
import { Layout, Tabs } from 'antd'

// ---| self |---
import './PageViewer.scss'

const BOARD_SIZE = {
  columns: 40,
  rows: 20,
}

export default function PageViewer(): JSX.Element {
  // const guides = [
  //   { id: 'intro', title: 'Intro', content: 'intro guide' },
  //   { id: 'dashboards', title: 'Dashboards', content: 'dashboard guide' },
  //   { id: 'widgets', title: 'Widgets', content: 'widget guide' },
  // ]
  return (
    <Layout className="page-viewer">
      <Tabs />
      <Routes>
        <Route path="/"><Navigate to="/dashboard" /></Route>
        <Route path="/dashboard"><Dashboard rows={BOARD_SIZE.rows} columns={BOARD_SIZE.columns} /></Route>
        <Route path="/widget/:widgetID?"><Dashboard rows={BOARD_SIZE.rows} columns={BOARD_SIZE.columns} /></Route>
        <Route path="/account"><Account /></Route>
        <Route path="/guide"><div>Donation</div></Route>
        <Route path="/donation"><div>Donation</div></Route>
        <Route path="/hotkeys"><div>Hotkeys</div></Route>
        <Route path="/support"><div>Support</div></Route>
        <Route path="/404"><div>Not found</div></Route>
        <Navigate to="/404" />
      </Routes>
    </Layout>
  )
}
