import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import moment from 'moment';
import { Pencil, Trash2, Ellipsis, CircleAlert, Heart, MessageCircle, Flag, Share2 } from "lucide-react";
import Modal2 from './Modal2';
import UserAvatar from './UserAvatar';
import { Link } from '@inertiajs/react';
import CommentSection from './CommentSection';

export default function PostList({ posts }) {
    const [editPostId, setEditPostId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [showMenuId, setShowMenuId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [expandedPosts, setExpandedPosts] = useState({});
    const [likedPosts, setLikedPosts] = useState({});
    const [loadingLikes, setLoadingLikes] = useState(true); 
    const [commentCount, setCommentCount] = useState({});
    const [visibleComments, setVisibleComments] = useState(
        posts.reduce((acc, post) => {
            acc[post.id] = true;  
            return acc;
        }, {})
    );
  
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const likeData = {};
                await Promise.all(posts.map(async (post) => {
                    const response = await axios.get(`/posts/${post.id}/likes`);
                    likeData[post.id] = {
                        count: response.data.likes,
                        likedByUser: response.data.likedByUser, 
                    };
                }));
                setLikedPosts(likeData);
                setLoadingLikes(false);
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

   
    const handleLike = async (postId) => {
        try {
            const response = await axios.post(`/posts/${postId}/like`);
            setLikedPosts((prevLikes) => ({
                ...prevLikes,
                [postId]: {
                    count: response.data.likes_count,
                    likedByUser: !prevLikes[postId].likedByUser,
                },
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

    const toggleComments = (postId) => {
        setVisibleComments((prev) => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const updateCommentCount = (postId, count) => {
        setCommentCount((prevCounts) => ({
            ...prevCounts,
            [postId]: count
        }));
    };


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

    const handleReport = (postId) => {
        console.log(`Post ${postId} reportado`);
        alert('Reporte enviado.');
    };
    const handleShare = (postId) => {
        const postUrl = `${window.location.origin}/posts/${postId}`; 
        navigator.clipboard.writeText(postUrl).then(() => {
            alert('El enlace del post ha sido copiado al portapapeles.');
        }).catch((error) => {
            console.error('Error al copiar el enlace:', error);
            alert('No se pudo copiar el enlace. Por favor, intenta nuevamente.');
        });
    };
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="p-6 mb-3 bg-white rounded-md shadow-md relative">
                    
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-lg flex font-bold">
                           <div  className='mr-2'>
                            <UserAvatar
                                name={post.user?.name || "U"}
                                size="w-12 h-12 text-lg"
                            />
                            </div>
                            <div>
                            <Link 
                              href={route('usuario', { id: post.user.id })} 
                              className="text-gray-900 hover:text-gray-700"
                                >
                                   <strong>{post.user.name}</strong>
                                </Link>
                                <div className="text-sm text-gray-500">
                                    {moment(post.created_at).format('MM/DD/YYYY, h:mm a')}
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <button
                                className="text-gray-500 hover:bg-slate-50 p-2 rounded-md hover:text-gray-700"
                                onClick={() => toggleMenu(post.id)}
                            >
                                <Ellipsis />
                            </button>
                            {showMenuId === post.id && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      {post.isOwner ? ( // Si el usuario es dueño del post
                          <>
                <button
                    onClick={() => handleEdit(post)}
                    className="flex w-full px-2 py-2 text-left text-sm text-gray-700 hover:bg-green-100"
                >
                    <Pencil className="mr-3" size={17} /> Editar post
                </button>
                <button
                    onClick={() => openModal(post.id)}
                    className="flex w-full px-2 py-2 text-sm hover:bg-red-100"
                >
                    <Trash2 className="mr-3" size={17} /> Eliminar post
                </button>
            </>
        ) : ( // Si el usuario no es dueño del post
            <>
                <button
                    onClick={() => handleReport(post.id)}
                    className="flex w-full px-2 py-2 text-left text-sm text-gray-700 hover:bg-yellow-100"
                >
                    <Flag className="mr-3" size={17} /> Reportar post
                </button>
                <button
                    onClick={() => handleShare(post.id)}
                    className="flex w-full px-2 py-2 text-sm hover:bg-blue-100"
                >
                    <Share2 className="mr-3" size={17} /> Compartir post
                </button>
            </>
        )}
    </div>
)}

                        </div>
                    </div>

                    <hr className="my-5" />

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
                                    className="text-gray-700 pt-6 hover:underline hover:underline-offset-4 font-semibold"
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
                                decoding="async"
                                loading="lazy"
                                className="rounded-lg w-full lg:w-10/12"
                            />
                        </div>
                    )}

                    {post.file && (
                        <a href={`/storage/${post.file}`} className="text-blue-500 hover:underline">
                            Descargar Archivo
                        </a>
                    )}
                    {post.video_url && (
                        <div className="mb-2 my-5 flex justify-center">
                            <video controls className="rounded-lg w-full lg:w-10/12">
                                <source src={`/storage/${post.video_url}`} type="video/mp4" />
                                Tu navegador no soporta la etiqueta de video.
                            </video>
                        </div>
                    )}
                  
                    <div className="flex items-center justify-between mt-10">
                        <button
                        className="flex items-center text-red-500 hover:bg-slate-100 p-3 px-4 rounded-full"
                        onClick={() => handleLike(post.id)}
                    >
                        <Heart
                            size={20}
                            className={`mr-2 ${likedPosts[post.id]?.likedByUser ? 'fill-current text-red-500' : ''}`}
                        />
                        {loadingLikes ? '.' : likedPosts[post.id]?.count} Likes
                    </button>
                        <button
                            className="flex items-center text-blue-500 hover:bg-slate-100 p-3 px-4 rounded-full"
                            onClick={() => toggleComments(post.id)}
                        >
                            <MessageCircle size={20} className="mr-2" />
                            {commentCount[post.id] || 0} Comentarios
                        </button>
                    </div>

                    {/* Sección de comentarios */}
                    {visibleComments[post.id] && (
                        <CommentSection
                            postId={post.id}
                            setCommentCount={(count) => updateCommentCount(post.id, count)}
                        />
                    )}
                </div>
            ))}
  {isModalOpen && (
                <Modal2 onClose={closeModal}>
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
                </Modal2>
            )}
           <div className='flex justify-center py-5'> 
            <span className='text-gray-400 text-lg'> Fin de las publicaciones :(</span>
            </div>
        </div>
    );
}
console.log('%c¡Advertencia!', 'color: red; font-size: 50px;');
console.log('%cNo escribas ni pegues ningún código aquí. Podrías comprometer la seguridad de tu cuenta.', 'color: orange; font-size: 16px;');
console.log('%cEstas siendo monitoreado', 'color: orange; font-size: 16px;');
