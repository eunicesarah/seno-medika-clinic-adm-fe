"use client";

import axios from 'axios';
import Image from 'next/image';
import Background from '../../../../public/pattern.svg';
import Dropdown from '../../components/dropdown';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import AlertSuccess from "../../components/alert_success";
import AlertFailed from "../../components/alert_failed";

export default function TambahAntrian() {
    const antrianAPI = "http://localhost:8080/antrian";

    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertFailed, setShowAlertFailed] = useState(false);

    const [name, setName] = useState('');
    const [no_erm, setNo_erm] = useState('');
    const options = [
        { label: 'Poli Umum Shift Pagi', value: 'Poli Umum Shift Pagi' },
        { label: 'Poli Umum Shift Sore', value: 'Poli Umum Shift Sore' },
    ]
    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionClick = (option:any) => {
        setSelectedOption(option.value);
    };

    const router = useRouter();
    const delay = (delayInms : any) => {
        return new Promise(resolve => setTimeout(resolve, delayInms));
      };

    const sendDataToApi = async (name: string, no_erm: string, poli: string) => {
        const requestBody = {
            "no_erm" : no_erm,
            "nama" : name,
            "poli" : poli,
            "instalasi" : "pratama",
        };
      
        try {
          const response = await axios.post(antrianAPI, requestBody);
      
          if (response.status >= 200 && response.status < 300) {
            console.log('API Response:', response.data);
            // alert("Berhasil menambahkan antrian")
            setShowAlertSuccess(true);
            await delay(3000);
            router.push('/frontoffice'); 
          } else {
            alert('Error:'+ response.status + response.statusText);
          }
        } catch (error:any) {
          console.log('API Error:', error);
            setShowAlertFailed(true);
        //   alert("Error: " + error.response.data.message + "!")
        }
    };
      
    const handleSubmit = () => {
        if (name && no_erm && selectedOption) {
            sendDataToApi(name, no_erm, selectedOption);
          } else {
            alert('Silahkan mengisi seluruh data yang dibutuhkan!');
          }
    }

    return (
        <div className='flex flex-col md:flex-row bg-tint6 p-4'>
            <Image 
                src={Background} 
                alt="Background" 
                className="h-screen md:w-1/2"
            />
            <div className='text-shade6 font-Poppins w-full md:w-auto'>
                <p className='text-5xl font-extrabold mt-20 mb-4' data-testid="title">DAFTAR BEROBAT</p>
                <p className='text-2xl font-medium mr-10' data-testid="desc">Jika baru pertama kali mendaftar, silahkan ke menu pendaftaran pasien</p>
                <div className='mt-14'>
                    <div>
                        <p className='text-xl font-Poppins'>Nama</p>
                        <input 
                            value={name}
                            data-testid="input-name" 
                            onChange={(e) => setName(e.target.value)}
                            className="w-full md:w-96 h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7" 
                            placeholder="Masukkan nama pasien"
                        />
                    </div>
                    <div>
                        <p className='text-xl mt-4 font-Poppins'>No. eRM</p>
                        <input 
                            value={no_erm}
                            data-testid="input-nik"
                            onChange={(e) => setNo_erm(e.target.value)} 
                            className="w-full md:w-96 h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7" 
                            placeholder="Masukkan No. eRM pasien"
                        />
                    </div>
                    <div data-testid="dropdown-poli" className="w-full md:w-96">
                        <p className='text-xl mt-4 font-Poppins'>Poli</p>
                        <Dropdown
                            options={options}
                            onSelect={handleOptionClick}
                        />
                    </div>
                    <button 
                        onClick={handleSubmit}
                        className='bg-primary1 h-11 w-full md:w-36 rounded-3xl text-white font-Poppins mt-4 hover:bg-shade6'>
                        Lanjut
                    </button>
                </div>
            </div>
            <AlertSuccess isvisible={showAlertSuccess} onClose={() => setShowAlertSuccess(false)} message="Antrian Pasien Berhasil Ditambahkan"/> 
      <AlertFailed isvisible={showAlertFailed} onClose={() => setShowAlertFailed(false)} topMessage="Antrian Pasien Gagal Ditambahkan" bottomMessage="Data tidak dapat ditambahkan karena terjadi kesalahan pada server."/>
        </div>
    );
}