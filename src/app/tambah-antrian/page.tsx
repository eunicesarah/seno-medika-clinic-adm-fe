"use client";

import Image from 'next/image';
import Background from '../../../public/pattern.svg';
import Dropdown from '../components/dropdown';
import { useState } from 'react';
export default function TambahAntrian() {
    const options = [
        { label: 'Poli Umum', value: 'umum' },
        { label: 'Poli Gigi', value: 'gigi' },
        { label: 'Bidan', value: 'bidan' },
    ]
    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionClick = (option:any) => {
        setSelectedOption(option);
    };


    return (
        <div className='flex flex-row bg-tint6'>
            <Image 
                src={Background} 
                alt="Background" 
                className=" h-screen"
            />
            <div className=' text-shade6 font-poppins w-auto'>
                <p className=' text-5xl font-extrabold mt-20 mb-4'>DAFTAR BEROBAT</p>
                <p className=' text-2xl font-medium mr-10'>Jika baru pertama kali mendaftar, silahkan ke menu pendaftaran pasien</p>
                <div className=' mt-14'>
                    <div>
                        <p className=' text-2xl '>Nama</p>
                        <input className="w-96 h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7" placeholder="Masukkan nama pasien"/>
                    </div>
                    <div>
                        <p className=' text-2xl mt-4 '>NIK</p>
                        <input className="w-96 h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7" placeholder="Masukkan NIK pasien"/>
                    </div>
                    <div>
                        <p className=' text-2xl mt-4'>Poli</p>
                        <Dropdown
                        options={options}
                        onSelect={handleOptionClick}
                        />
                    </div>
                    <button className=' bg-primary1 h-11 w-36 rounded-3xl text-white font-poppins mt-4'>
                        Lanjut
                    </button>
                </div>
            </div>
        </div>
    );
}