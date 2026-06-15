import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold cursor-pointer"
                onClick={() => navigate('/dashboard')}>
                📋 TaskApp
            </h1>
            <div className="flex items-center gap-4">
                <span className="text-sm">👤 {user?.name}</span>
                <button
                    onClick={handleLogout}
                    className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-blue-50">
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar