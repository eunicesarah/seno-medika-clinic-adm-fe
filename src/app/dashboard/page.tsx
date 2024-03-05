"use client";

import Image from "next/image";
import SMLogo from '../../../public/Logo_Seno_Medika.svg';
import QueueLogo from '../../../public/queue.svg';
import CheckLogo from '../../../public/check.svg';
import PlusLogo from '../../../public/plus_pasien.svg';
import TurnLogo from '../../../public/giliran.svg';
import RefreshLogo from '../../../public/refresh.svg';
import React,  { useState } from 'react';
import Table from '../components/tabel_pasien'; 
import Popup from '../components/popup';
import Link from "next/link";


export default function Dashboard() {
    const data = [
        { no: 1, tanggal_masuk: '2024-03-04', nama: 'John Doe', no_antrean: 1, jenis_pasien: 'BPJS' },
        { no: 2, tanggal_masuk: '2024-03-04', nama: 'Jane Doe', no_antrean: 2, jenis_pasien: 'Umum' },
        { no: 3, tanggal_masuk: '2024-03-04', nama: 'Bob Smith', no_antrean: 3, jenis_pasien: 'Asuransi' },
        { no: 4, tanggal_masuk: '2024-03-04', nama: 'Alice Johnson', no_antrean: 4, jenis_pasien: 'BPJS' },
        { no: 5, tanggal_masuk: '2024-03-04', nama: 'Charlie Brown', no_antrean: 5, jenis_pasien: 'Umum' },
        { no: 6, tanggal_masuk: '2024-03-04', nama: 'David Lee', no_antrean: 6, jenis_pasien: 'Asuransi' },
        { no: 7, tanggal_masuk: '2024-03-04', nama: 'Eva Miller', no_antrean: 7, jenis_pasien: 'BPJS' },
        { no: 8, tanggal_masuk: '2024-03-04', nama: 'Frank White', no_antrean: 8, jenis_pasien: 'Umum' },
        { no: 9, tanggal_masuk: '2024-03-04', nama: 'Grace Davis', no_antrean: 9, jenis_pasien: 'Asuransi' },
        { no: 10, tanggal_masuk: '2024-03-04', nama: 'Henry Taylor', no_antrean: 10, jenis_pasien: 'BPJS' },
        { no: 11, tanggal_masuk: '2024-03-04', nama: 'Ivy Clark', no_antrean: 11, jenis_pasien: 'Umum' },
        { no: 12, tanggal_masuk: '2024-03-04', nama: 'Jack Wilson', no_antrean: 12, jenis_pasien: 'Asuransi' },
        { no: 13, tanggal_masuk: '2024-03-04', nama: 'Karen Harris', no_antrean: 13, jenis_pasien: 'BPJS' },
        { no: 14, tanggal_masuk: '2024-03-04', nama: 'Leo Turner', no_antrean: 14, jenis_pasien: 'Umum' },
        { no: 15, tanggal_masuk: '2024-03-04', nama: 'Mia Martin', no_antrean: 15, jenis_pasien: 'Asuransi' },
      ];

      const [showPopup, setShowPopup] = useState(false);

    return (
        <div className=" bg-primary1">
            <div className="flex mr-20 mt-14">
                <div>
                    <Image 
                        src={SMLogo} 
                        alt="Logo Seno Medika" 
                        className="w-32 h-32 ml-28"
                    />    
                </div>
                <div className="ml-auto">
                    <button className="px-12 py-4 bg-gray-100 rounded-[51px] shadow flex-col justify-start inline-flex hover:bg-slate-200">
                        <p className="text-neutral-900 text-2xl font-semibold font-['Poppins'] leading-9">Isti</p>
                        <p className="text-gray-700 text-xl font-normal font-['Poppins']">Super Admin</p>
                    </button>
                </div>
            </div>
            <div className="flex mt-9 mr-14 ml-28 justify-between gap-0">
                <div className="flex items-center ml-auto">
                    <div className="flex bg-[#609E87] mr-4 rounded-xl h-xl ml-auto">
                        <div className=" ml-5 mr-4 mt-10 mb-3">
                            <Image
                                src={QueueLogo}
                                alt="Logo Antrian"
                                width={40}
                                height={40}
                            />    
                        </div>
                        <div>
                            <p className= " w-60 text-white text-2xl font-bold font-['Poppins'] uppercase leading-7 mt-4">Total Antrian</p> {/* teks atas */}
                            <p className=" w-20 h-16 text-white text-5xl font-bold font-['Poppins'] uppercase leading-10">18</p> {/* teks bawah */}
                        </div> 
                    </div>

                    <div className="flex  bg-[#609E87] mr-4 rounded-xl h-xl ml-auto">
                        <div className=" ml-5 mr-4 mt-10 mb-3">
                            <Image
                                src={CheckLogo}
                                alt="Logo Selesai Dilayani"
                                width={40}
                                height={40}
                            />    
                        </div>
                        <div>
                            <p className= " w-60 text-white text-2xl font-bold font-['Poppins'] uppercase leading-7 mt-4">Selesai Dilayani</p> {/* teks atas */}
                            <p className="w-20 h-16 text-white text-5xl font-bold font-['Poppins'] uppercase leading-10">3</p> {/* teks bawah */}
                        </div> 
                    </div>

                    <div className="flex bg-[#609E87] mr-4 rounded-xl h-xl ml-auto">
                        <div className=" ml-5 mr-4 mt-10 mb-3">
                            <Image
                                src={TurnLogo}
                                alt="Logo Selesai Dilayani"
                                width={40}
                                height={40}
                            />    
                        </div>
                        <div>
                            <p className= " w-60 text-white text-2xl font-bold font-['Poppins'] uppercase leading-7 mt-4">Nomor Giliran</p> {/* teks atas */}
                            <p className="w-20 h-16 text-white text-5xl font-bold font-['Poppins'] uppercase leading-10">06</p> {/* teks bawah */}
                        </div> 
                    </div>
                </div>

                <button className=" rounded-xl h-36 mr-14 bg-primary1 hover:bg-shade6 shadow-xl" onClick={() => setShowPopup(true)}>
                    <div>
                        <p className= " w-72 h-8 text-white text-[32px] font-bold font-['Poppins'] uppercase leading-[38.40px] text-center mt-5">Tambah Pasien</p> {/* teks atas */}
                    </div> 
                    <div className=" mb-3 flex items-center justify-center">
                        <Image
                            src={PlusLogo}
                            alt="Logo Tambah Pasien"
                            width={70}
                            height={70}
                        />    
                    </div>
                </button>

            </div>

            <div className="flex mt-14 mb-14 mr-12">
                <p className=" font-poppins ml-28 font-bold h-11 w-[482px] text-5xl text-shade6">DAFTAR ANTREAN</p>
                <button className="rounded-[10px] ml-auto h-14 mr-8">
                    <div className="flex items-center justify-center">
                        <Image
                            src={RefreshLogo}
                            alt="Logo Refresh"
                            width={40}
                            height={40}
                        />    
                    </div>
                </button>
                <input
                    type="text"
                    placeholder="Cari Pasien..."
                    className=" w-96 rounded-xl px-5"
                />
                <button className=" justify-center items-center bg-primary1 rounded-xl w-40 ml-14 hover:bg-shade6">
                    <p className="text-center text-white text-base font-semibold font-poppins leading-normal">Cari</p>
                </button>
            </div>

            <Table data={data} />

            <Popup isvisible={showPopup} onClose={() => setShowPopup(false)}>
                <div className="flex">
                    <Link href="/tambah-antrian" className=" ml-auto mr-2 mt-4 w-1/2 h-48 bg-primary1 rounded-3xl  font-poppins text-2xl hover:bg-shade6"> 
                        <div className="flex flex-col items-center h-full justify-center text-white">
                            <p>Pasien Sudah Terdaftar</p>
                            <p>(Pasien Lama)</p>
                        </div>
                    </Link>
                    <Link href="/#" className="mr-auto ml-2 mt-4 w-1/2 h-48 bg-tint6 rounded-3xl font-poppins text-2xl hover:bg-shade6 hover:text-white">
                        <div className=" flex flex-col items-center h-full justify-center ">
                            <p>Pasien Belum Terdaftar</p>
                            <p>(Pasien Baru)</p>
                        </div>
                    </Link>
                </div>
            </Popup>

        </div>

    );
}