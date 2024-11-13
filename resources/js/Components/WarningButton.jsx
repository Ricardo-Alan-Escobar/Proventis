export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 text-gray-700 border 
                border-spacing-2 rounded-md font-semibold text-xs uppercase 
                tracking-widest hover:bg-emerald-400 hover:text-white focus:bg-emerald-600 focus:text-white active:bg-emerald-400 
                focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition 
                ease-in-out duration-150  ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}