"use client";
import Image from "next/image";
import SMLogo from "../../../public/Logo_Seno_Medika.svg";
import Dropdown from "../components/dropdown";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserButton from "../components/user_button";

interface pasienData {
    pasien_id: number;
    no_erm: string;
    nik: string;
    nama: string;
    jenis_kelamin: string;
    penjamin: string;
    tempat_lahir: string;
    tanggal_lahir: string;
}

export default function DokterDashboard() {
    const antrianAPI = "http://localhost:8080/antrian?find_by=pemeriksaan_dokter";
    const additionalDataAPI = "http://localhost:8080/pasien?find_by=id&target=";
    const [data, setData] = useState([]);
    const [pasien, setPasien] = useState([] as pasienData[]);
    const [size, setSize] = useState(0);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async () => {
        let arr: Array<any> = [];

        try {
            const response = await axios.get(antrianAPI);
            const data1 = response.data;
            const data = data1.data;
            const size = data.size;
            const antrian = data.antrian;   

            setData(antrian);
            setSize(size);
            totalPage(size);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const fetchDataDetails = async () => {
            if (data === null) {
                return;
              }
              else {
                const promises = data.map(async (item: any) => {
                  const response = await axios.get(
                    `${additionalDataAPI}${item.pasien_id}`
                  );
                  const hasil = response.data.data;
                  console.log(response);
                  const convert: pasienData = {} as pasienData;
                  convert.pasien_id = hasil.pasien_id;
                  convert.no_erm = hasil.no_erm;
                  convert.nik = hasil.nik;
                  convert.nama = hasil.nama;
                  convert.jenis_kelamin = hasil.jenis_kelamin;
                  convert.penjamin = hasil.penjamin;
                  convert.tempat_lahir = hasil.tempat_lahir;
                  convert.tanggal_lahir = hasil.tanggal_lahir;
                  return convert;
                });
                const result = await Promise.all(promises);
                setPasien(result);
              }
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

    const [selectedOption, setSelectedOption] = useState("10");
    const [mulaiTanggal, setMulaiTanggal] = useState<string>('');
    const [search, setSearch] = useState('');

    const handleOptionClick = (option: any) => {
        setSelectedOption(option.value);
    };

    const totalPage = (size: any) => {
        const totalPage = Math.ceil(size / parseInt(selectedOption));
        setPage(totalPage);
    }

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${antrianAPI}&limit=${selectedOption}&date=${mulaiTanggal}&search=${search}`);
            const searchData = response.data.data;
            const size = searchData.size;
            const antrian = searchData.antrian;

            setData(antrian);
            setSize(size);
            totalPage(size);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageChange = async (page: number) => {
        setCurrentPage(page);
        try {
            const response = await axios.get(`${antrianAPI}&limit=${selectedOption}&date=${mulaiTanggal}&search=${search}&page=${page}`);
            const searchData = response.data.data;
            const size = searchData.size;
            const antrian = searchData.antrian;

            setData(antrian);
            setSize(size);
            totalPage(size);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const options = [
        { label: "10", value: "10" },
        { label: "20", value: "20" },
        { label: "30", value: "30" },
      ];

    const shiftOptions = [
        { label: 'Poli Umum Shift Pagi', value: 'Poli Umum Shift Pagi' },
        { label: 'Poli Umum Shift Sore', value: 'Poli Umum Shift Sore' },
      ];

    const handlePeriksaClick =  async (id: string) => {
        window.location.href = `/dokter-pemeriksaan?antrianID=${id}`;
    }

    const handleTTVButtonClick = async (nik: string, poli: string, created_at : string) => {
        try {
          const response = await axios.get(`http://localhost:8080/pasien?find_by=nik&target=${nik}`);
          const pasienId = response.data.data.pasien_id;
          console.log(response.data.data);
          console.log(pasienId);
          window.location.href = `/perawat/ttv?pasien_id=${pasienId}&poli=${poli}&created_at=${created_at}`;
        } catch (error) {
          console.error("Error fetching pasien data:", error);
        }
      };

    return (
        <div className=" bg-tint6 flex flex-col min-h-screen font-Poppins">
            <div className="flex mr-20 mt-14 bg-tint6">
                <div>
                    <Image 
                        src={SMLogo} 
                        alt="Logo Seno Medika" 
                        className="w-32 h-32 ml-28"
                    />    
                </div>
                <UserButton />
            </div>

            <div className=" mt-11 ml-28 h-11 text-black text-5xl font-bold font-Poppins uppercase leading-10">
                DATA PEMERIKSAAN PASIEN
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
                        onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="bg-[#609E87] w-20 h-12 rounded-2xl text-white font-bold" onClick={handleSearch}>Cari</button>
                    </div>
                </div>
            </div>

            <div className="ml-12 mt-4 mr-12">
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
                            <th className="w-50">Tempat & Tanggal Lahir</th>
                            <th className="w-24">Asuransi</th>
                            <th className="w-20"></th>
                            <th className="w-16"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item: any, index: number) => (
                            <tr key={index} className=" odd:bg-tint4 even:bg-tint5 text-shade7 hover:bg-shade4 hover:text-tint7">
                                <td>{(currentPage-1)*parseInt(selectedOption)+index+1}</td>
                                <td>{item.nomor_antrian}</td>
                                <td>{item.poli}</td>
                                <td>{formatUpdatedAtToDDMMYYYY(item.created_at)}</td>
                                <td>{pasien[index]?.no_erm}</td>
                                <td>{pasien[index]?.nama}</td>
                                {pasien[index]?.jenis_kelamin === 'laki-laki' ? <td>L</td> : <td>P</td>}
                                <td><div>
                                    <p>{pasien[index]?.tempat_lahir}, </p>
                                    <p>{formatUpdatedAtToDDMMYYYY(pasien[index]?.tanggal_lahir)}</p>    
                                </div></td>
                                <td>{pasien[index]?.penjamin}</td>
                                <td>
                                    <button className=" text-blue-700 hover:underline hover:text-white" onClick={() => handleTTVButtonClick(pasien[index]?.nik, item.poli, item.created_at)}>Buka TTV</button>
                                </td>
                                <td>
                                    <button className="text-blue-700 hover:underline hover:text-white" onClick={() => handlePeriksaClick(item.antrian_id)}>Periksa</button>
                                </td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan={11} className="text-center text-black hover:bg-shade4 hover:text-tint7">
                                    Tidak ada data.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    <ul className="flex flex-row">
                        {currentPage > 1 && (
                            <li>
                                <button 
                                    onClick={() => handlePageChange(currentPage - 1)} 
                                    className="mr-3 text-black bg-white px-4 py-2 rounded-3xl"
                                >
                                    {"<"}
                                </button>
                            </li>
                        )}
                        {Array.from({ length: page }, (_, index) => (
                            <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                                <button onClick={() => handlePageChange(index + 1)} className={` mr-3 text-black bg-white px-4 py-2 rounded-3xl ${currentPage === index + 1 ? 'font-bold' : 'font-normal'}`}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        {currentPage < page && (
                            <li>
                                <button 
                                    onClick={() => handlePageChange(currentPage + 1)} 
                                    className="mr-3 text-black bg-white px-4 py-2 rounded-3xl"
                                >
                                    {">"}
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}