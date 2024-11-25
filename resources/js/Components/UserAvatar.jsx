import React from 'react';

const generateColor = (name) => {
    const colors = [
        '#2A58EB', '#628971', '#1ABC9C', '#060404',
        '#FF5733', '#33FF57', '#3357FF', '#FF33A8',
        '#2ECC71', '#3498DB', '#C0392B', '#D35400',
        '#16A085', '#2980B9', '#8E44AD', '#2C3E50',
        '#27AE60', '#E67E22', '#E74C3C', '#F1C40F',
        '#9B59B6', '#34495E', '#7F8C8D', '#BDC3C7',
        '#F39C12', '#EC7063', '#AED6F1', '#F5B041',
        '#58D68D', '#AF7AC5', '#5DADE2', '#48C9B0',
        '#D4AC0D', '#85929E', '#DC7633', '#99A3A4'
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
};

const getInitials = (name) => {
    const words = name ? name.split(' ') : [];
    const firstInitial = words[0] ? words[0][0] : '';
    const secondInitial = words[1] ? words[1][0] : '';
    return (firstInitial + secondInitial).toUpperCase();
};

const UserAvatar = ({ name, className = '', size = 'w-10 h-10 text-sm' }) => {
    const color = generateColor(name || 'Usuario');
    const initials = getInitials(name || 'Usuario');

    return (
        <div
            className={`${size} flex items-center justify-center rounded-full font-bold text-white ${className}`}
            style={{ backgroundColor: color }}
        >
            {initials}
        </div>
    );
};

export default UserAvatar;
