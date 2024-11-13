export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border
                 border-spacing-1 text-gray-700 hover:text-white  px-4 py-2 
                 text-xs font-semibold uppercase tracking-widest
                  transition duration-150 ease-in-out focus:bg-red-500 focus:text-white
                   hover:bg-red-500 focus:outline-none focus:ring-2
                    focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
