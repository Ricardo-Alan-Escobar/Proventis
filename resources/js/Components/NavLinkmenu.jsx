import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center b px-1 p-4 pt-5 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? ' bg-emerald-50 text-gray-700'
                    : ' text-gray-500  hover:bg-slate-50 hover:text-gray-700 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
