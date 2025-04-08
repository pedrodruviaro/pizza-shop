import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div>
      <div>auth header</div>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
