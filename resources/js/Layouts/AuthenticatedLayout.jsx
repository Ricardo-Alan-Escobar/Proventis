import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Home, Ticket, Settings, LogOut, UserRound } from "lucide-react";
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import LogoLayout from '@/Components/LogoLayout';

export default function Authenticated({ header, children }) {
    const user = usePage().props.auth.user;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

        
        const toggleMenu = () => {
            setIsMenuOpen((prev) => !prev);
        };
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Logo a la izquierda */}
                        <div className="flex items-center">
                            <Link href="/dashboard">
                               <LogoLayout></LogoLayout>
                            </Link>
                        </div>

                        {/* Iconos en el centro */}
                        <div className="hidden sm:flex sm:space-x-8 items-center justify-center">
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                            <Home />
                            </NavLink>

                            <NavLink href={route('tickets.index')} active={route().current('tickets.index')}>
                                <Ticket />
                                </NavLink>

                            <NavLink href={route('tickets.userTickets')} active={route().current('tickets.userTickets')}>
                                <Ticket />
                                </NavLink>
                           
                           
                          
                        </div>

                     
                        <div className="hidden sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center bg-emerald-50 rounded-md border border-transparent  px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-800 focus:outline-none focus:shadow-inner  hover:shadow-inner"
                                            >
                                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user pr-1"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                    <Dropdown.Link href={route('usuario', { id: user.id })}>
                                      Perfil
                                    </Dropdown.Link>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Configuracion de  cuenta
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            <div className="flex">
                                           Cerrar Sesión<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out ml-2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                                        </div></Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>







                {/* Responsive Navigation Menu */}
                    <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white shadow-md border-t border-gray-200 flex justify-around items-center z-50">
                        {/* Dashboard Link */}
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className="flex flex-col items-center text-gray-600 hover:text-green-600 transition duration-300"
                        >
                           <Home />
                            <span className="text-xs mt-1">Inicio</span>
                        </ResponsiveNavLink>

                        {/* Ticket Link */}
                        <ResponsiveNavLink
                            href={route('tickets.index')}
                            active={route().current('tickets.index')}
                            className="flex flex-col items-center text-gray-600 hover:text-green-600 transition duration-300"
                        >
                          <Ticket />
                            <span className="text-xs mt-1">Tickets</span>
                        </ResponsiveNavLink>

                        {/* Ticket usuario Link */}
                        <ResponsiveNavLink
                            href={route('tickets.userTickets')}
                            active={route().current('tickets.userTickets')}
                            className="flex flex-col items-center text-gray-600 hover:text-green-600 transition duration-300"
                        >
                          <Ticket />
                            <span className="text-xs mt-1">Tickets</span>
                        </ResponsiveNavLink>

                        {/* Profile Link */}
                        <ResponsiveNavLink
                            href={route('usuario', { id: user.id })}
                            active={route().current('usuario')}
                            className="flex flex-col items-center text-gray-600 hover:text-green-600 transition duration-300"
                        >
                            <UserRound />
                            <span className="text-xs mt-1">Perfil</span>
                        </ResponsiveNavLink>

                      
                       
                    </div>

                    {/* User Info Section */}
                    <div className="fixed top-0 left-0 w-full bg-white shadow-md border-b border-gray-200 py-4 px-4 z-50 sm:hidden">
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-medium text-gray-800">
                                Hola, {user.name.split(" ")[0]} 👋
                            </div>
                            <button
                                onClick={toggleMenu} // Cambia el estado del menú
                                className="text-gray-600 hover:text-green-600 focus:outline-none transition duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>

                        {/* Menú desplegable (visible solo si isMenuOpen es true) */}
                        <div
                            className={`transition-all duration-300 overflow-hidden ${
                                isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                            <div className="space-y-1 pb-3 pt-2">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                <Settings size={19} className='mr-2'/>   Configuración de la cuenta
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                    className='text-red-500'
                                >
                                    <LogOut size={19} className='mr-2'/>  Cerrar Sesión
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>






            </nav>

            {/* Page Heading */}
            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Page Content */}
            <main>{children}</main>
        </div>
    );
}
