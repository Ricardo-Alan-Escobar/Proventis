import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isValid, format } from 'date-fns'; // Importa isValid y format
import { FaCalendarAlt } from 'react-icons/fa'; // Importa el icono de fecha

const CustomDatePicker = ({ selected, onChange, name, id }) => {
    const handleDateChange = (date) => {
        onChange({ target: { name, value: date ? format(date, 'yyyy-MM-dd') : '' } });
    };

    return (
        <div className="relative">
            <DatePicker
                selected={selected} 
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                className="mt-1 block w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                id={id}
                name={name}
                showPopperArrow={false} 
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                <FaCalendarAlt /> 
            </div>
        </div>
    );
};

export default CustomDatePicker;