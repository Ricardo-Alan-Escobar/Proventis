import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UserAvatar from '@/Components/UserAvatar';
import Banner from '/public/images/Banner general 2.png'
import { Camera, UserRoundPen, Mail,GraduationCap, Cake, MapPin, Phone, Building2 } from 'lucide-react';

export default function Usuario({ user }) {
    const [activeTab, setActiveTab] = useState('datos');

    if (!user) {
        return (
            <AuthenticatedLayout>
                <Head title="MiPerfil" />
                <div className="py-12 text-center">
                    <p className="text-gray-500">No se pudo cargar la información del usuario.</p>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="MiPerfil" />

            <div className=" flex justify-center bg-white  flex-col lg:flex-row">
                <div className="text-center w-full h-auto  drop-shadow-sm">
                    {/* Foto de Portada */}
                    <div className="relative flex justify-center mb-5">
                        <img
                            src={Banner}
                            alt="Foto de Portada"
                            className="w-full h-[400px]"
                        />
                        {/* UserAvatar encima de la portada */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                            <UserAvatar
                                name={user?.name || 'U'}
                                size="w-32 h-32 text-5xl"
                                className="border-4 border-white rounded-full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center rounded-md bg-slate-100 pt-11">
                        {/* Foto de Perfil y nombre */}
                        <strong className="text-3xl text-gray-800 mt-3">{user.name || 'N/A'}</strong>
                        <p className="text-xl text-gray-500">{user.occupation || 'N/A'}</p>

                        <div className="my-6 flex text-sm">
                            <a
                                href="/profile"
                                className="mr-2 flex text-white items-center rounded-md bg-gray-900 px-4 p-3"
                            >
                                <UserRoundPen size={20} className="mr-2" />
                                Editar Perfil
                            </a>

                            <a
                                href="#"
                                className="ml-2 flex bg-white rounded-md items-center p-3 px-4 border-2"
                            >
                                <Camera size={20} className="mr-2" />
                                Subir Foto
                            </a>
                        </div>
                    

                    {/* Tabs */}
                    <div className=" w-full px-5">
                        <nav className="flex justify-center space-x-4" aria-label="Tabs">
                            <button
                                className={`py-2 px-4 text-sm font-medium w-5/12 rounded-md transition-all duration-200 ${
    activeTab === 'datos'
                                        ? 'bg-white text-black shadow-lg'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                onClick={() => setActiveTab('datos')}
                            >
                                Sobre mi
                            </button>
                            <button
                                className={`py-2 px-4 text-sm font-medium w-5/12 rounded-md transition-all duration-200 ${
    activeTab === 'construccion'
                                        ? 'bg-white text-black shadow-lg'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                onClick={() => setActiveTab('construccion')}
                            >
                                Certificados
                            </button>
                        </nav>
                    </div>

                    {/* Contenido de las Tabs */}
                    <div className="p-6 bg-white my-5 rounded-md w-10/12">
                        {activeTab === 'datos' && (
                            <div>
                                
                                <div className=' text-start mb-5'>
                                 <strong className="text-xl mt-4">Biografía</strong>
                                <p className="text-gray-700 px-2 pt-2">{user.bio || 'N/A'}</p>
                                </div>

                                <div className='flex'>

                                <div className=' w-full text-start'>
                                <strong className="text-lg flex mt-4"><Mail className='pr-1 mr-1'/>Email</strong>
                                <p className="text-gray-700">{user.email || 'N/A'}</p>

                                
                                <strong className="text-lg mt-4 flex"><GraduationCap className='pr-1 mr-1'/>Educación</strong>
                                <p className="text-gray-700">{user.education || 'N/A'}</p>


                                <strong className="text-lg mt-4 flex"><Cake className='pr-1 mr-1'/>Cumpleaños</strong>
                                <p className="text-gray-700">{user.website || 'N/A'}</p>

                               

                              

                                </div>


                                <div className=' w-full text-start'>
                                <strong className="text-lg mt-4 flex"><MapPin className='pr-1 mr-1'/>Localidad</strong>
                                <p className="text-gray-700">{user.location || 'N/A'}</p>

                                <strong className="text-lg mt-4 flex"><Phone className='pr-1 mr-1'/>Teléfono</strong>
                                <p className="text-gray-700">{user.phone || 'N/A'}</p>

                                <strong className="text-lg mt-4 flex"><Building2 className='pr-1 mr-1' />Empresa</strong>
                                <p className="text-gray-700">{user.work || 'N/A'}</p>
                            
                                </div>
                            
                                </div>

                            </div>
                        )}

                        {activeTab === 'construccion' && (
                            <div className="text-center text-gray-500">
                                Sin certificaciones
                            </div>
                        )}
                    </div>


                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
