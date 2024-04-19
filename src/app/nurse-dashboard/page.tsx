"use client";
import Image from "next/image";
import SMLogo from "../../../public/Logo_Seno_Medika.svg";
import React, {useEffect, useState} from "react";
import CustomDatePicker from "../../components/Datepicker";
import Dropdown from "@/components/Dropdown";
import axios from "axios";

const head = [
  "No",
  "Nomor Antrian",
  "Poli/ Ruangan",
  "Tanggal Masuk",
  "No. eRM",
  "NIK",
  "Nama Pasien",
  "Jenis Kelamin",
  "Tempat & Tanggal Lahir",
  "Asuransi",
  "TTV",
];

interface Antrian {
  nomor_antrian: number;
  poli: string;
  created_at: string;
}

interface PendaftaranPasien {
  nik: string;
  nama_pasien: string;
  jenis_kelamin: string;
  tempat_tanggal_lahir: string;
  asuransi: string;
  TTV: string;
}

interface TableData extends Antrian, PendaftaranPasien {
    no_eRM: string;
}

interface IError{
  nama: string;
  email: string;
  NIK: string;
  no_KK: string;
  no_erm: string;
  goldar: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  provinsi: string;
  kabupaten_kota: string;
  kecamatan: string;
  kelurahan: string;
  alamat: string;
  no_telpon: string;
  warga_negara: string;
  status_perkawinan: string;
  pendidikan: string;
  agama: string;
  pekerjaan: string;
  nama_kontak_darurat: string;
  nomor_kontak_darurat: string;
}
function parseAndFormatDate(tanggal_lahir: string, tempat_lahir: string): string {
  // Parse the date string
  const parsedDate: Date = new Date(tanggal_lahir);

  // Format the date
  const formattedDate: string = `${parsedDate.getDate()}-${parsedDate.getMonth() + 1}-${parsedDate.getFullYear()}`;

  // Create the desired output
  const output: string = `${tempat_lahir}, ${formattedDate}`;

  return output;
}
export default function NurseDashboard() {
    const initialData: TableData[] = [];
    
      const [tableData, setTableData] = useState<TableData[]>(initialData);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPasien, setSelectedPasien] = useState(null)

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAntrian = await axios.get("http://localhost:8080/antrian?find_by=dashboard");
        const antrian = responseAntrian.data.data;
        const formattedAntrian = antrian.map((data: any) => {
          return {
            nomor_antrian: data.nomor_antrian,
            poli: data.poli,
            created_at: data.created_at,
            no_eRM: data.no_erm,
            nik: data.nik,
            nama_pasien: data.nama,
            jenis_kelamin: data.jenis_kelamin,
            tempat_tanggal_lahir: parseAndFormatDate(data.tanggal_lahir, data.tempat_lahir),
            asuransi: data.penjamin
          };
        });
        setTableData(formattedAntrian);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [tableData])

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
              Super Admin
            </p>
          </button>
        </div>
      </div>
      <div>
        <label className=" font-poppins ml-20 mt-8 font-bold h-11 w-auto text-3xl text-shade6">
          DATA PEMERIKSAAN MEDIS
        </label>
        <div className="flex items-center justify-between ml-20 mt-4 flex-row">
          <div className="flex w-70 h-auto">
            <p className="text-black mr-2 w-auto">Tampilkan</p>
            <div className="w-50">
              <Dropdown
                options={options}
                onSelect={handleOptionClick}
                required
              />
            </div>
            <p className="text-black ml-2 w-auto">Data</p>
          </div>
          <div className="flex flex-row gap-2 mr-16">
          <div className="flex w-auto h-auto">
            <p className="text-black w-auto">Tampilkan Data</p>
            <Dropdown
              options={shiftOptions}
              onSelect={handleOptionClick}
              className="w-1/2"
              required
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
            <button className="bg-[#609E87] w-20 h-12 rounded-2xl text-white font-bold">Cari</button>
          </div>
          </div>
        </div>
        <div className="p-16 h-full w-full" data-cy="table">
          <table className="w-full min-w-max table-auto text-center " data-testid="table">
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
                {tableData && tableData.map((data, index) => (
                    <tr key={data.nomor_antrian} className=" odd:bg-tint4 even:bg-tint5 text-shade7 text-center hover:bg-shade4 hover:text-tint7">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{data.nomor_antrian}</td>
                        <td className="p-2">{data.poli}</td>
                        <td className="p-2">{data.created_at}</td>
                        <td className="p-2">{data.no_eRM}</td>
                        <td className="p-2">{data.nik}</td>
                        <td className="p-2">{data.nama_pasien}</td>
                        <td className="p-2">{data.jenis_kelamin}</td>
                        <td className="p-2">{data.tempat_tanggal_lahir}</td>
                        <td className="p-2">{data.asuransi}</td>
                        <a className="p-2 justify-center font-medium hover:text-blue-500 hover:underline" href="/ners-ttv?pasien_id=">Buka TTV</a>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
