"use client";

import axios from 'axios';
import Image from 'next/image';
import Background from '../../../public/pattern.svg';
import Dropdown from '../components/dropdown';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TambahAntrian() {
    const antrianAPI = "http://localhost:8080/antrian";

    const [name, setName] = useState('');
    const [nik, setNik] = useState('');
    const options = [
        { label: 'Poli Umum', value: 'umum' },
        { label: 'Poli Gigi', value: 'gigi' },
        { label: 'Bidan', value: 'bidan' },
    ]
    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionClick = (option:any) => {
        setSelectedOption(option.value);
    };

    const router = useRouter();

    const sendDataToApi = async (name: string, nik: string, poli: string) => {
        const requestBody = {
            "nik" : nik,
            "nama" : name,
            "status" : true,
            "poli" : poli,
            "instalasi" : "pratama",
        };
      
        try {
          const response = await axios.post(antrianAPI, requestBody);
      
          if (response.status >= 200 && response.status < 300) {
            console.log('API Response:', response.data);
            alert("Berhasil menambahkan antrian")
            router.push('/frontoffice-dashboard'); 
          } else {
            alert('Error:'+ response.status + response.statusText);
          }
        } catch (error:any) {
          console.log('API Error:', error);
          alert("Error: " + error.response.data.message + "!")
        }
    };
      
    const handleSubmit = () => {
        if (name && nik && selectedOption) {
            sendDataToApi(name, nik, selectedOption);
          } else {
            alert('Silahkan mengisi seluruh data yang dibutuhkan!');
          }
    }

    return (
        <div className='flex flex-col md:flex-row bg-tint6'>
            <Image 
                src={Background} 
                alt="Background" 
                className="h-screen md:w-1/2"
            />
            <div className='text-shade6 font-poppins w-full md:w-auto'>
                <p className='text-5xl font-extrabold mt-20 mb-4' data-testid="title">DAFTAR BEROBAT</p>
                <p className='text-2xl font-medium mr-10' data-testid="desc">Jika baru pertama kali mendaftar, silahkan ke menu pendaftaran pasien</p>
                <div className='mt-14'>
                    <div>
                        <p className='text-2xl'>Nama</p>
                        <input 
                            value={name}
                            data-testid="input-name" 
                            onChange={(e) => setName(e.target.value)}
                            className="w-full md:w-96 h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7" 
                            placeholder="Masukkan nama pasien"
                        />
                    </div>
                    <div>
                        <p className='text-2xl mt-4'>NIK</p>
                        <input 
                            value={nik}
                            data-testid="input-nik"
                            onChange={(e) => setNik(e.target.value)} 
                            className="w-full md:w-96 h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7" 
                            placeholder="Masukkan NIK pasien"
                        />
                    </div>
                    <div data-testid="dropdown-poli" className="w-full md:w-96">
                        <p className='text-2xl mt-4'>Poli</p>
                        <Dropdown
                            options={options}
                            onSelect={handleOptionClick}
                        />
                    </div>
                    <button 
                        onClick={handleSubmit}
                        className='bg-primary1 h-11 w-full md:w-36 rounded-3xl text-white font-poppins mt-4'>
                        Lanjut
                    </button>
                </div>
            </div>
        </div>
    );
}    