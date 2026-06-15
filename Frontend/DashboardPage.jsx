import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/common/Navbar'
import api from '../api/api'
import {
    PieChart, Pie, Cell, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts'

const COLORS = ['#6366f1', '#3b82f6', '#f59e0b', '#10b981']

const DashboardPage = () => {
    const [projects, setProjects] = useState([])
    const [allTasks, setAllTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [newProject, setNewProject] = useState({ name: '', description: '' })
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const res = await api.get('/api/projects')
            setProjects(res.data)
            // fetch tasks for all projects
            const taskPromises = res.data.map(p =>
                api.get(`/api/projects/${p.id}/tasks`)
            )
            const taskResults = await Promise.all(taskPromises)
            const tasks = taskResults.flatMap(r => r.data)
            setAllTasks(tasks)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateProject = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/api/projects', newProject)
            setProjects([...projects, res.data])
            setNewProject({ name: '', description: '' })
            setShowForm(false)
        } catch (err) {
            console.error(err)
        }
    }

    // Chart Data
    const statusData = [
        { name: 'To Do', value: allTasks.filter(t => t.status === 'TODO').length },
        { name: 'In Progress', value: allTasks.filter(t => t.status === 'IN_PROGRESS').length },
        { name: 'Review', value: allTasks.filter(t => t.status === 'REVIEW').length },
        { name: 'Done', value: allTasks.filter(t => t.status === 'DONE').length },
    ]

    const priorityData = [
        { name: 'Low', value: allTasks.filter(t => t.priority === 'LOW').length },
        { name: 'Medium', value: allTasks.filter(t => t.priority === 'MEDIUM').length },
        { name: 'High', value: allTasks.filter(t => t.priority === 'HIGH').length },
        { name: 'Critical', value: allTasks.filter(t => t.priority === 'CRITICAL').length },
    ]

    const completedTasks = allTasks.filter(t => t.status === 'DONE').length
    const pendingTasks = allTasks.filter(t => t.status !== 'DONE').length

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Welcome, {user?.name}! 👋
                        </h2>
                        <p className="text-gray-500">Manage your projects and tasks</p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                        + New Project
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl shadow text-center">
                        <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
                        <p className="text-gray-500 text-sm mt-1">Total Projects</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow text-center">
                        <p className="text-3xl font-bold text-indigo-600">{allTasks.length}</p>
                        <p className="text-gray-500 text-sm mt-1">Total Tasks</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow text-center">
                        <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
                        <p className="text-gray-500 text-sm mt-1">Completed</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow text-center">
                        <p className="text-3xl font-bold text-orange-500">{pendingTasks}</p>
                        <p className="text-gray-500 text-sm mt-1">Pending</p>
                    </div>
                </div>

                {/* Charts */}
                {allTasks.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                        {/* Pie Chart - Tasks by Status */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                📊 Tasks by Status
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        dataKey="value"
                                        label={({ name, value }) => `${name}: ${value}`}>
                                        {statusData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Bar Chart - Tasks by Priority */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                📈 Tasks by Priority
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={priorityData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Create Project Form */}
                {showForm && (
                    <div className="bg-white p-6 rounded-xl shadow mb-6">
                        <h3 className="text-lg font-semibold mb-4">Create New Project</h3>
                        <form onSubmit={handleCreateProject} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Project Name"
                                value={newProject.name}
                                onChange={(e) => setNewProject({
                                    ...newProject, name: e.target.value })}
                                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={newProject.description}
                                onChange={(e) => setNewProject({
                                    ...newProject, description: e.target.value })}
                                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                rows={3}
                            />
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Create
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Projects Grid */}
                {loading ? (
                    <p className="text-center text-gray-500">Loading projects...</p>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No projects yet!</p>
                        <p className="text-gray-400">Click "New Project" to get started</p>
                    </div>
                ) : (
                    <>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            📁 Your Projects
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    onClick={() => navigate(`/projects/${project.id}`)}
                                    className="bg-white p-6 rounded-xl shadow hover:shadow-md cursor-pointer border-l-4 border-blue-500 transition">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {project.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-4">
                                        {project.description || 'No description'}
                                    </p>
                                    <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      Click to open board
                    </span>
                                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      Active
                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default DashboardPage