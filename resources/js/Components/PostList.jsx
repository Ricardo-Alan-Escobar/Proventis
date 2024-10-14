import React from 'react';
import moment from 'moment';

export default function PostList({ posts }) {
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="p-4 mb-4 bg-white rounded-md shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        
                        <div className="text-sm text-gray-600">{post.user.name}</div>
                        <div className="text-xs text-gray-500">
                            {moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                        </div>
                    </div>
                    <div className="mb-2 text-gray-900">{post.content}</div>
                    {post.image && (
                        <div className="mb-2 my-5 flex justify-center">
                            <img src={`/storage/${post.image}`} alt="Post Image" className="rounded-lg w-full lg:w-7/12" />

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
