"use client";
import React, { useState } from "react";
import Image from "next/image";
import SMLogo from '../../../public/Logo_Seno_Medika.svg';
import ExpandableContent from "../components/expandableContent";
import SegitigaAtas from "../../../public/segitiga_atas.svg";
import SegitigaBawah from "../../../public/segitiga_bawah.svg";
import Diagnosa from './diagnosa'; 
import Resep from './resep'
import Keur from './keur'

interface Tab {
    title: string;
    content: React.ReactNode;
  }

export default function PemeriksaanDokter() {
    const [showPopup1, setShowPopup1] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const tabs: Tab[] = [
        {
            title: 'Diagnosa',
            content: <Diagnosa />
        },
        {
            title: 'Resep',
            content: <Resep />
        },
        {
            title: 'Keur',
            content: <Keur tanggal="23/04/2024" dokter="dr. Upin" />
        }
    ];

    return (
        <div className=" bg-tint6 h-full flex flex-col">
            <div className="flex mr-20 mt-14 bg-tint6">
                <div>
                    <Image 
                        src={SMLogo} 
                        alt="Logo Seno Medika" 
                        className="w-32 h-32 ml-28"
                    />    
                </div>
                <div className="ml-auto">
                    <button className="px-12 py-4 bg-gray-100 rounded-[51px] shadow flex-col justify-start inline-flex hover:bg-slate-200">
                        <p className="text-neutral-900 text-2xl font-semibold font-['Poppins'] leading-9">dr. Upin</p>
                        <p className="text-gray-700 text-xl font-normal font-['Poppins']">Dokter</p>
                    </button>
                </div>
            </div>

            <div className=" flex flex-row ml-10 mt-14">
                <div className=" bg-shade2 rounded-3xl px-10 py-10 mr-14 mb-5 h-fit">
                    <div className=" mb-7 text-3xl font-poppins font-semibold leading-10">
                    Data Pasien
                    </div>
                    <table>
                    <tbody>
                        <tr>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            Tanggal
                            </p>
                        </td>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            15/04/2024
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            Poli
                            </p>
                        </td>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            Umum
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            No eRM
                            </p>
                        </td>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            123456
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            NIK
                            </p>
                        </td>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            3174010101010001
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            Nama Pasien
                            </p>
                        </td>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            Agus
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            Usia
                            </p>
                        </td>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            22 Tahun 2 Bulan 9 Hari
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mr-9 mb-3">
                            Golongan Darah
                            </p>
                        </td>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            AB
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            Penjamin
                            </p>
                        </td>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            Tunai
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            Alamat
                            </p>
                        </td>
                        <td>
                            <p className="text-white font-poppins text-xl font-normal mb-3">
                            Jl. Mangga no. 12
                            </p>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <form className="mr-10 flex-grow" onSubmit={(e) => e.preventDefault()}>
                    <div className=" flex flex-row w-full h-16">
                        <div className=" bg-tint3 flex-grow flex flex-row">
                            <div className="w-72 text-black text-2xl font-semibold leading-10 ml-8 flex flex-row items-center">
                                Pemeriksaan Fisik
                            </div>
                            <button className=" flex flex-row items-center ml-auto mr-12" onClick={() => setShowPopup1(!showPopup1)} id="showPemeriksaanFisik">
                                <div className=" w-44 text-black text-l font-semibold leading-9 text-right mr-2" data-testid="tesFisik">
                                    {showPopup1 ? 'Sembunyikan' : 'Tampilkan'}
                                </div>
                                <Image
                                    src={showPopup1 ? SegitigaAtas : SegitigaBawah}
                                    alt={showPopup1 ? 'Segitiga Atas' : 'Segitiga Bawah'}
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                    </div>
                    <ExpandableContent isExpanded={showPopup1} onClose={() => setShowPopup1(false)}>
                        <div className=" bg-tint7">
                            <div className=" text-black">
                                Tes Fisik
                            </div>
                        </div>
                        
                        <div className=" bg-tint3">
                            <button className=" flex flex-row items-center ml-auto mr-12" onClick={() => setShowPopup1(!showPopup1)}>
                                <div className=" w-44 text-black text-l font-semibold leading-9 text-right mr-2">
                                    {showPopup1 ? 'Sembunyikan' : 'Tampilkan'}
                                </div>
                                <Image
                                    src={showPopup1 ? SegitigaAtas : SegitigaBawah}
                                    alt={showPopup1 ? 'Segitiga Atas' : 'Segitiga Bawah'}
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                    </ExpandableContent>

                    <div className=" flex flex-row w-full h-16 mt-8">
                        <div className=" bg-tint3 flex-grow flex flex-row">
                            <div className="w-72 text-black text-2xl font-semibold leading-10 ml-8 flex flex-row items-center">
                                Riwayat Pengobatan
                            </div>
                            <button className=" flex flex-row items-center ml-auto mr-12" onClick={() => setShowPopup2(!showPopup2)}>
                                <div className=" w-44 text-black text-l font-semibold leading-9 text-right mr-2" data-testid="riwayatPengobatan">
                                    {showPopup2 ? 'Sembunyikan' : 'Tampilkan'}
                                </div>
                                <Image
                                    src={showPopup2 ? SegitigaAtas : SegitigaBawah}
                                    alt={showPopup2 ? 'Segitiga Atas' : 'Segitiga Bawah'}
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                    </div>
                    <ExpandableContent isExpanded={showPopup2} onClose={() => setShowPopup2(false)}>
                        <div>
                            <div className=" text-black">
                                <div className=" mt-2">
                                    <div>
                                        {tabs.map((tab, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveTab(index)}
                                                className="text-whit px-10 py-3"
                                                style={{ 
                                                    fontWeight: 'bold',
                                                    backgroundColor: activeTab === index ? '#EDF4F2' : '#95BEAF',
                                                    color: activeTab === index ? '#000000' : '#46846E'  
                                                }}
                                                title={tab.title}
                                            
                                            >
                                                {tab.title}
                                            </button>
                                        ))}
                                    </div>
                                    <div className=" bg-tint7">
                                        {tabs[activeTab].content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ExpandableContent>
                </form>
            </div>
        </div>
    );
}