import React from 'react';
import moment from 'moment';

export default function PostList({ posts }) {
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="p-4 mb-4 bg-white rounded shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-gray-600">{post.user.name}</div>
                        <div className="text-xs text-gray-500">
                            {moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                        </div>
                    </div>
                    <div className="mb-2 text-gray-900">{post.content}</div>
                    {post.image && (
                        <div className="mb-2">
                            <img src={`/storage/${post.image}`} alt="Post Image" className="w-full rounded-md" />
                        </div>
                    )}
                    {post.file && (
                        <a href={`/storage/${post.file}`} className="text-blue-500 hover:underline">
                            Download attached file
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
}
