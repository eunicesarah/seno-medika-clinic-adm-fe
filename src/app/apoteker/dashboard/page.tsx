"use client";
import { useEffect, useState } from "react";
import SMLogo from "../../../../public/Logo_Seno_Medika.svg";
import Dropdown from "@/app/components/dropdown";
import CustomDatePicker from "../../../components/Datepicker";
import Image from "next/image";
import axios from "axios";

const head = [
  "No",
  "No Antrian",
  "Poli/ Ruangan",
  "Tanggal Resep",
  "No. eRM",
  "Nama Pasien",
  "Jenis Kelamin",
  "Tempat & Tanggal Lahir",
  // "Metode Pembayaran",
  "Resep",
];

interface TableData {
  nomor_antrian: number;
  poli: string;
  created_at: string;
  no_erm: string;
  nik: string;
  nama: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  metode_pembayaran: string;
  resep: string;
  status_obat: string;
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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/apotek?find_by=today"
      );
      const data1 = response.data;
      const data = data1.data;
      console.log(data);
      setTableData(data);
    } catch (error) {
      console.error("Error");
    }
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
  // const handleResepButtonClick = (
  //   no_erm: string,
  //   poli: string,
  //   created_at: string
  // ) => {
  //   // window.location.href = `/kasir/detail-pembayaran?pasien_id=${id}`;
  // };
  const handleDetailClick =  async (nik:string) => {
    // window.location.href = `/kasir/detail-pembayaran?pasien_id=${id}`;
    const response = await axios.get(`http://localhost:8080/pasien?find_by=nik&target=${nik}`);
      const id = response.data.data.pasien_id;
      console.log(response.data.data);
      console.log(id);
      window.location.href = `/apoteker/detail-resep?pasien_id=${id}`;

}

  const filterDate = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/apotek?find_by=date&target=${selectedDate}`
      );
      const data1 = response.data;
      const data = data1.data;
      console.log(data);
      setTableData(data);
    } catch (error) {
      console.error("Error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" bg-tint6 flex-col flex h-screen font-Poppins w-screen">
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
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-row items-center">
              <p className="text-black mr-2">Tampilkan</p>
              <div className="w-12">
                <Dropdown options={options} onSelect={handleOptionClick} />
              </div>
              <p className="text-black ml-2">Data</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex items-center">
                <p className="text-black">Tampilkan Data</p>
                <div className="w-40">
                  <Dropdown
                    options={statusOptions}
                    onSelect={handleOptionClick}
                  />
                </div>
              </div>
              <div className="w-20">
                <CustomDatePicker
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                />
              </div>
              <div className="flex flex-row gap-2 items-center">
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
        </div>
        <div className="p-4 h-full w-full" data-cy="table">
          <table
            className="w-full min-w-max table-auto text-center"
            data-testid="table"
          >
            <thead className=" bg-shade1 ">
              <tr>
                {head.map((head) => (
                  <th key={head} className="px-2 py-2">
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
                    ${data.status_obat === "belum_diberikan" ? "bg-white" : ""} 
                    ${
                      data.status_obat === "obat_tidakdiambil"
                        ? "bg-[#D66A63]"
                        : ""
                    }
                    ${data.status_obat === "obat_disiapkan" ? "bg-shade4" : ""}
                    ${
                      data.status_obat === "sudah_diberikan" ? "bg-tint5" : ""
                    }`}
                  >
                    <td className="py-2 w-12">{index + 1}</td>
                    <td className="py-2 w-12">{data.nomor_antrian}</td>
                    <td className="py-2 w-20">{data.poli}</td>
                    <td className="py-2 w-30">{data.created_at}</td>
                    <td className="py-2 w-32">{data.no_erm}</td>
                    <td className="py-2 w-60">{data.nama}</td>
                    <td className="py-2 w-20">{data.jenis_kelamin}</td>
                    <td className="py-2 w-40">
                      {data.tempat_lahir +
                        ", " +
                        data.tanggal_lahir.slice(0, 10)}
                    </td>
                    {/* <td className="py-2 w-20">{data.metode_pembayaran}</td> */}
                    <td className="py-2 w-30">
                      <a
                        className="p-2 justify-center font-medium hover:text-blue-500 hover:underline"
                        onClick={() => handleDetailClick(data.nik)}
                      >
                        Detail
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
