import { Head, Link } from '@inertiajs/react';
import Fondo from '@/Components/Img/fondo03.png';
import Modal from '@/Components/Modal';
import { useState } from 'react';

export default function Welcome({ auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 dark:from-gray-900 dark:to-black dark:text-gray-300 min-h-screen">
                <div className="relative flex flex-col items-center justify-center">
                    <header className="w-full bg-white/70 dark:bg-gray-800/70 shadow-md sticky top-0 z-50">
                        <div className="container mx-auto flex items-center justify-between p-4 lg:px-8">
                            <div className="text-2xl font-bold text-[#35fb63]">
                                Proventis
                            </div>
                            <nav className="flex space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-4 py-2 bg-[#35fb63] text-white rounded-md hover:bg-[#35fb63] focus:ring focus:ring-[#35fb63]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 text-[#35fb63] border border-[#35fb63] rounded-md hover:bg-[#35fb63] hover:text-white transition"
                                        >
                                            Log in
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </header>

                    <main className="container mx-auto flex flex-col items-center justify-center px-6 py-16 lg:px-12 lg:py-24">
                        <div className="text-center space-y-6">
                            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 dark:text-white">
                                Bienvenido a <span className="text-[#35fb63]">Proventis</span>
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                                La solución moderna para la gestión y productividad.
                            </p>
                        </div>
                        <img
                            src={Fondo}
                            alt="Fondo"
                            className="mt-8 h-[300px] lg:h-[500px] rounded-md shadow-lg"
                            onError={handleImageError}
                        />
                        <div className="mt-8 space-x-4">
                           
                            <button  
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-3 text-lg text-[#35fb63] border border-[#35fb63] rounded-md hover:bg-[#35fb63] hover:text-white transition">
                                Ver Caracteristicas
                            </button>
                        </div>
                    </main>

                    <footer className="w-full bg-white dark:bg-gray-800 shadow-md py-4 mt-16">
                        <div className="container mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
                            <p>Proventis | Todos los derechos reservados © 2024</p>
                           

                           <p className="pt-2 text-center text-gray-600 dark:text-gray-400">
    Desarrollado por:
    <strong className="pl-3 relative group">
        <a
            href="https://portafolio-ricardo-escobar.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-700 transition duration-300 ease-in-out relative inline-block"
        >
            <span>
                Ricardo Escobar
                <span className="absolute left-0 bottom-0 h-[2px] w-full bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
        </a>
        {/* Tooltip */}
        <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            ¡Haz clic para visitar mi portafolio! 👌
        </span>
    </strong>
</p>




                        </div>
                    </footer>
                    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 ">
                                ¿Que es Proventis?
                            </h2>
                            <div className="mt-4 text-gray-700 ">
                            Proventis es una plataforma integral y moderna diseñada para mejorar la <strong>comunicación, la colaboración</strong>  y la gestión de tareas dentro de las empresas.
                            <p className='pt-1'> La aplicación combina las funciones esenciales de una red social corporativa con herramientas de productividad, creando un entorno digital en el 
                            que los empleados pueden interactuar, capacitarse y gestionar su día a día de manera eficiente y centralizada.</p> <p className='pt-1'> Su objetivo es optimizar tanto el flujo de 
                            trabajo como las relaciones laborales, facilitando que las organizaciones crezcan de manera más ágil y conectada.</p>
                            </div>
                            <h3 className="text-xl py-6 font-semibold text-gray-800 ">
                                Caracteristicas
                            </h3>
                            <div className=" text-gray-700 "> 
                            Proventis ofrece herramientas clave para la gestión empresarial: cursos y capacitación continua, encuestas y retroalimentación interna, gestión de solicitudes
                             administrativas, seguimiento de actividades laborales, gestión de quejas y sugerencias, red social interna para empleados, notificaciones y recordatorios, 
                             análisis en tiempo real para administradores, acceso móvil y multiplataforma, e integraciones y personalización con otros sistemas. <p className='pt-1'> Todo esto contribuye a un 
                             entorno colaborativo y eficiente, con un enfoque en el crecimiento y la productividad del equipo.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-[#3a7c4e] transition"
                            >
                                Cerrar
                            </button>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    );
}
