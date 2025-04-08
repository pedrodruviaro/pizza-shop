import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div>
      <header>header</header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
