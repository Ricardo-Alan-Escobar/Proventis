import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import PostForm from '@/Components/PostForm';
import PostList from '@/Components/PostList';

export default function Dashboard() {
    const { posts } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="mb-4 text-xl font-bold">Crear nuevo post</h2>
                            <PostForm />
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="mb-4 text-xl font-bold">Latest Posts</h2>
                        <PostList posts={posts} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
