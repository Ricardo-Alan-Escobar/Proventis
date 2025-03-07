import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import PostForm from '@/Components/PostForm';
import PostList from '@/Components/PostList';
import Menu from '@/Components/Menu';
import Notificaciones from '@/Components/Notificaciones';
import ListUsers from '@/Components/ListUsers';
import ModernGreenCalendar from '@/Components/ModernGreenCalendar';

export default function Dashboard() {
    const { posts } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Inicio" />

            <div className="py-7 flex pb-14 flex-col lg:flex-row">
                <div className='hidden lg:block lg:w-1/4 px-4 lg:max-w-none lg:min-w-1050 '>
                    <Menu />
                    <ModernGreenCalendar />
                </div>

                <div className="w-full lg:w-2/4   ">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg mb-6 ">
                        <div className="p-6 text-gray-900">
                            <h2 className="mb-4 text-xl font-bold">Crear nuevo post</h2>
                            <PostForm />
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-4 text-xl font-bold mx-4">Posts Recientes</h2>
                        <PostList posts={posts} />
                    </div>
                </div>
                
                <div className="hidden lg:block lg:w-1/4 px-4 lg:max-w-none lg:min-w-1050">
                <Notificaciones />
                <ListUsers />
                </div>

               
            </div>
        </AuthenticatedLayout>
    );
}