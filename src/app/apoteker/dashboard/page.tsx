"use client";
import { useState } from "react";
import SMLogo from "../../../../public/Logo_Seno_Medika.svg";
import Dropdown from "@/components/Dropdown";
import CustomDatePicker from "../../../components/Datepicker";
import Image from "next/image";

const head = [
  "No",
  "Nomor Antrian",
  "Poli/ Ruangan",
  "Tanggal Resep",
  "No. eRM",
  "NIK",
  "Nama Pasien",
  "Jenis Kelamin",
  "Tempat & Tanggal Lahir",
  "Metode Pembayaran",
  "Resep",
];

interface TableData {
  nomor_antrian: number;
  poli: string;
  created_at: string;
  no_eRM: string;
  nik: string;
  nama_pasien: string;
  jenis_kelamin: string;
  tempat_tanggal_lahir: string;
  metode_pembayaran: string;
  resep: string;
  status: string;
}

export default function ApotekerDashboard() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const initialData: TableData[] = [];
  const [tableData, setTableData] = useState<TableData[]>(initialData);

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
  const statusOptions = [
    { label: "Semua", value: "semua" },
    { label: "Obat Belum Diberikan", value: "belum_diberikan" },
    { label: "Obat Sedang Disiapkan", value: "obat_disiapkan" },
    { label: "Obat Sudah Diberikan", value: "sudah_diberikan" },
    { label: "Obat Tidak Diambil", value: "obat_tidakdiambil" },
  ];
  const handleResepButtonClick = (
    no_erm: string,
    poli: string,
    created_at: string
  ) => {
    console.log(no_erm, poli, created_at);
  };

  return (
    <div className=" bg-tint6 flex-col flex h-screen font-Poppins">
      <div className="flex mr-20 mt-14 bg-tint6 items-center">
        <div>
          <Image
            src={SMLogo}
            alt="Logo Seno Medika"
            className="w-32 h-32 ml-20"
          />
        </div>
        <div className="ml-auto">
          <button className="px-12 py-4 bg-gray-100 rounded-[51px] shadow flex-col justify-start inline-flex hover:bg-slate-200">
            <p className="text-neutral-900 textq-2xl font-semibold font-['Poppins'] leading-9">
              Isti
            </p>
            <p className="text-gray-700 text-xl font-normal font-['Poppins']">
              Apoteker
            </p>
          </button>
        </div>
      </div>
      <div>
        <label
          htmlFor="judul_apoteker"
          className=" font-Poppins ml-20 mt-8 font-bold h-11 w-auto text-3xl text-shade6"
        >
          DATA RESEP
        </label>
        <div className="flex items-center justify-between ml-20 mt-4 flex-row">
          <div className="flex w-70 h-auto">
            <p className="text-black mr-2 w-auto">Tampilkan</p>
            <div className="w-50">
              <Dropdown
                options={options}
                onSelect={handleOptionClick}
              />
            </div>
            <p className="text-black ml-2 w-auto">Data</p>
          </div>
          <div className="flex flex-row gap-2 mr-16">
            <div className="flex w-auto h-auto">
              <p className="text-black w-auto">Tampilkan Data</p>
              <Dropdown
                options={statusOptions}
                onSelect={handleOptionClick}
                className="w-1/2"
              />
            </div>
            <div className="w-auto">
              <CustomDatePicker
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                className="w-full"
              />
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="text"
                name="search"
                id="search"
                className="w-full h-12 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Pencarian"
              />
              <button className="bg-[#609E87] w-20 h-12 rounded-2xl text-white font-bold hover:bg-shade7">
                Cari
              </button>
            </div>
          </div>
        </div>
        <div className="p-16 h-full w-full" data-cy="table">
          <table
            className="w-full min-w-max table-auto text-center "
            data-testid="table"
          >
            <thead className=" bg-shade1 ">
              <tr>
                {head.map((head) => (
                  <th key={head} className="px-4 py-2">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData &&
                tableData.map((data, index) => (
                  <tr
                    key={data.nomor_antrian}
                    className={`text-shade7 text-center hover:bg-shade4 hover:text-tint7 
                    ${data.status === "belum_diberikan" ? "bg-white" : ""} 
                    ${data.status === "obat_tidakdiambil" ? "bg-[#D66A63]" : ""}
                    ${data.status === "obat_disiapkan" ? "bg-shade4" : ""}
                    ${data.status === "sudah_diberikan" ? "bg-tint5" : ""}`}
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{data.nomor_antrian}</td>
                    <td className="p-2">{data.poli}</td>
                    <td className="p-2">{data.created_at}</td>
                    <td className="p-2">{data.no_eRM}</td>
                    <td className="p-2">{data.nik}</td>
                    <td className="p-2">{data.nama_pasien}</td>
                    <td className="p-2">{data.jenis_kelamin}</td>
                    <td className="p-2">{data.tempat_tanggal_lahir}</td>
                    <td className="p-2">{data.metode_pembayaran}</td>
                    <td className="p-2">{data.resep}</td>
                    <a
                      className="p-2 justify-center font-medium hover:text-blue-500 hover:underline"
                      onClick={() => handleResepButtonClick(data.no_eRM, data.poli, data.created_at)}>
                      Detail
                    </a>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
