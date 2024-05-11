import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import React from 'react';

interface JwtPayload {
    nama: string;
    role: string;
}
const UserButton = () => {
    const [nama, setNama] = useState('');
    const [role, setRole] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = '/login';
    };
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const decoded: JwtPayload = jwtDecode(token); // Define the type of decoded as JwtPayload
            setNama(decoded.nama);
            setRole(decoded.role);
        }
    }, []);

  return (
    <div className="ml-auto relative">
            <button
                className="px-12 py-4 bg-gray-100 rounded-[51px] shadow flex-col justify-start inline-flex hover:bg-slate-200 w-56"
                onClick={toggleDropdown} // Panggil fungsi toggleDropdown saat tombol diklik
            >
                <p className="text-neutral-900 text-2xl font-semibold font-['Poppins'] leading-9">{nama}</p>
                <p className="text-gray-700 text-xl font-normal font-['Poppins']">{role}</p>
            </button>
            {/* Tampilkan dropdown jika showDropdown bernilai true */}
            {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg">
                    <button className="block text-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
  );
}

export default UserButton;