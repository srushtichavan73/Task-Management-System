import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProjectPage from './pages/ProjectPage'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={
                <ProtectedRoute><DashboardPage /></ProtectedRoute>
            } />
            <Route path="/projects/:id" element={
                <ProtectedRoute><ProjectPage /></ProtectedRoute>
            } />
        </Routes>
    )
}

export default App