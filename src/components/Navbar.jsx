// src/components/Navbar.jsx

import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Online Examination System</h1>
            <div>
                <button className="px-4 py-2 bg-blue-800 rounded">Login</button>
            </div>
        </nav>
    );
};

export default Navbar;
