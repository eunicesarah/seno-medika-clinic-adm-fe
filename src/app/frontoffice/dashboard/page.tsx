"use client";

import Image from "next/image";
import SMLogo from "../../../../public/Logo_Seno_Medika.svg";
import QueueLogo from "../../../../public/queue.svg";
import CheckLogo from "../../../../public/check.svg";
import PlusLogo from "../../../../public/plus_pasien.svg";
import TurnLogo from "../../../../public/giliran.svg";
import RefreshLogo from "../../../../public/refresh.svg";
import React, { useState, useEffect } from "react";
import Table from "../../components/tabel_pasien";
import Popup from "../../components/popup";
import Link from "next/link";
import axios from "axios";
import Dropdown from "../../components/dropdown";
import { on } from "events";

interface pasienData {
  pasien_id: number;
  nama: string;
  penjamin: string;
}

export default function Dashboard() {
  const antrianAPI = "http://localhost:8080/antrian?find_by=dashboard";

  const [data, setData] = useState([]);
  const [totalFinished, setTotalFinished] = useState(0);
  const [pasien, setPasien] = useState([] as pasienData[]);
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

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
      const size = data.size;
      const antrian = data.antrian;   
      
      setData(antrian);
      setSize(size);
      totalPage(size);

    } catch (error) {
      console.error("Error fetching data:", error);
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
          convert.nama = hasil.nama;
          convert.penjamin = hasil.penjamin;
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

  const [showPopup, setShowPopup] = useState(false);

  const calculateDataLength = () => {
    return data && data.length > 0 ? data.length : 0;
  };

  const fetchFinishedDataLength = async () => {
    const notaLength = await axios.get("http://localhost:8080/kasir");
    if (notaLength.data.data === null) {
      const countNota = 0;
      setTotalFinished(countNota);
    }
    else{
      const countNota = notaLength.data.data.length;
      setTotalFinished(countNota);
    }

  };

  const calculateFinishedDataLength = () => {
    fetchFinishedDataLength();
    if (data && data.length > 0) {
      return totalFinished;
    } else {
      return 0;
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

  const [selectedOption, setSelectedOption] = useState("10");
  const [selectedPoli, setSelectedPoli] = useState("");
  const [mulaiTanggal, setMulaiTanggal] = useState<string>('');
  const [search, setSearch] = useState('');

  const handleOptionClick = (option: any) => {
    setSelectedOption(option.value);
  };

  const handlePoliClick = (poli: any) => {
      setSelectedPoli(poli.value);
  };

  const totalPage = (size: any) => {
    const total = Math.ceil(size/parseInt(selectedOption));
    setPage(total);
  };

  const handleSearch = async () => {
    try {
        const response = await axios.get(`${antrianAPI}&limit=${selectedOption}&poli=${selectedPoli}&date=${mulaiTanggal}&search=${search}`);
        const searchData = response.data.data;
        const size = searchData.size;
        const antrian = searchData.antrian;
        
        setData(antrian);
        setSize(size);
        totalPage(size);
    } catch (error) {
        console.error('Error searching data:', error);
    }
  };
  
  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    try {
        const response = await axios.get(`${antrianAPI}&limit=${selectedOption}&poli=${selectedPoli}&date=${mulaiTanggal}&search=${search}&page=${page}`);
        const searchData = response.data.data;
        const size = searchData.size;
        const antrian = searchData.antrian;
        
        setData(antrian);
        setSize(size);
        totalPage(size);
    } catch (error) {
        console.error('Error searching data:', error);
    }
};

  return (
    <div className=" bg-tint6 flex-col flex h-full w-screen">
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
            <p className="text-neutral-900 text-2xl font-semibold font-Poppins leading-9">
              Isti
            </p>
            <p className="text-gray-700 text-xl font-normal font-Poppins">
              Super Admin
            </p>
          </button>
        </div>
      </div>
      <div className="flex mt-9 content-center justify-between">
        <div className="flex items-center ml-auto">
          <div className="flex bg-[#609E87] mr-4 rounded-xl h-xl ml-auto">
            <div className=" ml-5 mr-4 mt-10 mb-3 w-8">
              <Image
                src={QueueLogo}
                alt="Logo Antrian"
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className=" w-60 text-white text-2xl font-bold font-Poppins uppercase leading-7 mt-4">
                Total Antrian
              </p>{" "}
              {/* teks atas */}
              <p className=" w-20 h-16 text-white text-5xl font-bold font-Poppins uppercase leading-10">
                {calculateDataLength()}
              </p>{" "}
              {/* teks bawah */}
            </div>
          </div>

          <div className="flex bg-[#609E87] mr-4 rounded-xl h-xl ml-auto">
            <div className=" ml-5 mr-4 mt-10 mb-3 w-8">
              <Image
                src={CheckLogo}
                alt="Logo Selesai Dilayani"
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className=" w-60 text-white text-2xl font-bold font-Poppins uppercase leading-7 mt-4">
                Selesai Dilayani
              </p>{" "}
              {/* teks atas */}
              <p className="w-20 h-16 text-white text-5xl font-bold font-Poppins uppercase leading-10">
                {calculateFinishedDataLength()}
              </p>{" "}
              {/* teks bawah */}
            </div>
          </div>

          <div className="flex bg-[#609E87] mr-4 rounded-xl h-xl ml-auto">
            <div className=" ml-5 mr-4 mt-10 mb-3 w-8">
              <Image
                src={TurnLogo}
                alt="Logo Selesai Dilayani"
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className=" w-60 text-white text-2xl font-bold font-Poppins uppercase leading-7 mt-4">
                Nomor Giliran
              </p>{" "}
              {/* teks atas */}
              <p className="w-20 h-16 text-white text-5xl font-bold font-Poppins uppercase leading-10">
                00
              </p>{" "}
              {/* teks bawah */}
            </div>
          </div>
        </div>

        <button
          className=" rounded-xl h-36 mr-auto bg-primary1 hover:bg-shade6 shadow-xl"
          onClick={() => setShowPopup(true)}
          
        >
          <div>
            <p className=" w-72 h-8 text-white text-[32px] font-bold font-Poppins uppercase leading-[38.40px] text-center mt-5 ">
              Tambah Pasien
            </p>{" "}
            {/* teks atas */}
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

      <div className="flex mt-14 mr-12">
        <p className=" font-Poppins ml-28 font-bold h-11 w-[482px] text-5xl text-shade6">
          DAFTAR ANTREAN
        </p>
        <button
          className="rounded-[10px] ml-auto h-14 mr-8"
          onClick={handleReload}
        >
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
      <div className=" flex flex-row justify-between ml-28 mt-8 mb-4">
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
                    onSelect={handlePoliClick}
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

      <Table data={data} pasien={pasien} />

      <div className="flex justify-center mb-4">
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

      <Popup isvisible={showPopup} onClose={() => setShowPopup(false)}>
        <div className="flex">
          <Link
            href="/frontoffice/tambah-antrian"
            className=" ml-auto mr-2 mt-4 w-1/2 h-48 bg-primary1 rounded-3xl  font-Poppins text-2xl hover:bg-shade6 p-2"
          >
            <div className="flex flex-col items-center h-full justify-center text-white">
              <p>Pasien Sudah Terdaftar</p>
              <p>(Pasien Lama)</p>
            </div>
          </Link>
          <Link
            href="/frontoffice/register"
            className="mr-auto ml-2 mt-4 w-1/2 h-48 bg-shade4 rounded-3xl font-Poppins text-2xl hover:bg-shade6 hover:text-white p-2"
          >
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
