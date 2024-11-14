import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import Fondo from '@/Components/Img/fondo02.png';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
        <div className="flex">

        <div className="hidden lg:block w-6/12 h-screen bg-black">
            <img src={Fondo} alt="Banner" className="h-screen" />
        </div>


        <div className="w-full h-screen lg:w-6/12 px-5">
        <GuestLayout>
            <Head title="Iniciar Sesion" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <div className="flex items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <InputLabel htmlFor="email" value="Correo:" className='ml-1'/>
                    </div>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">

                <div className="flex items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-keyhole"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>
                    <InputLabel htmlFor="password" value="Contraseña:" className='ml-1' />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Recordar Cuenta
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>  
                    )}

                    <PrimaryButton className="ms-4 bg-green-500 hover:bg-green-800" disabled={processing}>
                        Ingresar
                    </PrimaryButton>
                </div>
            </form>
            <hr className="my-5"/>
            <div className="text-center my-7  flex justify-center">
                <a href="/login" className="p-4 px-20 bg-rose-600 rounded-lg text-white hover:bg-rose-800" >Iniciar sesión con Google</a>
            </div> 
          
        </GuestLayout>
   
        </div>
    <div className=' fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 text-xs '>
    <p className='box-decoration-slice rounded bg-gradient-to-r from-green-600 to-blue-500 text-center mb-1 text-white px-2'>Proventis 2024. ©</p>
    <p className='box-decoration-slice rounded bg-gradient-to-r from-green-600 to-blue-500 text-white px-2'>Todos los derechos reservados.</p></div>
         </div>
       
        
        </>
    );
}
