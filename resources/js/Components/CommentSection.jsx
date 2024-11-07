import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Send, User } from "lucide-react";
import moment from 'moment';

export default function CommentSection({ postId, setCommentCount }) {
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
            setCommentCount(response.data.length); // Establecer la cantidad de comentarios
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
            setCommentCount(comments.length + 1); // Actualiza la cantidad de comentarios
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
            const updatedComments = comments.filter(comment => comment.id !== commentId);
            setComments(updatedComments);
            setCommentCount(updatedComments.length); // Actualiza la cantidad de comentarios
        } catch (error) {
            console.error('Error al eliminar el comentario:', error);
        }
    };

    // Función para obtener las iniciales del nombre del usuario
    const getInitials = (name) => {
        const words = name ? name.split(' ') : [];
        const firstInitial = words[0] ? words[0][0] : '';
        const secondInitial = words[1] ? words[1][0] : '';
        return firstInitial + secondInitial;
    };

    return (
        <div className="mt-1">
            <hr className='my-5' />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Comentarios</h3>
            {/* Formulario para agregar un nuevo comentario */}
            <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-2 pb-4">
                <User />
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
                    {loading ? 'Enviando...' : <Send />}
                </button>
            </form>
            {/* Listado de comentarios */}
            <div className="space-y-4">
                {comments.map(comment => (
                    <div key={comment.id} className="p-1  rounded-md relative">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2 mb-3">
                                <div className="w-10 h-10 bg-green-100  mr-1 flex items-center justify-center rounded-full text-sm font-bold">
                                    {comment.user ? getInitials(comment.user.name) : "U"}
                                </div>
                                <div className="flex flex-col text-xs text-gray-500">
                                    <span className="text-gray-700 text-base font-semibold">
                                        {comment.user ? comment.user.name : "Usuario"}
                                    </span>
                                    {moment(comment.created_at).format('M/D/YY, h:mm a')}
                                </div>
                            </div>
                            <button
                                className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                                onClick={() => handleDelete(comment.id)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <p className=" ml-14 mr-7">{comment.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
