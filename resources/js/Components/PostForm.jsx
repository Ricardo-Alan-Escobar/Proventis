import React, { useState } from 'react'; 
import { useForm } from '@inertiajs/react';

export default function PostForm() {
    const { data, setData, post, reset } = useForm({
        content: '',
        image: null,
        file: null,
        video_url: null,
    });

    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [contentError, setContentError] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if (!data.content.trim()) {
            setContentError(true);
            return;
        }

        post(route('posts.store'), {
            onSuccess: () => {
                reset();
                setImagePreview(null);
                setFileName(null);
                setContentError(false); 
            },
            onError: (errors) => setError(errors),
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('file', file);
        if (file) {
            setFileName(file.name);
        }
    };
    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setData('video_url', file);
        if (file) {
            const videoURL = URL.createObjectURL(file); 
            setVideoPreview(videoURL);
        }
    };

    return (
        <div className="w-full bg-white rounded-lg overflow-hidden">
            <form onSubmit={handleSubmit} className="p-1">
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="flex items-start space-x-4 mb-4">
                    <textarea
                        value={data.content}
                        onChange={(e) => {
                            setData('content', e.target.value);
                            setContentError(false); 
                        }}
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="¿Qué estás pensando?"
                        rows="3"
                    />
                </div>
                {contentError && (
                    <div className="text-red-500 mb-4">El campo de texto no puede estar vacío.</div>
                )}
                {imagePreview && (
                    <div className="mt-4 relative">
                        <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-lg" />
                        <button
                            type="button"
                            className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 focus:outline-none"
                            onClick={() => {
                                setImagePreview(null);
                                setData('image', null);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
                {videoPreview && (
                    <div className="mt-4 relative">
                        <video
                            src={videoPreview}
                            controls
                            className="max-w-full rounded-lg"
                        />
                        <button
                            type="button"
                            className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 focus:outline-none"
                            onClick={() => {
                                setVideoPreview(null);
                                setData('video_url', null);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                )}
                {fileName && (
                    <div className="mt-4 flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600">{fileName}</span>
                        <button
                            type="button"
                            className="ml-auto text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={() => {
                                setFileName(null);
                                setData('file', null);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
                <div className="mt-4 flex justify-between items-center border-t pt-4">
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            className="p-2 text-green-500 hover:bg-gray-100 rounded-full focus:outline-none"
                            onClick={() => document.getElementById('image-upload').click()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h- w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />


                        <button
                            type="button"
                            className="p-2 text-blue-500 hover:bg-gray-100 rounded-full focus:outline-none"
                            onClick={() => document.getElementById('file-upload').click()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                        </button>
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                         <button
                                    type="button"
                                    className="p-2 text-purple-500 hover:bg-gray-100 rounded-full focus:outline-none"
                                    onClick={() => document.getElementById('video-upload').click()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-4.992-2.896A1 1 0 008 9.11v5.778a1 1 0 001.76.777l4.992-2.896a1 1 0 000-1.555z" />
                            <rect x="2" y="3" width="20" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth={2} />
                        </svg>

                    </button>
                    <input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="hidden"
                    />

                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-blue-600"
                    >
                        Publicar
                    </button>
                </div>
            </form>
        </div>
    );
}
