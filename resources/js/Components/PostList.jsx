import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Pencil, Trash2, CircleChevronDown } from "lucide-react"

export default function PostList({ posts }) {
    const [editPostId, setEditPostId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [showMenuId, setShowMenuId] = useState(null); 

    const handleEdit = (post) => {
        setEditPostId(post.id);
        setEditContent(post.content);
        setShowMenuId(null); 
    };

    const handleCancelEdit = () => {
        setEditPostId(null); 
    };

    const handleDelete = async (postId) => {
        try {
            if (confirm('¿Estas seguro de querer eliminar la publicación?')) {
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
            setEditPostId(null); 
            window.location.reload(); 
        } catch (error) {
            console.error(error);
        }
    };

    const toggleMenu = (postId) => {
        // Si el menú ya está abierto, lo oculta; si no, lo muestra
        if (showMenuId === postId) {
            setShowMenuId(null); // Ocultar el menú
        } else {
            setShowMenuId(postId); // Mostrar el menú
        }
    };

    const processContent = (content) => {
        // Reemplazar '#' con etiquetas de título y '*' para negritas, respetar saltos de línea
        const processedContent = content
            .replace(/##(.+?)##/g, '<p class="text-lg font-bold">$1</p>') // Títulos h3 con ##
            .replace(/#(.+?)#/g, '<p class="text-2xl font-bold">$1</p>')   // Títulos h2 con #
            .replace(/\*(.+?)\*/g, '<strong>$1</strong>')                        // Texto en negritas con *
            .replace(/\n/g, '<br />');                                           // Saltos de línea

        return { __html: processedContent };
    };

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="p-6 mb-3 bg-white rounded-md shadow-md relative ">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-600">{post.user.name}</div>
                        <div className="text-xs text-gray-500">
                            {moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                        </div>

                        {/* Menú desplegable para editar y eliminar */}
                        <div className="relative">
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => toggleMenu(post.id)} // Alternar el menú al hacer clic
                            >
                               <CircleChevronDown />
                            </button>
                            {showMenuId === post.id && ( // Mostrar el menú solo para la publicación actual
                                <div className="absolute right-0 mt-2 w-10 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                    <button
                                        onClick={() => handleEdit(post)}
                                        className="block w-full px-2 py-2 text-left text-gray-700 hover:bg-gray-200"
                                    >
                                        <Pencil /> 
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="block w-full px-2 py-2 text-left text-red-500 hover:bg-gray-200"
                                    >
                                        <Trash2 />
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
                                    onClick={handleCancelEdit} // Botón para cancelar la edición
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="mb-2 text-gray-900"
                            dangerouslySetInnerHTML={processContent(post.content)} // Renderizar contenido con títulos, negritas y saltos de línea procesados
                        />
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
