"use client";
import { useState } from "react";
import Image from "next/image";
import Arrow from "../../../public/right_arrow.svg";
import Dropdown from "../components/dropdown";

export default function Dashboard() {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { label: "dr. Seni", value: "dr. Seni" },
    { label: "dr. Budi", value: "dr. Budi" },
    { label: "dr. Toto", value: "dr. Toto" },
  ];

  const handleOptionClick = (option: any) => {
    setSelectedOption(option.value);
  };
  return (
    <div className="bg-tint6 h-full flex flex-col">
      <div className=" mr-20 flex flex-row justify-end mt-14">
        <button className="px-12 py-4 bg-gray-100 rounded-[51px] shadow flex-col justify-start inline-flex hover:bg-slate-200 w-56">
          <p className="text-neutral-900 text-2xl font-semibold font-['Poppins'] leading-9">
            Zara
          </p>
          <p className="text-gray-700 text-xl font-normal font-['Poppins']">
            Suster
          </p>
        </button>
      </div>
      <div className=" mt-10 font-poppins font-bold text-5xl ml-20 text-shade5">
        TANDA-TANDA VITAL PASIEN
      </div>
      <div className=" flex flex-row ml-20 mt-14">
        <div>
          <div className=" bg-shade2 rounded-3xl px-10 py-10 mr-14 mb-5">
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
                      24-02-2024 07:00:13
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
                      Bidan
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
                      12342943201
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
                      31750723432243
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
                      Afnan Edsa Ramadhan
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
                      24 tahun 2 bulan 5 hari
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
                      BPJS / 00032132812
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
                      Jl. Mangga no 12
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" bg-tint1 mr-14 rounded-3xl px-10 py-10 mb-7">
            <div className=" text-white text-3xl font-semibold font-poppins leading-10 mb-7">
              Rekam Medis Kunjungan
            </div>
            <table>
              <tbody>
                <tr
                  className="mb-3"
                  onClick={() => (window.location.href = "/")}
                >
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mr-11">
                      24/02/2023
                    </p>
                    <p className="text-white font-poppins text-xl font-normal">
                      Bidan
                    </p>
                  </td>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal">
                      Diagnosa:
                    </p>
                    <p className="text-white font-poppins text-xl font-normal w-56">
                      Migraine PRIMER BARU
                    </p>
                  </td>
                  <td>
                    <button>
                      <Image
                        src={Arrow}
                        alt="Arrow"
                        width={11}
                        height={20}
                        className=" ml-3"
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <form className=" mr-20 ">
          <div className=" bg-tint4 w-auto mb-7 rounded-2xl px-5 py-8">
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">Tenaga Medis
              <span className="text-[#D66A63]"> *</span></label>
              <Dropdown
                className="w-2/3"
                options={options}
                onSelect={handleOptionClick}
                required
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">Asisten Perawat</label>
              <Dropdown
                className="w-2/3"
                options={options}
                onSelect={handleOptionClick}
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Keluhan Utama
                <span className="text-[#D66A63]"> *</span>
              </label>
              <textarea
                name="keluhan_utama"
                id="keluhan_utama"
                className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Pisahkan dengan koma"
                required
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Keluhan Tambahan
              </label>
              <textarea
                name="keluhan_tambahan"
                id="keluhan_tambahan"
                className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Pisahkan dengan koma"
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Lama Sakit
                <span className="text-[#D66A63]"> *</span>
              </label>
              <div className="w-2/3 flex flex-row gap-4">
                <div className="relative w-1/3">
                  <input
                    type="text"
                    name="tahun"
                    id="tahun"
                    className="w-full h-12 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                    placeholder="0"
                    required
                  />
                  <span className="absolute right-0 top-0 bottom-0 bg-shade4 border border-l-0 rounded-r-2xl flex items-center px-3 text-sm text-tint7">
                    Thn
                  </span>
                </div>
                <div className="relative w-1/3">
                  <input
                    type="text"
                    name="bulan"
                    id="bulan"
                    className="w-full h-12 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                    placeholder="0"
                    required
                  />
                  <span className="absolute right-0 top-0 bottom-0 bg-shade4 border border-l-0 rounded-r-2xl flex items-center px-3 text-sm text-tint7">
                    Bln
                  </span>
                </div>
                <div className="relative w-1/3">
                  <input
                    type="text"
                    name="hari"
                    id="hari"
                    className="w-full h-12 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                    placeholder="0"
                    required
                  />
                  <span className="absolute right-0 top-0 bottom-0 bg-shade4 border border-l-0 rounded-r-2xl flex items-center px-3 text-sm text-tint7">
                    Hr
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className=" bg-tint4 w-auto mb-7 rounded-2xl px-14 py-11">
            bagian 2
          </div>
          <div className=" bg-tint4 w-auto mb-7 rounded-2xl px-14 py-11">
            bagian 3
          </div>
        </form>
      </div>
    </div>
  );
}
