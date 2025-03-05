import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Logo from '@/Components/Img/logo.png'

export default function Guest({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-white pt-6 sm:justify-center sm:pt-0">

            

            <div className="mt-6 w-full overflow-hidden bg-white border-2 px-6 py-4 drop-shadow-xl sm:max-w-md sm:rounded-lg">
                <div>
                <Link href="/login">
                <img src={Logo} alt="Proventis" decoding="async" loading="lazy" className='h-20 mb-8' />
                </Link>
            </div>
                {children}
            </div>
        </div>
    );
}
