import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';

const CustomDatePicker = ({ selected, onChange, name, id }) => {
    const handleDateChange = (date) => {
        if (date) {
           
            const adjustedDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                0, 
                0,
                0
            );
            onChange({ target: { name, value: format(adjustedDate, 'yyyy-MM-dd') } });
        } else {
            onChange({ target: { name, value: '' } });
        }
    };

    return (
        <div className="relative">
            <DatePicker
                selected={selected ? new Date(selected) : null}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                className="mt-1 block w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                id={id}
                name={name}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                <FaCalendarAlt />
            </div>
        </div>
    );
};

export default CustomDatePicker;
