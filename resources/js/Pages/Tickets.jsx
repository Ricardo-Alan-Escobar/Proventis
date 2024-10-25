import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import PostForm from '@/Components/PostForm';
import PostList from '@/Components/PostList';
import Menu from '@/Components/Menu';
import Notificaciones from '@/Components/Notificaciones';

export default function Tickets() {
    const { posts } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Tickets" />

            <div className="py-12 w-full flex justify-center items-center flex-col">
                  
                <div className="w-11/12 flex p-5 rounded-lg mb-5 shadow-md justify-center bg-white">
                    <h2 className='text-3xl'>Vista de Tickets</h2>
                </div>

                <div className='flex w-11/12'>
                <div className="w-11/12 flex p-5 rounded-lg mr-3 shadow-md justify-center bg-white">
                    <h2 className='text-3xl'>Abiertos</h2>
                </div>
                <div className="w-11/12 flex p-5 rounded-lg ml-3 shadow-md justify-center bg-white">
                    <h2 className='text-3xl'>Cerrados</h2>
                </div>
                </div>
               
            </div>
        </AuthenticatedLayout>
    );
}