import { forwardRef, useEffect, useRef } from 'react';

const SelectInput = forwardRef(function SelectInput(
    { options = [], name, id, value, className, autoComplete, required, isFocused, handleChange },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    return (
        <div className="flex flex-col items-start">
            <select
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` + className}
                ref={input}
                autoComplete={autoComplete}
                required={required}
            >
                <option value="" disabled>Seleccione una opción</option>
                {options.map((option) => (
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>
        </div>
    );
});

export default SelectInput;