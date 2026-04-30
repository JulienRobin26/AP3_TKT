import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { serviceAuthentification } from '../services/authentification.service'

export default function Guard({ roles = [] }) {
  const [status, setStatus] = useState('loading')
  const [user, setUser] = useState(null)
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    setStatus('loading')

    serviceAuthentification
      .recupererInfos()
      .then((data) => {
        if (!isMounted) return
        setUser(data?.user || null)
        setStatus('authenticated')
      })
      .catch(() => {
        if (!isMounted) return
        setStatus('unauthenticated')
      })

    return () => {
      isMounted = false
    }
  }, [location.pathname])

  if (status === 'loading') {
    return null
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />
  }

  const roleVal = user?.role
  if (roles.length > 0 && !roles.includes(roleVal)) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
