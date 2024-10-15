import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

export default function PostList({ posts }) {
    const [editPostId, setEditPostId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [showMenuId, setShowMenuId] = useState(null); // Controla la visibilidad del menú

    const handleEdit = (post) => {
        setEditPostId(post.id);
        setEditContent(post.content);
        setShowMenuId(null); // Oculta el menú después de hacer clic en editar
    };

    const handleDelete = async (postId) => {
        try {
            if (confirm('Are you sure you want to delete this post?')) {
                await axios.delete(`/posts/${postId}`);
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (postId) => {
        try {
            await axios.put(`/posts/${postId}`, { content: editContent });
            setEditPostId(null); // Oculta el formulario de edición
            window.location.reload(); // Actualiza la página después de la edición
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="p-4 mb-2 bg-white rounded-md shadow-sm relative">
                    <div className="flex justify-between  items-center mb-6">
                        <div className="text-sm text-gray-600">{post.user.name}</div>
                        <div className="text-xs text-gray-500">
                            {moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                        </div>

                        {/* Menú desplegable para editar y eliminar */}
                        <div className="relative">
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowMenuId(post.id)} // Mostrar menú al hacer clic
                            >
                                •••
                            </button>
                            {showMenuId === post.id && ( // Mostrar el menú solo para la publicación actual
                                <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                    <button
                                        onClick={() => handleEdit(post)}
                                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-200"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contenido o edición en línea */}
                    {editPostId === post.id ? (
                        <div>
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <button
                                onClick={() => handleUpdate(post.id)}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Guardar
                            </button>
                        </div>
                    ) : (
                        <div className="mb-2 text-gray-900">{post.content}</div>
                    )}

                    {post.image && (
                        <div className="mb-2 my-5 flex justify-center">
                            <img
                                src={`/storage/${post.image}`}
                                alt="Post Image"
                                className="rounded-lg w-full lg:w-7/12"
                            />
                        </div>
                    )}

                    {post.file && (
                        <a href={`/storage/${post.file}`} className="text-blue-500 hover:underline">
                            Descargar Archivo
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
}
