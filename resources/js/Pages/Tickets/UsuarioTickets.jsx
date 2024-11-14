import React, { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';  
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from 'sweetalert2';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import CustomDatePicker from '@/Components/DatePicker';
import { parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const UsuarioTickets = ({user, userTickets }) => {
    
    const { data, setData, post, reset, errors, processing } = useForm({
        Nombre: user ? user.name : '',
        Departamento: '',
        Problema: '',
        Prioridad: 'Normal',
        Estado: 'Abierto',
        Creacion: '',
        Termino: ''
    });

    const [modal, setModal] = useState(false);
    const nombreInput = useRef(null);
    const departamentoInput = useRef(null);
    const prioridadInput = useRef(null);
    const estadoInput = useRef(null);
    const problemaInput = useRef(null);

    const openModal = () => setModal(true);
    const closeModal = () => {
        setModal(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tickets.store'), {
            onSuccess: () => {
                reset();
                closeModal();
                ok('¡Ticket Añadido!');
            },
        });
    };


    const ok = (mensaje) => {
        // Primero mostramos la alerta
        Swal.fire({
            title: mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            didOpen: () => {
                // Asegúrate de que el contenedor de la alerta no tenga aria-hidden
                document.querySelector('.swal2-container').removeAttribute('aria-hidden');
            }
        }).then(() => {
            // Luego de que la alerta se haya cerrado, reseteamos y cerramos el modal
            reset();
            closeModal();
        });
    }


    return (
        <AuthenticatedLayout>
            <Head title="Mis Tickets" />

            <div className='p-6'>
                <PrimaryButton onClick={openModal}>
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Añadir Ticket
                </PrimaryButton>

                <h2 className="text-xl font-bold mt-8 mb-4">Mis Tickets</h2>

                <div className="w-full overflow-hidden bg-white rounded-lg shadow-md ">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-green-300 text-gray-700">
                                <th className="px-4 py-2 text-center">Id</th>
                                <th className="px-4 py-2 text-center">Nombre</th>
                                <th className="px-4 py-2 text-center">Departamento</th>
                                <th className="px-4 py-2 text-center">Problema</th>
                                <th className="px-4 py-2 text-center">Prioridad</th>
                                <th className="px-4 py-2 text-center">Estado</th>
                                <th className="px-4 py-2 text-center">Creación</th>
                                <th className="px-4 py-2 text-center">Término</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userTickets.map((ticket, index) => (
                                <tr key={ticket.id} className={index % 2 === 0 ? 'bg-emerald-50' : 'bg-white'}>
                                    <td className="px-4 py-2 text-center">{index + 1}</td>
                                    <td className="px-4 py-2 text-center">{ticket.Nombre}</td>
                                    <td className="px-4 py-2 text-center">{ticket.Departamento}</td>
                                    <td className="px-4 py-2 text-center">{ticket.Problema}</td>
                                    <td className={`px-4 py-2 text-center ${ticket.Prioridad === 'Urgente' ? 'text-orange-500' : 'text-black'}`}>{ticket.Prioridad}</td>
                                    <td className="px-4 py-2 text-center">
                                        <div className={`inline-block px-2 py-1 rounded-lg ${
                                          ticket.Estado === 'Abierto' ? 'bg-blue-400 text-white' :
                                          ticket.Estado === 'Cerrado' ? 'bg-green-500 text-white' :
                                          ticket.Estado === 'En Seguimiento' ? 'bg-gray-200 text-black' : ''
                                      }`}>
                                          {ticket.Estado}
                                      </div>
                                    </td>
                                    <td className="px-4 py-2 text-center">{ticket.Creacion}</td>
                                    <td className="px-4 py-2 text-center">{ticket.Termino}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={modal} onClose={closeModal}>
                <h2 className="pl-4 my-4 text-lg font-medium text-gray-900">Añadir Nuevo Ticket</h2>
                <form onSubmit={handleSubmit} className="p-2 mr-4 ml-4">
                    <div className='mt-2'>
                        <InputLabel htmlFor="Nombre" value="Nombre" />
                        <TextInput
                            id="Nombre"
                            name="Nombre"
                            value={data.Nombre}
                            className="mt-1 block w-full"
                            autoComplete="Nombre"
                            isFocused
                            disabled  // Aquí se desactiva el campo
                            required
                        />
                        <InputError message={errors.Nombre} className="mt-2" />
                    </div>
                    <div className='mt-2'>
                        <InputLabel htmlFor="Departamento" value="Departamento" />
                        <TextInput
                            id="Departamento"
                            name="Departamento"
                            ref={departamentoInput}
                            value={data.Departamento}
                            className="mt-1 block w-full"
                            autoComplete="Departamento"
                            onChange={(e) => setData('Departamento', e.target.value)}
                            required
                        />
                        <InputError message={errors.Departamento} className="mt-2" />
                    </div>
                    
                    <div className='mt-2'>
                        <InputLabel htmlFor="Problema" value="Problema" />
                        <TextInput
                            id="Problema"
                            name="Problema"
                            ref={problemaInput}
                            value={data.Problema}
                            className="mt-1 block w-full"
                            autoComplete="Problema"
                            onChange={(e) => setData('Problema', e.target.value)}
                            required
                        />
                        <InputError message={errors.Problema} className="mt-2" />
                    </div>
                    <div className='flex mt-2 px-4'>
                        <InputLabel htmlFor="Creacion" value="Creación:" className='px-4 pt-3'></InputLabel>
                        <CustomDatePicker
                            id="Creacion"
                            name="Creacion"
                            selected={data.Creacion ? parseISO(data.Creacion) : null}
                            onChange={(e) => setData('Creacion', e.target.value)}
                        />
                        <InputError message={errors.Creacion} className="mt-2" />
                    
                        <InputLabel htmlFor="Termino" value="Término:" className='px-4 pt-3'></InputLabel>
                        <CustomDatePicker
                            id="Termino"
                            name="Termino"
                            selected={data.Termino ? parseISO(data.Termino) : null}
                            onChange={(e) => setData('Termino', e.target.value)}
                        />
                        <InputError message={errors.Termino} className="mt-2" />
                    </div>
                    <div className="flex justify-end mt-3 mb-4">
                        <SecondaryButton onClick={closeModal} className="mr-2">Cancelar</SecondaryButton>
                        <PrimaryButton type="submit" disabled={processing}>
                            <FontAwesomeIcon icon={faFloppyDisk} className='pr-2' /> Guardar
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default UsuarioTickets;
