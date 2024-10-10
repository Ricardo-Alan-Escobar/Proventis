import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function PostForm() {
    const { data, setData, post, reset } = useForm({
        content: '',
        image: null,
        file: null,
    });

    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('posts.store'), {
            onSuccess: () => reset(),
            onError: (errors) => setError(errors),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            {error && <div className="text-red-500">{error}</div>}
            <div className="mb-4">
                <textarea
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="What's on your mind?"
                    rows="3"
                />
            </div>
            <div className="mb-4">
                <input
                    type="file"
                    onChange={(e) => setData('image', e.target.files[0])}
                    className="w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div className="mb-4">
                <input
                    type="file"
                    onChange={(e) => setData('file', e.target.files[0])}
                    className="w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
                Post
            </button>
        </form>
    );
}
