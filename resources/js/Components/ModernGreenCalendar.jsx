'use client'

import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react'

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default function ModernGreenCalendar() {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const isSelected = (day) => {
    return day === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear();
  };

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  return (
    <div className="flex flex-col justify-center mt-10 bg-white h-[600px] w-full max-w-lg mx-auto shadow-lg rounded-xl overflow-hidden border border-green-200">
      <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <CalendarIcon size={24} />
            <h1 className="text-xl font-bold">Calendario</h1>
          </div>
          <div className="flex items-center space-x-2">
            
            <span className="text-lg font-semibold">{MONTHS[date.getMonth()]} {date.getFullYear()}</span>
          
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {DAYS.map(day => (
            <div key={day} className="font-medium text-green-100">{day}</div>
          ))}
        </div>
      </div>
      <div className="flex-grow p-6 bg-gradient-to-b from-green-50 to-white">
        <div className="grid grid-cols-7 gap-2 text-center">
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} className="p-2"></div>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            return (
              <button
                key={day}
                onClick={() => setSelectedDate(new Date(date.getFullYear(), date.getMonth(), day))}
                className={`p-2 rounded-lg transition-all transform hover:scale-110 ${
                  isToday(day) 
                    ? 'bg-green-500 text-white font-bold shadow-md' 
                    : isSelected(day)
                      ? 'bg-green-100 text-green-800 font-semibold'
                      : 'hover:bg-green-200 text-gray-700'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      <div className="bg-green-100 p-4 text-center text-green-800">
        Fecha seleccionada: {selectedDate.toLocaleDateString()}
      </div>
    </div>
  )
}

