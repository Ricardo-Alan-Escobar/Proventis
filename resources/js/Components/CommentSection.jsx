import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Send, Edit3, User, MoreHorizontal, Save, CircleX } from "lucide-react";
import moment from 'moment';
import UserAvatar from './UserAvatar';
import Modal2 from './Modal2';
import { Link } from '@inertiajs/react';
export default function CommentSection({ postId, setCommentCount }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [showMenuId, setShowMenuId] = useState(null);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    const CHARACTER_LIMIT = 500;

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/posts/${postId}/comments`);
            setComments(response.data);
            setCommentCount(response.data.length);
        } catch (error) {
            console.error('Error al obtener los comentarios:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            return;
        }

        if (newComment.length > CHARACTER_LIMIT) {
            setError(`Has excedido el límite de ${CHARACTER_LIMIT} caracteres.`);
            return;
        }

        setError('');

        try {
            setLoading(true);
            const response = await axios.post(`/posts/${postId}/comments`, {
                content: newComment
            });
            setComments([...comments, response.data]);
            setNewComment('');
            setCommentCount(comments.length + 1);
        } catch (error) {
            console.error('Error al enviar el comentario:', error);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (commentId) => {
        setCommentToDelete(commentId);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (!commentToDelete) return;

        try {
            await axios.delete(`/comments/${commentToDelete}`);
            const updatedComments = comments.filter(comment => comment.id !== commentToDelete);
            setComments(updatedComments);
            setCommentCount(updatedComments.length);
        } catch (error) {
            console.error('Error al eliminar el comentario:', error);
        } finally {
            setIsModalOpen(false);
            setCommentToDelete(null);
        }
    };

    const handleEdit = async (commentId) => {
        try {
            const response = await axios.patch(`/comments/${commentId}`, {
                content: editContent
            });
            const updatedComments = comments.map(comment =>
                comment.id === commentId ? { ...comment, content: editContent } : comment
            );
            setComments(updatedComments);
            setEditingCommentId(null);
            setShowMenuId(null);
        } catch (error) {
            console.error('Error al editar el comentario:', error);
        }
    };

    return (
        <div className="mt-1">
            <hr className="my-5" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Comentarios</h3>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
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
                </div>
                {newComment.length > CHARACTER_LIMIT && (
                    <p className="text-red-500 text-sm">
                        Has excedido el límite de {CHARACTER_LIMIT} caracteres.
                    </p>
                )}
            </form>
            <div className="space-y-4 pt-5">
                {comments.map(comment => (
                    <div key={comment.id} className="p-1 rounded-md relative">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2 mb-3">
                                <div className="w-10 h-10 bg-green-100 mr-1 flex items-center justify-center rounded-full text-sm font-bold">
                                    <UserAvatar name={comment.user?.name || "Usuario"} />
                                </div>
                                <div className="flex flex-col text-xs text-gray-500">
                                <span className="text-gray-700 text-base font-semibold">
                                    {comment.user ? (
                                        <Link 
                                            href={route('usuario', { id: comment.user.id })} 
                                            className="text-green-900 hover:text-black"
                                        >
                                            {comment.user.name}
                                        </Link>
                                    ) : (
                                        "Usuario"
                                    )}
                                    </span>
                                    {moment(comment.created_at).format('M/D/YY, h:mm a')}
                                </div>
                            </div>
                            <div className="relative">
                                {comment.isOwner && (
                                    <button
                                        onClick={() => setShowMenuId(showMenuId === comment.id ? null : comment.id)}
                                        className="ml-auto p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        <MoreHorizontal size={16} />
                                    </button>
                                )}
                                {showMenuId === comment.id && comment.isOwner && (
                                    <div className="absolute right-0 text-sm mt-2 w-26 bg-white border border-gray-200 rounded shadow-lg z-10">
                                        <button
                                            className="w-full flex text-left px-2 py-1 text-gray-700 hover:bg-green-100"
                                            onClick={() => {
                                                setEditingCommentId(comment.id);
                                                setEditContent(comment.content);
                                                setShowMenuId(null);
                                            }}
                                        >
                                            <Edit3 size={16} className="mr-2" /> Editar
                                        </button>
                                        <button
                                            className="w-full flex text-left px-2 py-1 hover:bg-red-100"
                                            onClick={() => confirmDelete(comment.id)}
                                        >
                                            <Trash2 size={16} className="mr-2" /> Eliminar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {editingCommentId === comment.id ? (
                            <div className="ml-14 mr-7 mt-2 flex flex-col space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
                                <input
                                    type="text"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />

                                <div className="flex">
                                    <button
                                        onClick={() => handleEdit(comment.id)}
                                        className="px-4 py-1 mr-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        <Save />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingCommentId(null);
                                            setEditContent('');
                                        }}
                                        className="px-4 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                    >
                                        <CircleX />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="ml-14 mr-7">{comment.content}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal de confirmación */}
            {isModalOpen && (
                <Modal2 onClose={() => setIsModalOpen(false)}>
                    <h3 className="text-lg font-semibold mb-4">¿Deseas eliminar este comentario?</h3>
                    <p className="text-gray-600 mb-4">Se borrara definitivamente</p>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Eliminar
                        </button>
                    </div>
                </Modal2>
            )}
        </div>
    );
}
