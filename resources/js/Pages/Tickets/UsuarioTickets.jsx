import React, { useState, useRef } from 'react';
import ReactPaginate from 'react-paginate';
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
import { Tickets, CirclePlus   } from 'lucide-react';
import {faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Hora from '@/Components/Hora';
import confetti from 'canvas-confetti';

const UsuarioTickets = ({ user, userTickets }) => {
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
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const nombreInput = useRef(null);
    const departamentoInput = useRef(null);
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

    const handleConfetti = () => { 
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
       
      };


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
    
    const pageCount = Math.ceil(userTickets.length / itemsPerPage);
    const handlePageClick = (selected) => setCurrentPage(selected.selected);

    const displayedTickets = userTickets.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    return (
        <AuthenticatedLayout>
            <Head title="Mis Tickets" />

            <div className='p-6 pb-20'>
                <div className="bg-white rounded-lg p-5 mb-5 justify-between flex drop-shadow-md">
                    <div>
                        <h2 className="text-2xl font-extrabold mb-5 flex items-center">
                            <Tickets className="mr-2 text-lg text-gray-600" />
                            Mis Tickets
                        </h2>
                        <PrimaryButton onClick={openModal} className="py-3 drop-shadow-md">
                            <CirclePlus size={22} className="mr-2" />
                            Crear Nuevo Ticket
                        </PrimaryButton>
                    </div>
                    <div className="hidden md:block">
                        <Hora />
                    </div>
                </div>

                <div className="w-full overflow-hidden bg-white rounded-lg shadow-md">
                    <div className="overflow-x-auto">
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
                                {displayedTickets.map((ticket, index) => (
                                    <tr key={ticket.id} className={index % 2 === 0 ? 'bg-white' : 'bg-emerald-50'}>
                                        <td className="px-4 py-2 text-center">{index + 1 + currentPage * itemsPerPage}</td>
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
                

                <ReactPaginate
                    previousLabel="Anterior"
                    nextLabel="Siguiente"
                    breakLabel="..."
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName="pagination flex justify-center my-5"
                    pageClassName="mx-2 px-3 py-1 border rounded hover:bg-green-300"
                    activeClassName="bg-green-300"
                    previousClassName="px-3 py-1 border rounded hover:bg-gray-50"
                    nextClassName="px-3 py-1 border rounded hover:bg-gray-50"
                    disabledClassName="opacity-50 cursor-not-allowed"
                />
            </div>
</div>
            <Modal show={modal} onClose={closeModal} >
                <h2 className="pl-4 my-6 text-xl font-medium text-gray-900">Crear nuevo ticket</h2>
                <form onSubmit={handleSubmit} className="p- mr-4 ml-4">
                    <div className='mt-2'>
                        <InputLabel htmlFor="Nombre" value="Nombre" />
                        <TextInput
                            id="Nombre"
                            name="Nombre"
                            value={data.Nombre}
                            className="mt-1 block w-full"
                            autoComplete="Nombre"
                            isFocused
                            disabled  
                            required
                        />
                        <InputError message={errors.Nombre} className="mt-2" />
                    </div>
                    <div className='mt-5'>
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
                    
                    <div className='mt-5'>
                        <InputLabel htmlFor="Problema" value="Problema" />
                        <TextInput
                            id="Problema"
                            name="Problema"
                            ref={problemaInput}
                            value={data.Problema}
                            className="mt-1 block w-full h-20"
                            autoComplete="Problema"
                            onChange={(e) => setData('Problema', e.target.value)}
                            required
                        />
                        <InputError message={errors.Problema} className="mt-2" />
                    </div>
                    <div className=''>
                        <InputLabel htmlFor="Creacion" value="Creación:" className='mt-5'></InputLabel>
                        <CustomDatePicker
                            id="Creacion"
                            name="Creacion"
                            selected={data.Creacion ? parseISO(data.Creacion) : null}
                            onChange={(e) => setData('Creacion', e.target.value)}
                        />
                        <InputError message={errors.Creacion} className="mt-2" />
                    
                    </div>
                    <div className="flex justify-end mt-3 mb-4">
                        <SecondaryButton onClick={closeModal} className="mr-2">Cancelar</SecondaryButton>
                        <PrimaryButton type="submit" onClick={handleConfetti}  disabled={processing}>
                            <FontAwesomeIcon icon={faFloppyDisk} className='pr-2' /> Guardar
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default UsuarioTickets;
