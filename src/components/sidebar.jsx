// src/components/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
            <ul>
                <li className="mb-2">
                    <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-700">Home</Link>
                </li>
                <li className="mb-2">
                    <Link to="/exams" className="block py-2 px-4 rounded hover:bg-gray-700">Exams</Link>
                </li>
                <li className="mb-2">
                    <Link to="/reports" className="block py-2 px-4 rounded hover:bg-gray-700">Reports</Link>
                </li>
                <li className="mb-2">
                    <Link to="/settings" className="block py-2 px-4 rounded hover:bg-gray-700">Settings</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
