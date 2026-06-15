import { useState, useEffect } from 'react'
import api from '../../api/api'
import { useAuth } from '../../context/AuthContext'

const CommentSection = ({ taskId }) => {
    const [comments, setComments] = useState([])
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        fetchComments()
    }, [taskId])

    const fetchComments = async () => {
        try {
            const res = await api.get(`/api/tasks/${taskId}/comments`)
            setComments(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!content.trim()) return
        setLoading(true)
        try {
            await api.post(`/api/tasks/${taskId}/comments`, { content })
            setContent('')
            await fetchComments()
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (commentId) => {
        try {
            await api.delete(`/api/comments/${commentId}`)
            setComments(comments.filter(c => c.id !== commentId))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-3">
                💬 Comments ({comments.length})
            </h4>

            {/* Comment Input */}
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                    {loading ? '...' : 'Post'}
                </button>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
                {comments.length === 0 ? (
                    <p className="text-gray-400 text-sm">No comments yet. Be the first!</p>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id}
                             className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-start">
                                <div>
                  <span className="font-medium text-sm text-blue-600">
                    {comment.user?.name}
                  </span>
                                    <p className="text-gray-700 text-sm mt-1">
                                        {comment.content}
                                    </p>
                                    <span className="text-gray-400 text-xs">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                                </div>
                                {comment.user?.email === user?.email && (
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="text-red-400 hover:text-red-600 text-xs">
                                        🗑️
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default CommentSection