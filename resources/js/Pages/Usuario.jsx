import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import PostForm from '@/Components/PostForm';
import PostList from '@/Components/PostList';
import Menu from '@/Components/Menu';
import Notificaciones from '@/Components/Notificaciones';

export default function Usuario({user}) {
    const { posts } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="MiPerfil" />
  
            <div className="py-12 flex px-5 justify-center flex-col lg:flex-row">
                <div className='bg-white rounded drop-shadow-sm'>
                
           
                </div>
                <div className='w-full h-screen bg-white rounded drop-shadow-sm'>

Pagina de usuario
</div>

                
               
            </div>
        </AuthenticatedLayout>
    );
}