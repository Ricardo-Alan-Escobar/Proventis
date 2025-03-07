import React, { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/Select';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import WarningButton from '@/Components/WarningButton';
import CustomDatePicker from '@/Components/DatePicker';
import DangerButton from '@/Components/DangerButton';
import { parseISO } from 'date-fns';
import Card from '@/Components/Cards';


export default function TicketsIndex({ auth, tickets }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const nombreInput = useRef();
    const departamentoInput = useRef();
    const problemaInput = useRef();
    const prioridadInput = useRef();
    const estadoInput = useRef();
    const creacionInput = useRef();
    const terminoInput = useRef();
    const temasAyudaInput = useRef();
    const asignadoInput = useRef();
    const { data, setData, delete: destroy, post, put, processing, reset, errors } = useForm({
        Nombre: '', Departamento:'',  Problema: '', Prioridad: '', Estado: '',  Creacion: '', Termino: '', TemasAyuda: '', Asignado: ''
    });

    const openModal = (op, id = '', Nombre= '', Departamento='', Problema= '', Prioridad= '', Estado= '',  Creacion= '', Termino= '', TemasAyuda= '', Asignado= ''  ) => {
        setModal(true);
        setOperation(op);
        if (op === 1) {
            setTitle('Añadir Ticket');
            setData({ Nombre: '', Departamento:'', Problema: '', Prioridad: '', Estado: '',  Creacion: '', Termino: '', TemasAyuda: '', Asignado: '' });
        } else {
            setTitle('Editar Ticket');
            setData({ id, Nombre, Departamento, Problema, Prioridad, Estado,  Creacion, Termino, TemasAyuda, Asignado });
        }
    }
    const countTicketsByStatus = (status) => {
        return tickets.filter(ticket => ticket.Estado === status).length;
    };

    const totalTickets = tickets.length;
    const openTickets = countTicketsByStatus('Abierto');
    const inProgressTickets = countTicketsByStatus('En Seguimiento');
    const closedTickets = countTicketsByStatus('Cerrado');
    
    const closeModal = () => {
        setModal(false);
    }

    const save = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route('tickets.store'), {
                onSuccess: () => { ok('¡Ticket Añadido!') },
                onError: handleErrors
            });
        } else {
            put(route('tickets.update', data.id), {
                onSuccess: () => { ok('¡Ticket Modificado!') },
                onError: handleErrors
            });
        }
    }

    const handleErrors = () => {
        console.log(errors);
        if (errors.Nombre) {
            reset('Nombre');
            nombreInput.current.focus();
        }
        if (errors.Departamento) {
            reset('Departamento');
            departamentoInput.current.focus();
        }
        if (errors.Problema) {
            reset('Problema');
            problemaInput.current.focus();
        }
        if (errors.Prioridad) {
            reset('Prioridad');
            prioridadInput.current.focus();
        }
        if (errors.Estado) {
            reset('Estado');
            estadoInput.current.focus();
        }
        if (errors.Creacion) {
            reset('Creacion');
            creacionInput.current.focus();
        }
        if (errors.Termino) {
            reset('Termino');
            terminoInput.current.focus();
        }
        if (errors.TemasAyuda) {
            reset('TemasAyuda');
            temasAyudaInput.current.focus();
        }
        if (errors.Asignado) {
            reset('Asignado');
            asignadoInput.current.focus();
        }
    }

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
    }

    const eliminar = (id, nombre) => {
        const alerta = Swal.mixin({ buttonsStyling: true });
        alerta.fire({
            title: '¿Seguro que quiere eliminar este ticket?',
            text: 'Se perderán los datos definitivamente',
            icon: 'question', showCancelButton: true,
            confirmButtonText: '<i class="fa-solid fa-ban"> Sí, Eliminar',
            cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('tickets.destroy', id), { onSuccess: () => { ok('¡Ticket Eliminado!') } });
            }
        });
    }

    const itemsPerPage = 10;

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const filteredTickets = searchTerm ? tickets.filter(ticket =>
        ticket.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    ) : tickets;

    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredTickets.length);
    const currentTickets = filteredTickets.slice(startIndex, endIndex);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0);
    };

    const cerrarTicket = (id) => {
        Swal.fire({
            title: '¿Estás seguro de cerrar este ticket?',
            text: 'Se dara por terminado el ticket.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                put(route('tickets.close', id), {
                    onSuccess: () => {
                        ok('¡Ticket cerrado!');
                    },
                    onError: (error) => {
                        Swal.fire({
                            title: 'Error',
                            text: 'No se pudo cerrar el ticket.',
                            icon: 'error',
                        });
                    },
                });
            }
        });
    };
    

    return (
        <AuthenticatedLayout>
            
            <Head title="Tickets"  />
            <div className='p-6 pb-20'>
                <Card 
                
                    totalTickets={totalTickets} 
                    openTickets={openTickets} 
                    inProgressTickets={inProgressTickets} 
                    closedTickets={closedTickets} 
                />
                <div className="flex w-full mb-2 justify-between">
                
                    <div className="relative mr-2 w-10/12">
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="block w-11/12 px-4 py-2 pl-10 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='text-gray-400' /> 
                        </div>
                    </div>
                    <PrimaryButton onClick={() => openModal(1)} className="w-full sm:w-auto px-3 py-2 sm:px-5 text-center bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <FontAwesomeIcon icon={faUserPlus} className="px-2" /> 
                        Añadir Ticket
                    </PrimaryButton>
                </div>
                <div className="w-full overflow-hidden bg-white rounded-lg shadow-md ">
                <div className="overflow-x-auto">
         <table className="min-w-full leading-normal">
           <thead>
            <tr className="bg-green-300 text-gray-700">
                <th className="px-4 py-2 text-center whitespace-nowrap">Id</th>
                <th className="px-4 py-2 text-center whitespace-nowrap">Nombre</th>
                <th className="px-4 py-2 text-center whitespace-nowrap">Departamento</th>
                <th className="px-4 py-2 text-center whitespace-normal min-w-[25rem]">Problema</th>
                <th className="px-4 py-2 text-center whitespace-nowrap">Prioridad</th>
                <th className="px-4 py-2 text-center whitespace-nowrap">Estado</th>
                <th className="px-4 py-2 text-center whitespace-nowrap">Categoria</th>
                <th className="px-4 py-2 text-center whitespace-nowrap">Creación</th>
                <th className="px-4 py-2 text-center whitespace-nowrap">Término</th>
                <th className="px-4 py-2 text-center whitespace-nowrap">Asignado a</th>
                <th className="px-4 py-2 text-center whitespace-nowrap">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTickets.slice().reverse().map((ticket, i) => (
                            <tr key={ticket.id} className={i % 2 === 0 ? 'bg-white' : 'bg-emerald-50'}>
                                <td className="px-4 py-2 text-center whitespace-nowrap">{startIndex + i + 1}</td>
                                <td className="px-4 py-2 text-center whitespace-nowrap">{ticket.Nombre}</td>
                                <td className="px-4 py-2 text-center whitespace-nowrap">{ticket.Departamento}</td>
                                <td className="px-4 py-2 text-center whitespace-normal min-w-[25rem]">{ticket.Problema}</td>
                                <td className={`px-4 py-2 text-center whitespace-nowrap ${ticket.Prioridad === 'Urgente' ? 'text-orange-500' : 'text-black'}`}>{ticket.Prioridad}</td>
                                <td className="px-4 py-2 text-center whitespace-nowrap">
                                    <div className={`inline-block px-2 py-1 rounded-lg ${
                                        ticket.Estado === 'Abierto' ? 'bg-blue-400 text-white' :
                                        ticket.Estado === 'Cerrado' ? 'bg-green-500 text-white' :
                                        ticket.Estado === 'En Seguimiento' ? 'bg-gray-200 text-black' : ''
                                    }`}>
                                        {ticket.Estado}
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-center whitespace-nowrap">{ticket.TemasAyuda}</td>
                                <td className="px-4 py-2 text-center whitespace-nowrap">{ticket.Creacion}</td>
                                <td className="px-4 py-2 text-center whitespace-nowrap">{ticket.Termino}</td>
                                <td className="px-4 py-2 text-center whitespace-nowrap">{ticket.Asignado}</td>
                                <td className="px-4 py-2 text-center whitespace-nowrap">
                                    <WarningButton onClick={() => openModal(2, ticket.id, ticket.Nombre, ticket.Departamento, ticket.Problema, ticket.Prioridad, ticket.Estado, ticket.Creacion, ticket.Termino, ticket.TemasAyuda, ticket.Asignado)} className='mx-1 hover:bg-amber-400'>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </WarningButton>
                                    {ticket.Estado !== 'Cerrado' && (
                                        <WarningButton onClick={() => cerrarTicket(ticket.id)} className="mx-1">
                                            Cerrar
                                        </WarningButton>
                                    )}
                                    <DangerButton onClick={() => eliminar(ticket.id, ticket.Nombre)} className='mx-1'>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </DangerButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


                    <div className="flex justify-center mt-2 mb-2">
                        <ReactPaginate
                           previousLabel="Anterior"
                           nextLabel="Siguiente"
                           breakLabel="..."
                            breakClassName={'break-me'}
                            pageCount={Math.ceil(filteredTickets.length / itemsPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={10}
                            onPageChange={handlePageClick}
                            containerClassName="pagination flex justify-center my-5"
                            previousClassName="px-3 py-1 border rounded hover:bg-gray-50"
                            pageClassName="mx-2 px-3 py-1 border rounded hover:bg-green-300"
                            nextClassName="px-3 py-1 border rounded hover:bg-gray-50"
                            activeClassName="bg-green-300"
                            disabledClassName="opacity-50 cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>
            <Modal show={modal} onClose={closeModal}>
                <h2 className="pl-4 my-4  text-lg font-medium text-gray-900 font">
                    {title}
                </h2>
                <form onSubmit={save} className="p-2 mr-4 ml-4">
                    <div className='mt-2'>
                        <InputLabel htmlFor="Nombre" value="Nombre"></InputLabel>
                        <TextInput
                            id="Nombre"
                            name="Nombre"
                            ref={nombreInput}
                            value={data.Nombre}
                            className="mt-1 block w-full"
                            autoComplete="Nombre"
                            isFocused={true}
                            onChange={(e) => setData('Nombre', e.target.value)}
                            required
                        />
                        <InputError message={errors.Nombre} className="mt-2" />
                    </div>
                    <div className='mt-2'>
                        <InputLabel htmlFor="Departamento" value="Departamento"></InputLabel>
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
                    <div className='flex mt-2 px-4'>
                        <InputLabel htmlFor="Prioridad" value="Prioridad:" className='px-4 pt-3'></InputLabel>
                        <SelectInput
                            id="Prioridad"
                            name="Prioridad"
                            ref={prioridadInput}
                            value={data.Prioridad}
                            className="mt-1 block w-full"
                            autoComplete="Prioridad"
                            handleChange={(e) => setData('Prioridad', e.target.value)}
                            options={['Normal', 'Urgente']}
                            required
                        />
                        <InputError message={errors.Prioridad} className="mt-2" />
                    
        
                        <InputLabel htmlFor="Estado" value="Estado:" className='px-4 pt-3'></InputLabel>
                        <SelectInput
                            id="Estado"
                            name="Estado"
                            ref={estadoInput}
                            value={data.Estado}
                            className="mt-1 block w-full"
                            autoComplete="Estado"
                            handleChange={(e) => setData('Estado', e.target.value)}
                            options={['Abierto', 'En Seguimiento', 'Cerrado']}
                            required
                        />
                        <InputError message={errors.Estado} className="mt-2" />
                    </div>
                     <div className='mt-2'>
                        <InputLabel htmlFor="Problema" value="Problema"></InputLabel>
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
                    <div className='mt-2'>
                        <InputLabel htmlFor="TemasAyuda " value="Categoria"></InputLabel>
                        <SelectInput
                            id="TemasAyuda"
                            name="TemasAyuda"
                            ref={temasAyudaInput}
                            value={data.TemasAyuda}
                            className="mt-1 block w-full"
                            autoComplete="TemasAyuda"
                            handleChange={(e) => setData('TemasAyuda', e.target.value)}
                            options={['Instalación Hardware', 
                                'Instalación Software',
                                 'Problema en General',
                                'Problema de Red', 
                                'Problema de Impresión', 
                                'Problema de Correo', 
                                'Salida de Herramientas',
                                'Solicitud de Validación de factura',
                                'Solicitud de Toner',
                                'Soporte AGCO solutions',
                                'Soporte CONTPAQi',
                                'Soporte SAI',
                                'Verif. Equipo de Cómputo']}
                            required
                        />
                        <InputError message={errors.TemasAyuda} className="mt-2" />
                    </div>

                    <div className='mt-2'>
                        <InputLabel htmlFor="Asignado " value="Asignar a"></InputLabel>
                        <SelectInput
                            id="Asignado"
                            name="Asignado"
                            ref={asignadoInput}
                            value={data.Asignado}
                            className="mt-1 block w-full"
                            handleChange={(e) => setData('Asignado', e.target.value)}
                            options={['Ricardo Escobar', 
                                'Luis Cruz',
                                 'David Corpi',
                                'Jorge Silva']}
                            required
                        />
                        <InputError message={errors.Asignado} className="mt-2" />
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
                        <PrimaryButton type="submit" disabled={processing}><FontAwesomeIcon icon={faFloppyDisk} className='pr-2'/> Guardar</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}