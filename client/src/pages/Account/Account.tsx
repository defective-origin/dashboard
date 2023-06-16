import { Routes, Route, Navigate } from 'react-router-dom'

export default function Account(): JSX.Element {
  const path = 'useRouteMatch does not work'
  return (
    <div className="account">
      Account
      <Routes>
          <Route path="/"><Navigate to={`${path}/profile`} /></Route>
          <Route path={`${path}/profile`}><div>Profile</div></Route>
          <Route path={`${path}/settings`}><div>Settings</div></Route>
          <Route path={`${path}/sign-in`}><div>Sign in</div></Route>
          <Route path={`${path}/sign-out`}><div>Sign out</div></Route>
        </Routes>
    </div>
  )
}
