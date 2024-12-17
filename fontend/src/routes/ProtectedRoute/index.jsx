import { Navigate } from 'react-router-dom'

export default function ProtectedRoute ({ element, authUser }) {
  return authUser ? element : <Navigate to="/login" />
}
