import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';



export default function Tickets() {
    const { posts } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Tickets" />
            
          
        </AuthenticatedLayout>
    );
}