import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
const isAuthenticated = false
if (!isAuthenticated) return <Navigate to="/" replace />
return children
}