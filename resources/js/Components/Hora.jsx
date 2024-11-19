'use client'

import { useState, useEffect } from 'react'

export default function Hora() {
  const [dateTime, setDateTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return date.toLocaleDateString('es-ES', options)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
  }

  const colorClasses = [
    'text-green-400',
    'text-green-500',
    'text-green-600',
    'text-pink-400',
    'text-pink-500',
    'text-pink-600'
  ]

  const getColorClass = (index) => colorClasses[index % colorClasses.length]

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 tracking-tight" aria-label={formatTime(dateTime)}>
          {formatTime(dateTime).split('').map((char, index) => (
            <span key={index} className={char !== ':' ? getColorClass(index) : 'text-gray-300'}>
              {char}
            </span>
          ))}
        </h1>
        <p className="text-xl bg-gray-100 rounded-xl p-1 px-4 text-gray-600">
          {formatDate(dateTime)}
        </p>
      </div>
    </div>
  )
}