import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Send } from "lucide-react";
import moment from 'moment';

export default function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);

    // Cargar los comentarios al montar el componente
    useEffect(() => {
        fetchComments();
    }, []);

    // Función para obtener los comentarios desde el backend
    const fetchComments = async () => {
        try {
            const response = await axios.get(`/posts/${postId}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error('Error al obtener los comentarios:', error);
        }
    };

    // Función para manejar el envío de un nuevo comentario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            return; // Evita enviar comentarios vacíos
        }

        try {
            setLoading(true);
            const response = await axios.post(`/posts/${postId}/comments`, {
                content: newComment
            });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error al enviar el comentario:', error);
        } finally {
            setLoading(false);
        }
    };

    // Función para manejar la eliminación de un comentario
    const handleDelete = async (commentId) => {
        try {
            await axios.delete(`/comments/${commentId}`);
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('Error al eliminar el comentario:', error);
        }
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Comentarios</h3>
            {/* Formulario para agregar un nuevo comentario */}
            <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-2 pb-4">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe un comentario..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Enviando...' :  <Send />}
                </button>
            </form>
            {/* Listado de comentarios */}
            <div className="space-y-4">
                {comments.map(comment => (
                    <div key={comment.id} className="p-3 bg-gray-50 rounded-md relative">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-semibold">
                                {comment.user ? comment.user.name : "Usuario"}
                            </span>
                            <div className="text-xs text-gray-500">
                            {moment(comments.created_at).format('M/D/YY, h:mm a')}
                        </div>
                            <button
                                className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                                onClick={() => handleDelete(comment.id)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <p className="text-gray-600 mt-1">{comment.content}</p>
                    </div>
                ))}
            </div>

            
        </div>
    );
}
