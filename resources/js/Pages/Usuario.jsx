import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import PostForm from '@/Components/PostForm';
import PostList from '@/Components/PostList';
import Menu from '@/Components/Menu';
import Notificaciones from '@/Components/Notificaciones';

export default function Dashboard() {
    const { posts } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="MiPerfil" />

            <div className="py-12 flex justify-center flex-col lg:flex-row">
                <div className='bg-white rounded drop-shadow-sm'>

                s
                </div>

                
               
            </div>
        </AuthenticatedLayout>
    );
}