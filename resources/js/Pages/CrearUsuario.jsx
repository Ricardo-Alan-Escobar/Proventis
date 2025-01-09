import { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { UserPlus, Trash, Users } from "lucide-react";
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import SelectInput from '@/Components/Select';
import confetti from 'canvas-confetti';

export default function Usuarios() {

    const handleConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    };

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
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/usuarios/${id}`)
                    .then(() => {
                        Swal.fire('Eliminado', 'Usuario eliminado exitosamente.', 'success');
                        setUsers(users.filter((user) => user.id !== id));
                    })
                    .catch((error) => {
                        Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
                        console.error('Error al eliminar usuario:', error);
                    });
            }
        });
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <Head title="Usuarios" />
            <div className="px-4 pb-20 sm:px-6 lg:px-8">
                <div>
                    {/* Modal */}
                    <Modal show={modalOpen} onClose={closeModal}>
                        <h1 className="text-xl font-bold text-gray-800 px-5 pt-5">Crear Nuevo Usuario</h1>
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
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
                                <SelectInput
                                    id="role"
                                    name="role"
                                    value={data.role}
                                    handleChange={(e) => setData('role', e.target.value)}
                                    options={['admin', 'user', 'moderator']}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                    required={true}
                                />
                                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    type="submit"
                                    onClick={handleConfetti}
                                    disabled={processing}
                                    className="w-20 py-2 px-4 bg-green-500 text-sm text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    {processing ? 'Procesando...' : 'CREAR'}
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>

                <div className="mt-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded-md shadow-md mb-6">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4 sm:mb-0">
                            <Users className="mr-2" /> Lista de Usuarios
                        </h2>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 w-full sm:w-auto"
                        />
                        <button
                            onClick={openModal}
                            className="w-full sm:w-auto py-2 px-4 flex items-center justify-center bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm"
                        >
                            <UserPlus size={18} className="mr-2" /> Nuevo Usuario
                        </button>
                    </div>

                    </div>

                    {loading ? (
                        <p className="text-center text-gray-500">Cargando usuarios...</p>
                    ) : (
                        <div className="overflow-x-auto rounded-xl drop-shadow-md">
                            <table className="min-w-full bg-white">
                                <thead className="bg-green-300">
                                    <tr>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold">Nombre</th>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold">Email</th>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold">Rol</th>
                                        <th className="px-6 py-3 border-b text-left text-sm font-semibold">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, i) => (
                                        <tr key={user.id} className={i % 2 === 0 ? 'bg-white' : 'bg-emerald-50'}>
                                        <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                                        <td className=" py-2  text-sm text-gray-700">
                                            <button
                                               onClick={() => handleDelete(user.id)}
                                                 className="flex bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                  >
                                            <Trash size={16} className='mr-1'/>   Eliminar
                                                  </button>
                                          </td>
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
