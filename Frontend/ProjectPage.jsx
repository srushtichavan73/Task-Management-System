import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import CommentSection from '../components/comments/CommentSection'
import api from '../api/api'

const STATUS_COLUMNS = ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE']

const STATUS_LABELS = {
    TODO: '📋 To Do',
    IN_PROGRESS: '⚙️ In Progress',
    REVIEW: '🔍 Review',
    DONE: '✅ Done'
}

const STATUS_COLORS = {
    TODO: 'border-gray-400',
    IN_PROGRESS: 'border-blue-400',
    REVIEW: 'border-yellow-400',
    DONE: 'border-green-400'
}

const PRIORITY_COLORS = {
    LOW: 'bg-green-100 text-green-700',
    MEDIUM: 'bg-yellow-100 text-yellow-700',
    HIGH: 'bg-orange-100 text-orange-700',
    CRITICAL: 'bg-red-100 text-red-700'
}

const ProjectPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [project, setProject] = useState(null)
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [error, setError] = useState('')
    const [selectedTask, setSelectedTask] = useState(null)
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'MEDIUM',
        status: 'TODO'
    })

    useEffect(() => {
        fetchProject()
        fetchTasks()
    }, [id])

    const fetchProject = async () => {
        try {
            const res = await api.get(`/api/projects/${id}`)
            setProject(res.data)
        } catch (err) {
            console.error('Project error:', err)
            setError('Failed to load project')
        }
    }

    const fetchTasks = async () => {
        try {
            const res = await api.get(`/api/projects/${id}/tasks`)
            setTasks(res.data)
        } catch (err) {
            console.error('Tasks error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateTask = async (e) => {
        e.preventDefault()
        try {
            await api.post(`/api/projects/${id}/tasks`, newTask)
            await fetchTasks()
            setNewTask({
                title: '',
                description: '',
                priority: 'MEDIUM',
                status: 'TODO'
            })
            setShowForm(false)
        } catch (err) {
            console.error('Create task error:', err)
        }
    }

    const handleStatusChange = async (e, taskId, newStatus) => {
        e.stopPropagation()
        try {
            await api.patch(`/api/tasks/${taskId}/status?status=${newStatus}`)
            await fetchTasks()
        } catch (err) {
            console.error('Status error:', err)
        }
    }

    const handleDeleteTask = async (e, taskId) => {
        e.stopPropagation()
        try {
            await api.delete(`/api/tasks/${taskId}`)
            setTasks(tasks.filter(t => t.id !== taskId))
            if (selectedTask?.id === taskId) setSelectedTask(null)
        } catch (err) {
            console.error('Delete error:', err)
        }
    }

    const getTasksByStatus = (status) =>
        tasks.filter(task => task.status === status)

    if (loading) return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <p className="text-center mt-20 text-gray-500">Loading project...</p>
        </div>
    )

    if (error) return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <p className="text-center mt-20 text-red-500">{error}</p>
            <p className="text-center">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-blue-600 hover:underline">
                    ← Back to Dashboard
                </button>
            </p>
        </div>
    )

    if (!project) return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <p className="text-center mt-20 text-gray-500">Project not found</p>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-blue-600 text-sm mb-1 hover:underline">
                            ← Back to Dashboard
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {project?.name}
                        </h2>
                        <p className="text-gray-500">{project?.description}</p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                        + New Task
                    </button>
                </div>

                {/* Create Task Form */}
                {showForm && (
                    <div className="bg-white p-6 rounded-xl shadow mb-6">
                        <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
                        <form onSubmit={handleCreateTask} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Task Title"
                                value={newTask.title}
                                onChange={(e) => setNewTask({
                                    ...newTask, title: e.target.value })}
                                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <textarea
                                placeholder="Description (optional)"
                                value={newTask.description}
                                onChange={(e) => setNewTask({
                                    ...newTask, description: e.target.value })}
                                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                rows={2}
                            />
                            <div className="flex gap-3 flex-wrap">
                                <select
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask({
                                        ...newTask, priority: e.target.value })}
                                    className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                                    <option value="LOW">Low Priority</option>
                                    <option value="MEDIUM">Medium Priority</option>
                                    <option value="HIGH">High Priority</option>
                                    <option value="CRITICAL">Critical</option>
                                </select>
                                <select
                                    value={newTask.status}
                                    onChange={(e) => setNewTask({
                                        ...newTask, status: e.target.value })}
                                    className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                                    <option value="TODO">To Do</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="REVIEW">Review</option>
                                    <option value="DONE">Done</option>
                                </select>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Create Task
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

                {/* Task Count */}
                <p className="text-gray-500 text-sm mb-4">
                    Total tasks: {tasks.length} — click on a task to view details & comments
                </p>

                {/* Kanban Board */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {STATUS_COLUMNS.map(status => (
                        <div key={status}
                             className={`bg-white rounded-xl shadow p-4 border-t-4 ${STATUS_COLORS[status]}`}>

                            {/* Column Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-700">
                                    {STATUS_LABELS[status]}
                                </h3>
                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {getTasksByStatus(status).length}
                </span>
                            </div>

                            {/* Task Cards */}
                            <div className="space-y-3">
                                {getTasksByStatus(status).length === 0 ? (
                                    <p className="text-gray-400 text-xs text-center py-4">
                                        No tasks here
                                    </p>
                                ) : (
                                    getTasksByStatus(status).map(task => (
                                        <div key={task.id}
                                             onClick={() => setSelectedTask(task)}
                                             className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:shadow-sm transition cursor-pointer">

                                            <h4 className="font-medium text-gray-800 text-sm mb-1">
                                                {task.title}
                                            </h4>

                                            {task.description && (
                                                <p className="text-gray-500 text-xs mb-2 line-clamp-2">
                                                    {task.description}
                                                </p>
                                            )}

                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${PRIORITY_COLORS[task.priority]}`}>
                        {task.priority}
                      </span>

                                            {/* Move Buttons */}
                                            <div className="flex gap-1 mt-2 flex-wrap">
                                                {STATUS_COLUMNS.filter(s => s !== status).map(s => (
                                                    <button
                                                        key={s}
                                                        onClick={(e) => handleStatusChange(e, task.id, s)}
                                                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100">
                                                        → {s.replace('_', ' ')}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={(e) => handleDeleteTask(e, task.id)}
                                                    className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded hover:bg-red-100">
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Task Detail Modal with Comments */}
            {selectedTask && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-800">
                                {selectedTask.title}
                            </h3>
                            <button
                                onClick={() => setSelectedTask(null)}
                                className="text-gray-400 hover:text-gray-600 text-2xl leading-none">
                                ×
                            </button>
                        </div>
                        {selectedTask.description && (
                            <p className="text-gray-600 mb-3">
                                {selectedTask.description}
                            </p>
                        )}
                        <div className="flex gap-2 mb-4">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${PRIORITY_COLORS[selectedTask.priority]}`}>
                {selectedTask.priority}
              </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                {selectedTask.status.replace('_', ' ')}
              </span>
                        </div>
                        <hr className="mb-4" />
                        <CommentSection taskId={selectedTask.id} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProjectPage