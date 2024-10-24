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

            <div className="py-12 flex flex-col lg:flex-row">
                   <h2>Vista de Tickets</h2>
                <div className="w-full lg:w-2/4">
                   tickets 
                   abiertos 
                   cerrados
                   en seguiomento
                   pendiantes
                   
                </div>
                
              
               
            </div>
        </AuthenticatedLayout>
    );
}