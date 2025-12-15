import React from 'react';

const GenericButton = ({ children, onClick, type }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className="bg-black text-white py-3 px-6 rounded-sm transition-colors duration-400 flex items-center justify-center gap-2 opacity-80 hover:opacity-100"
        >
            {children}
        </button>
    );
};

export default GenericButton;