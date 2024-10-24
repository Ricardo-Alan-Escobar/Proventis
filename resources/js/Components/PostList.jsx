import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import moment from 'moment';
import { Pencil, Trash2, CircleChevronDown, CircleAlert, Heart } from "lucide-react";
import Modal from './Modal'; 

export default function PostList({ posts }) {
    const [editPostId, setEditPostId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [showMenuId, setShowMenuId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [expandedPosts, setExpandedPosts] = useState({});
    const [likedPosts, setLikedPosts] = useState({}); // Estado para los likes de cada post
    const [loadingLikes, setLoadingLikes] = useState(true); // Estado de carga para los likes

    // Cargar likes desde el backend
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const likeData = {};
                await Promise.all(posts.map(async (post) => {
                    const response = await axios.get(`/posts/${post.id}/likes`); 
                    likeData[post.id] = response.data.likes;
                }));
                setLikedPosts(likeData);
                setLoadingLikes(false); // Termina la carga
            } catch (error) {
                console.error('Error al obtener los likes:', error);
            }
        };

        fetchLikes();
    }, [posts]);

    const handleEdit = (post) => {
        setEditPostId(post.id);
        setEditContent(post.content);
        setShowMenuId(null);
    };

    const handleCancelEdit = () => {
        setEditPostId(null);
    };

    const openModal = (postId) => {
        setPostToDelete(postId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPostToDelete(null);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/posts/${postToDelete}`);
            setIsModalOpen(false);
            setPostToDelete(null);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (postId) => {
        try {
            await axios.put(`/posts/${postId}`, { content: editContent });
            setEditPostId(null);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const toggleMenu = (postId) => {
        if (showMenuId === postId) {
            setShowMenuId(null);
        } else {
            setShowMenuId(postId);
        }
    };

    // Función para manejar likes
    const handleLike = async (postId) => {
        try {
            const response = await axios.post(`/posts/${postId}/like`);
            // Actualiza el número de likes basado en la respuesta del servidor
            setLikedPosts((prevLikes) => ({
                ...prevLikes,
                [postId]: response.data.likes_count,
            }));
        } catch (error) {
            console.error('Error al dar like:', error.response);
        }
    };

    const toggleExpand = (postId) => {
        setExpandedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const isExpanded = (postId) => expandedPosts[postId];

    const truncateText = (text, postId, limit = 600) => {
        if (text.length <= limit) {
            return text;
        }

        return isExpanded(postId)
            ? text
            : text.slice(0, limit) + ' ...';
    };

    const processContent = (content, postId) => {
        const processedContent = truncateText(content, postId)
            .replace(/##(.+?)##/g, '<p class="text-lg font-bold">$1</p>')
            .replace(/#(.+?)#/g, '<p class="text-2xl font-bold">$1</p>')
            .replace(/\*(.+?)\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />');

        return { __html: processedContent };
    };

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="p-6 mb-3 bg-white rounded-md shadow-md relative">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-600">{post.user.name}</div>
                        <div className="text-xs text-gray-500">
                            {moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                        </div>
                        <div className="relative">
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => toggleMenu(post.id)}
                            >
                                <CircleChevronDown />
                            </button>
                            {showMenuId === post.id && (
                                <div className="absolute right-0 mt-2 w-10 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                    <button
                                        onClick={() => handleEdit(post)}
                                        className="block w-full px-2 py-2 text-left text-gray-700 hover:bg-gray-200"
                                    >
                                        <Pencil />
                                    </button>
                                    <button
                                        onClick={() => openModal(post.id)}
                                        className="block w-full px-2 py-2 text-red-500 hover:bg-gray-200"
                                    >
                                        <Trash2 />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {editPostId === post.id ? (
                        <div>
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full h-60 p-3 border border-gray-300 rounded-md"
                            />
                            <div className="flex space-x-2 mt-2">
                                <button
                                    onClick={() => handleUpdate(post.id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-2 text-gray-900">
                            <div dangerouslySetInnerHTML={processContent(post.content, post.id)} />
                            {post.content.length > 600 && (
                                <button
                                    onClick={() => toggleExpand(post.id)}
                                    className="text-blue-500 hover:underline"
                                >
                                    {isExpanded(post.id) ? 'Ver menos' : 'Ver más'}
                                </button>
                            )}
                        </div>
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
                    <hr className='mt-5' />
                    {/* Sección de Likes */}
                    <div className="flex items-center mt-4 ">
    <button
        className="flex items-center text-red-500 hover:bg-slate-100 p-3 px-4 rounded-full "
        onClick={() => handleLike(post.id)}
        disabled={loadingLikes} // Deshabilitar botón mientras se cargan los likes
    >
        {/* Cambia el ícono dependiendo de si el post ha sido dado "like" o no */}
        {likedPosts[post.id] ? (
            // Ícono de corazón lleno (cuando el usuario ha dado "like")
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
            >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        ) : (
            // Ícono de corazón vacío (cuando no se ha dado "like")
            <Heart className="mr-1" />
        )}
        {likedPosts[post.id] !== undefined ? likedPosts[post.id] : '...'} {/* Muestra la cantidad de likes actualizada */}
    </button>
</div>
                </div>
            ))}

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <div className="p-4">
                        <div className='w-full mb-2 flex items-center flex-col'>
                            <CircleAlert size={48} color="#ff0000" />
                            <h2 className="text-xl font-bold mb-1 mt-4">Eliminar Post</h2>
                            <p>¿Estás seguro de que deseas eliminar esta publicación?</p>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={closeModal}
                                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
