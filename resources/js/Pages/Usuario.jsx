import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UserAvatar from '@/Components/UserAvatar';
import Banner from '/public/images/Banner general 2.png';
import { Camera, UserRoundPen, Mail, GraduationCap, Cake, MapPin, Phone, Building2, Icon } from 'lucide-react';

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

            <div className="flex flex-col items-center bg-white lg:flex-row lg:justify-center">
                <div className="w-full lg:w-3/4">
                    {/* Foto de Portada */}
                    <div className="relative flex justify-center mb-5">
                        <img
                            src={Banner}
                            alt="Foto de Portada"
                            className="w-full h-48 rounded-md sm:h-64 md:h-80 lg:h-[400px] object-cover"
                        />
                        {/* UserAvatar encima de la portada */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                            <UserAvatar
                                name={user?.name || 'U'}
                                size="w-24 h-24 sm:w-32 sm:h-32 text-4xl sm:text-5xl"
                                className="border-4 border-white rounded-full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center rounded-md bg-slate-100 pt-11">
                        {/* Foto de Perfil y nombre */}
                        <strong className="text-xl sm:text-3xl text-gray-800 mt-3">{user.name || 'N/A'}</strong>
                        <p className="text-sm sm:text-xl text-gray-500">{user.occupation || 'N/A'}</p>

                        <div className="my-6 flex flex-col sm:flex-row text-sm">


                        <a className=" group relative bg-black inline-flex py-2 px-8 items-center justify-center overflow-hidden rounded-md bg-nprimary text-white font-medium duration-500 "
                         href="/profile"
                          target="_blank"> 
                          <div className=" flex translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0 font-semibold ">
                           <UserRoundPen size={16} className='mr-2'/> Editar Mi Perfil
                            </div>
                             <div className="absolute flex justify-center translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"> 
                                <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6 stroke-[8px]">
                                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>  </div>     </a>



                            <a
                                href="#"
                                className="sm:ml-2 flex items-center justify-center bg-white rounded-md border-2 px-4 py-3"
                            >
                                <Camera size={20} className="mr-2" />
                                Subir Foto
                            </a>
                        </div>

                        {/* Tabs */}
                        <div className="w-full px-4">
                            <nav className="flex justify-center space-x-2 sm:space-x-4" aria-label="Tabs">
                                <button
                                    className={`py-2 px-4 text-sm font-medium w-5/12 rounded-md transition-all duration-200 ${
                                        activeTab === 'datos'
                                            ? 'bg-white text-black shadow-lg'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    onClick={() => setActiveTab('datos')}
                                >
                                    Sobre mí
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
                        <div className="p-6 bg-white my-5 rounded-md w-full mb-7 sm:w-10/12">
                            {activeTab === 'datos' && (
                                <div>
                                    <div className="text-start mb-5">
                                        <strong className="text-lg sm:text-xl">Biografía</strong>
                                        <p className="text-gray-700 px-2 pt-2">{user.bio || 'N/A'}</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row">
                                        <div className="w-full text-start">
                                            <strong className="text-lg flex mt-4"><Mail className="pr-1 mr-1" />Email</strong>
                                            <p className="text-gray-700">{user.email || 'N/A'}</p>

                                            <strong className="text-lg mt-4 flex"><GraduationCap className="pr-1 mr-1" />Educación</strong>
                                            <p className="text-gray-700">{user.education || 'N/A'}</p>

                                            <strong className="text-lg mt-4 flex"><Cake className="pr-1 mr-1" />Cumpleaños</strong>
                                            <p className="text-gray-700">{user.website || 'N/A'}</p>
                                        </div>

                                        <div className="w-full text-start mt-4 sm:mt-0">
                                            <strong className="text-lg mt-4 flex"><MapPin className="pr-1 mr-1" />Localidad</strong>
                                            <p className="text-gray-700">{user.location || 'N/A'}</p>

                                            <strong className="text-lg mt-4 flex"><Phone className="pr-1 mr-1" />Teléfono</strong>
                                            <p className="text-gray-700">{user.phone || 'N/A'}</p>

                                            <strong className="text-lg mt-4 flex"><Building2 className="pr-1 mr-1" />Empresa</strong>
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
