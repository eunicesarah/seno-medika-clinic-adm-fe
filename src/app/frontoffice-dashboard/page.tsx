"use client";

import Image from "next/image";
import SMLogo from '../../../public/Logo_Seno_Medika.svg';
import QueueLogo from '../../../public/queue.svg';
import CheckLogo from '../../../public/check.svg';
import PlusLogo from '../../../public/plus_pasien.svg';
import TurnLogo from '../../../public/giliran.svg';
import RefreshLogo from '../../../public/refresh.svg';
import React,  { useState, useEffect } from 'react';
import Table from '../components/tabel_pasien'; 
import Popup from '../components/popup';
import Link from "next/link";
import axios from "axios";

interface pasienData
    {
        pasien_id: number;
        nama: string;
        penjamin: string;
    }

export default function Dashboard() {
    const antrianAPI = "http://localhost:8080/antrian";

    const [data, setData] = useState([]);
    const [pasien, setPasien] = useState([] as pasienData[]);
    const handleReload = () => {
            window.location.reload();
        };
    
    const additionalDataAPI = "http://localhost:8080/pasien?find_by=id&target=";
    const fetchData = async () => {
        let arr: Array<any> = [];
        
        try {
            const response = await axios.get(antrianAPI);
            const data1 = response.data;
            const data = data1.data;
            // console.log(data);
            setData(data);
            
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      useEffect(() => {
        const fetchDataDetails = async () => {
            const promises = data.map(async (item: any) => {
                const response = await axios.get(`${additionalDataAPI}${item.pasien_id}`);
                const hasil = response.data.data;
                console.log(response)
                const convert: pasienData = {} as pasienData;
                convert.pasien_id = hasil.pasien_id;
                convert.nama = hasil.nama;
                convert.penjamin = hasil.penjamin;
                return convert;
            });
    
            const result = await Promise.all(promises);
            setPasien(result);
        };
    
        fetchDataDetails();
    }, [data]);
    
    
    useEffect(() => {
        fetchData();
    }, []);

    const [showPopup, setShowPopup] = useState(false);

    const calculateDataLength = () => {
        return data && data.length > 0 ? data.length : 0;
    };

    return (
        <div className=" bg-tint6 flex-col flex h-auto">
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
                        <p className="text-neutral-900 text-2xl font-semibold font-['Poppins'] leading-9">Isti</p>
                        <p className="text-gray-700 text-xl font-normal font-['Poppins']">Super Admin</p>
                    </button>
                </div>
            </div>
            <div className="flex mt-9 ml-28 content-center justify-between mr-14">
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
                            <p className=" w-20 h-16 text-white text-5xl font-bold font-['Poppins'] uppercase leading-10">{calculateDataLength()}</p> {/* teks bawah */}
                        </div> 
                    </div>

                    <div className="flex bg-[#609E87] mr-4 rounded-xl h-xl ml-auto">
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
                            <p className="w-20 h-16 text-white text-5xl font-bold font-['Poppins'] uppercase leading-10">0</p> {/* teks bawah */}
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
                            <p className="w-20 h-16 text-white text-5xl font-bold font-['Poppins'] uppercase leading-10">00</p> {/* teks bawah */}
                        </div> 
                    </div>
                </div>

                <button className=" rounded-xl h-36 mr-auto bg-primary1 hover:bg-shade6 shadow-xl" onClick={() => setShowPopup(true)}>
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
                <button className="rounded-[10px] ml-auto h-14 mr-8" onClick={handleReload}>
                    <div className="flex items-center justify-center">
                        <Image
                            src={RefreshLogo}
                            alt="Logo Refresh"
                            width={40}
                            height={40}
                        />    
                    </div>
                </button>
                
            </div>
            {/*{pasien && pasien.length > 0 &&*/}
            <Table data={data} pasien={pasien} />
            {/*}*/}

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