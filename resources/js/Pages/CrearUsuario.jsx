import { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { UserPlus } from "lucide-react";
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';

export default function Usuarios() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/crearusuario', {
            onSuccess: () => ok("Usuario creado exitosamente"),
        });
    };

    const openModal = () => setModalOpen(true); 
    const closeModal = () => setModalOpen(false);

    const ok = (mensaje) => {
        Swal.fire({
            title: mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            didOpen: () => {
                document.querySelector('.swal2-container').removeAttribute('aria-hidden');
            }
        }).then(() => {
            reset();
            closeModal();
        });
    };

    useEffect(() => {
        axios
            .get('/usuarios')
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
                setLoading(false);
            });
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Usuarios" />
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="">
                    {/* Modal */}
                    <Modal show={modalOpen} onClose={closeModal}>
                        <h1 className="text-2xl font-bold text-green-600 px-5 pt-5 ">Crear Nuevo Usuario</h1>
                        <form onSubmit={handleSubmit} className="space-y-4 p-8">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                    Confirmar Contraseña
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                    Rol
                                </label>
                                <input
                                    id="role"
                                    type="text"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                />
                                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-1/4 py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    {processing ? 'Procesando...' : 'Crear Usuario'}
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>

                <div className="mt-12"> 
                    <div className='flex justify-between items-center bg-white p-4 rounded-md shadow-md mb-6'>
                        <h2 className="text-xl font-bold text-gray-800">Lista de Usuarios</h2>
                        <button
                            onClick={openModal}
                            className="w-40 py-2 flex px-4 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm "
                        >
                          <UserPlus size={18} className='mr-2'/>  Nuevo Usuario 
                        </button>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-500">Cargando usuarios...</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 bg-white">
                                <thead className="bg-green-600 text-white">
                                    <tr>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold">Nombre</th>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold">Email</th>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold">Rol</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
