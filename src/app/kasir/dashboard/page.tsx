"use client"
import Image from "next/image"
import SMLogo from "../../../../public/Logo_Seno_Medika.svg"
import Dropdown from "../../components/dropdown";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface pasienData {
    pasien_id: number;
    no_erm: string;
    nama: string;
    jenis_kelamin: string;
    penjamin: string;

}

export default function KasirDashboard(){
    const antrianAPI = "http://localhost:8080/antrian";
    const additionalDataAPI = "http://localhost:8080/pasien?find_by=id&target=";
    const [data, setData] = useState([]);
    const [pasien, setPasien] = useState([] as pasienData[]);

    const fetchData = async () => {
        let arr: Array<any> = [];

        try {
            const response = await axios.get(antrianAPI);
            const data1 = response.data;
            const data = data1.data;
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
                convert.no_erm = hasil.no_erm;
                convert.nama = hasil.nama;
                convert.jenis_kelamin = hasil.jenis_kelamin;
                convert.penjamin = hasil.penjamin;
                return convert;
            });

            const results = await Promise.all(promises);
            // console.log(results);
            setPasien(results);
        };

        fetchDataDetails();
    }, [data]);

    useEffect(() => {
        fetchData();
    }, []);

    console.log(data);
    console.log(pasien);

    function formatUpdatedAtToDDMMYYYY(timestamp:string) {
        const updatedAtDate = new Date(timestamp);
        const day = updatedAtDate.getDate().toString().padStart(2, '0');
        const month = (updatedAtDate.getMonth() + 1).toString().padStart(2, '0');
        const year = updatedAtDate.getFullYear();
      
        return `${day}/${month}/${year}`;
      }

    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [mulaiTanggal, setMulaiTanggal] = useState<string>('');

    const handleOptionClick = (option: any) => {
        setSelectedOption(option.value);
      };

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    };

    const options = [
        { label: "10", value: "10" },
        { label: "20", value: "20" },
        { label: "30", value: "30" },
      ];

    const shiftOptions = [
        { label: "Shift Pagi Rumah Sakit", value: "Shift Pagi Rumah Sakit" },
        { label: "Shift Pagi Rumah Sakit", value: "Shift Pagi Rumah Sakit" },
        { label: "Shift Pagi Rumah Sakit", value: "Shift Pagi Rumah Sakit" },
        { label: "Shift Pagi Rumah Sakit", value: "Shift Pagi Rumah Sakit" },
      ];

    const handleDetailClick =  async (id: string) => {
        window.location.href = `/kasir/detail-pembayaran?pasien_id=${id}`;
    }

    return (
        <div className=" bg-tint6 flex flex-col h-screen font-Poppins">
            <div className="flex mr-20 mt-14 bg-tint6">
                <div>
                    <Image 
                        src={SMLogo} 
                        alt="Logo Seno Medika" 
                        className="w-32 h-32 ml-28"
                    />    
                </div>
                <div className="ml-auto">
                    <button className="px-12 py-4 bg-gray-100 rounded-[51px] shadow flex-col justify-start inline-flex hover:bg-slate-200 w-56">
                        <p className="text-neutral-900 text-2xl font-semibold font-['Poppins'] leading-9">Zara</p>
                        <p className="text-gray-700 text-xl font-normal font-['Poppins']">Kasir</p>
                    </button>
                </div>
            </div>

            <div className=" mt-11 ml-28 w-96 h-11 text-black text-5xl font-bold font-Poppins uppercase leading-10">
                KASIR
            </div>

            <div className=" flex flex-row justify-between ml-28 mt-8">
                <div className="flex">
                    <p className="text-black mr-2 py-3 w-auto">Tampilkan</p>
                    <div className=" w-12">
                        <Dropdown
                            options={options}
                            onSelect={handleOptionClick}
                            required
                        />
                    </div>
                    <p className="text-black ml-2 py-3 w-auto">Data</p>
                </div> 

                <div className=" flex flex-row justify-between mr-16">
                    <p className=" text-black w-auto mr-2 py-3">Tampilkan Data</p>
                    <div className=" w-52 mr-2">
                        <Dropdown
                            options={shiftOptions}
                            onSelect={handleOptionClick}
                            required
                        />
                    </div>
                    <div className="w-25 mr-2">
                    <input
                        type = "date"
                        name = "date"
                        id = "date"
                        onChange={(e) => setMulaiTanggal(e.target.value)}
                        className='w-30 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl'
                    />
                    </div>

                    <div className="flex flex-row gap-2">
                        <input
                        type="text"
                        name="search"
                        id="search"
                        className="w-full h-12 px-7 py-3.5 rounded-2xl border text-shade7 placeholder:text-gray-500"
                        placeholder="Pencarian"
                        />
                        <button className="bg-[#609E87] w-20 h-12 rounded-2xl text-white font-bold">Cari</button>
                    </div>
                </div>
            </div>

            <div className=" ml-12 mt-4 mr-12">
                <table className=" table-auto text-center w-full">
                    <thead className=" bg-shade1 text-shade8 font-Poppins">
                        <tr>
                            <th className="w-10">No</th>
                            <th className="w-20">Nomor Antrean</th>
                            <th className="w-32">Poli/Ruangan</th>
                            <th className="w-28">Tanggal Masuk</th>
                            <th className="w-48">No. eRM</th>
                            <th className="w-52">Nama Pasien</th>
                            <th className="w-20">Jenis Kelamin</th>
                            <th className="w-20">Asuransi</th>
                            <th className="w-16"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item: any, index: number) => (
                                <tr className=" odd:bg-tint4 even:bg-tint5 text-shade7 hover:bg-shade4 hover:text-tint7">
                                    <td>{index+1}</td>
                                    <td>{item.nomor_antrian}</td>
                                    <td>{item.poli}</td>
                                    <td>{formatUpdatedAtToDDMMYYYY(item.created_at)}</td>
                                    <td>{pasien[index]?.no_erm}</td>
                                    <td>{pasien[index]?.nama}</td>
                                    <td>{pasien[index]?.jenis_kelamin}</td>
                                    <td>{pasien[index]?.penjamin}</td>
                                    <td><button onClick={() => handleDetailClick(item.pasien_id)} className=" text-blue-700">Detail</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="text-center h-16 font-Poppins text-shade8 font-medium hover:bg-shade4">
                                    Tidak ada data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}