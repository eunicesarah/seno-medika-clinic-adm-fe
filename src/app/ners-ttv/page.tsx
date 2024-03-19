"use client";
import { useState } from "react";
import Image from "next/image";
import Arrow from "../../../public/right_arrow.svg";
import Dropdown from "../components/dropdown";

interface NurseStation {
  skriningAwal: SkriningAwal;
  skriningGizi: SkriningGizi;
  riwayatPenyakit: RiwayatPenyakit;
  ttv: TTV;
  alergi: Alergi;
  anamnesis: Anamnesis;
}

interface SkriningAwal {
  disabilitas: boolean;
  ambulansi: boolean;
  hambatan_komunikasi: boolean;
  jalan_tidak_seimbang: boolean;
  menopang_saat_duduk: boolean;
  jalan_alat_bantu: boolean;
  skala_nyeri: number;
  nyeri_berulang: string;
}

interface SkriningGizi {
  penurunan_bb: string;
  diagnosis_khusus: boolean;
  nama_penyakit: string;
  skala_nyeri: number;
  nyeri_berulang: string;
  sifat_nyeri: string;
}

interface RiwayatPenyakit {
  rps: string;
  rpd: string;
  rpk: string;
}

interface TTV {
  kesadaran: string;
  sistole: number;
  diastole: number;
  tinggi_badan: number;
  cara_ukur_tb: string;
  berat_badan: number;
  lingkar_perut: number;
  detak_nadi: number;
  nafas: number;
  saturasi: number;
  suhu: number;
  detak_jantung: string;
  triage: string;
}

interface Alergi {
  obat: string;
  makanan: string;
  lainnya: string;
}

interface Anamnesis {
  pasien_id: number;
  dokter_id: number;
  perawat_id: number;
  keluhan_utama: string;
  keluhan_tambahan: string;
  lama_sakit: number;
}

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
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Tenaga Medis
                <span className="text-[#D66A63]"> *</span>
              </label>
              <Dropdown
                className="w-2/3"
                options={options}
                onSelect={handleOptionClick}
                required
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Asisten Perawat
              </label>
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
          <div className=" bg-tint4 w-auto mb-7 rounded-2xl px-5 py-8">
            <label className="text-shade6 font-bold text-xl m-4 underline">
              Status Fungsional Pasien
            </label>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Disabilitas
              </label>
              <div className="w-2/3 flex flex-row gap-10 items-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ya"
                    name="disabilitas"
                    value="ya"
                  />
                  <label
                    htmlFor="ya"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Ya
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="tidak"
                    name="disabilitas"
                    value="tidak"
                  />
                  <label
                    htmlFor="tidak"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Tidak
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Ambulasi
              </label>
              <input
                type="text"
                name="ambulasi"
                id="ambulasi"
                className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Ada / Tidak Ada"
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Hambatan Komunikasi
              </label>
              <div className="w-2/3 flex flex-row gap-10 items-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ya"
                    name="hambatan_komunikasi"
                    value="ya"
                  />
                  <label
                    htmlFor="ya"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Ya
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="tidak"
                    name="hambatan_komunikasi"
                    value="tidak"
                  />
                  <label
                    htmlFor="tidak"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Tidak
                  </label>
                </div>
              </div>
            </div>
            <label className="text-shade6 font-bold text-xl m-4 underline">
              Risiko Jatuh
            </label>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Tidak seimbang, Sempoyongan, Limbung
              </label>
              <div className="w-2/3 flex flex-row gap-10 items-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ya"
                    name="sempoyongan"
                    value="ya"
                  />
                  <label
                    htmlFor="ya"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Ya
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="tidak"
                    name="sempoyongan"
                    value="tidak"
                  />
                  <label
                    htmlFor="tidak"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Tidak
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Menopang saat duduk : Tampak memegang pinggiran kursi atau meja
                / benda lain sebagaipenopang saat akan duduk
              </label>
              <div className="w-2/3 flex flex-row gap-10 items-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ya"
                    name="duduk_menopang"
                    value="ya"
                  />
                  <label
                    htmlFor="ya"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Ya
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="tidak"
                    name="duduk_menopang"
                    value="tidak"
                  />
                  <label
                    htmlFor="tidak"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Tidak
                  </label>
                </div>
              </div>
            </div>
          <div className="flex flex-row justify-between items-center mb-4">
            <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
              Jalan menggunakan alat bantu ( Kruk, Tripod, Kursi Roda, Orang
            </label>
            <div className="w-2/3 flex flex-row gap-10 items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="ya"
                  name="alat_bantu"
                  value="ya"
                />
                <label
                  htmlFor="ya"
                  className="text-white font-Poppins font-normal ml-4"
                >
                  Ya
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="tidak"
                  name="alat_bantu"
                  value="tidak"
                />
                <label
                  htmlFor="tidak"
                  className="text-white font-Poppins font-normal ml-4"
                >
                  Tidak
                </label>
              </div>
            </div>
          </div>


           {/* SKRALA NYERI DAN SKRINING GIZI  */}
          <label className="text-shade6 font-bold text-xl m-4 underline">
              Skala Nyeri
          </label>
          <div className="flex flex-row  items-center mb-4 justify-center">
            <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
              Skala Nyeri<span className="text-[#D66A63]"> *</span>
            </label>
            <div className="w-2/3 flex flex-row gap-10 items-center">
              <div className="flex flex-col items-center justify-center text-center">
                  <label
                  htmlFor="1"
                  className=" text-white font-Poppins font-normal ">
                  1
                </label>
                  <input
                  type="radio"
                  id="1"
                  name="skala_nyeri"
                  value="1"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                  <label
                  htmlFor="2"
                  className=" text-white font-Poppins font-normal ">
                  2
                </label>
                  <input
                  type="radio"
                  id="2"
                  name="skala_nyeri"
                  value="2"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                  <label
                  htmlFor="3"
                  className=" text-white font-Poppins font-normal ">
                  3
                </label>
                  <input
                  type="radio"
                  id="3"
                  name="skala_nyeri"
                  value="3"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                  <label
                  htmlFor="4"
                  className=" text-white font-Poppins font-normal ">
                  4
                </label>
                  <input
                  type="radio"
                  id="4"
                  name="skala_nyeri"
                  value="4"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                  <label
                  htmlFor="5"
                  className=" text-white font-Poppins font-normal ">
                  5
                </label>
                  <input
                  type="radio"
                  id="5"
                  name="skala_nyeri"
                  value="5"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                  <label
                  htmlFor="6"
                  className=" text-white font-Poppins font-normal ">
                  6
                </label>
                  <input
                  type="radio"
                  id="6"
                  name="skala_nyeri"
                  value="6"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                  <label
                  htmlFor="7"
                  className=" text-white font-Poppins font-normal ">
                  7
                </label>
                  <input
                  type="radio"
                  id="7"
                  name="skala_nyeri"
                  value="7"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                  <label
                  htmlFor="8"
                  className=" text-white font-Poppins font-normal ">
                  8
                </label>
                  <input
                  type="radio"
                  id="8"
                  name="skala_nyeri"
                  value="8"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                  <label
                  htmlFor="9"
                  className=" text-white font-Poppins font-normal ">
                  9
                </label>
                  <input
                  type="radio"
                  id="9"
                  name="skala_nyeri"
                  value="9"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                  <label
                  htmlFor="y10"
                  className=" text-white font-Poppins font-normal ">
                  10
                </label>
                  <input
                  type="radio"
                  id="10"
                  name="skala_nyeri"
                  value="10"
                />
              </div>
              
            </div>
          </div>
          <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Kapan Nyeri Berulang<span className="text-[#D66A63]"> *</span>
              </label>
              <input
                type="text"
                name="nyeri_berulang"
                id="nyeri_berulang"
                className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Ada / Tidak Ada"
              />
          </div>
          <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Sifat Nyeri<span className="text-[#D66A63]"> *</span>
              </label>
              <input
                type="text"
                name="sifat_nyeri"
                id="sifat_nyeri"
                className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Ada / Tidak Ada"
              />
          </div>
          <label className="text-shade6 font-bold text-xl m-4 underline">
              Skrining Gizi
          </label>
          <div className="flex flex-row  items-center mb-4 justify-center">
            <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
            Apakah pasien mengalami penurunan berat badan yang tidak diinginkan dalam kurun waktu 6 bulan terakhir <span className="text-[#D66A63]"> *</span>
            </label>
            <div className="w-2/3 flex flex-col gap-2  text-start justify-start items-start">
              <div className="flex flex-row items-center justify-center text-center">
              <input
                  type="radio"
                  id="tdk_tahu"
                  name="penurunan_bb"
                  value="ya"
                /> 
                <label
                  htmlFor="tdk_tahu"
                  className=" text-white font-Poppins font-normal ml-4 "
                >
                  Tidak tahu / terasa baju lebih longgar
                </label>
                
              </div>
              <div className="flex flex-row items-center justify-center text-center">
              <input
                  type="radio"
                  id="1-5"
                  name="penurunan_bb"
                  value="ya"
                /> 
                <label
                  htmlFor="1-5"
                  className=" text-white font-Poppins font-normal ml-4 "
                >
                  Penurunan berat badan 1 - 5 kg
                </label>
                
              </div>
              <div className="flex flex-row items-center justify-center text-center">
              <input
                  type="radio"
                  id="6-10"
                  name="penurunan_bb"
                  value="ya"
                /> 
                <label
                  htmlFor="6-10"
                  className=" text-white font-Poppins font-normal ml-4 "
                >
                  Penurunan berat badan 6 - 10 kg
                </label>
                
              </div>
              <div className="flex flex-row items-center justify-center text-center">
              <input
                  type="radio"
                  id="11-15"
                  name="penurunan_bb"
                  value="ya"
                /> 
                <label
                  htmlFor="11-15"
                  className=" text-white font-Poppins font-normal ml-4 "
                >
                  Penurunan berat badan 11 - 15 kg
                </label>
                
              </div>
              <div className="flex flex-row items-center justify-center text-center">
              <input
                  type="radio"
                  id=">15"
                  name="penurunan_bb"
                  value="ya"
                /> 
                <label
                  htmlFor=">15"
                  className=" text-white font-Poppins font-normal ml-4 "
                >
                  Penurunan berat badan {'>'} 15 kg
                </label>
                
              </div>
              
            </div>
          </div>
          <div className="flex flex-row justify-between items-center mb-4">
            <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
            Pasien dengan diagnosis khusus <span className="text-[#D66A63]"> *</span>
            </label>
            <div className="w-2/3 flex flex-row gap-10 items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="ya"
                  name="diagnosis_khusus"
                  value="ya"
                />
                <label
                  htmlFor="ya"
                  className="text-white font-Poppins font-normal ml-4"
                >
                  Ya
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="tidak"
                  name="diagnosis_khusus"
                  value="tidak"
                />
                <label
                  htmlFor="tidak"
                  className="text-white font-Poppins font-normal ml-4"
                >
                  Tidak
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Nama Penyakit <span className="text-[#D66A63]"> *</span>
              </label>
              <input
                type="text"
                name="nama_penyakit"
                id="nama_penyakit"
                className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Ada / Tidak Ada"
              />
          </div>
          
          </div>
          <div className=" bg-tint4 w-auto mb-7 rounded-2xl px-5 py-11 grid grid-cols-2 gap-4">
            <div className="mr-4 px-5 ">
              <label className="text-shade6 font-bold text-xl mv-4 underline">
                Riwayat Penyakit
              </label>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  RPS
                </label>
                <input
                  type="text"
                  name="rps"
                  id="rps"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                  placeholder="Ada / Tidak Ada"
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  RPD
                </label>
                <input
                  type="text"
                  name="rpd"
                  id="rpd"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                  placeholder="Ada / Tidak Ada"
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  RPK
                </label>
                <input
                  type="text"
                  name="rpk"
                  id="rpk"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                  placeholder="Ada / Tidak Ada"
                />
              </div>
              <br />
              <br />
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Kesadaran <span className="text-[#D66A63]"> *</span>
                </label>
                <Dropdown
                  className="w-2/3"
                  options={options}
                  onSelect={handleOptionClick}
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Sistole <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  type="text"
                  name="sistole"
                  id="sistole"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl  border border-neutral-200 text-shade7"
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-5 text-sm text-tint7">Mm</span>
              </div>
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Diastole <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  type="text"
                  name="diastole"
                  id="diastole"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-5 text-sm text-tint7">Hg</span>
              </div>
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Tinggi Badan <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  type="text"
                  name="tinggi_badan"
                  id="tinggi_badan"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-5 text-sm text-tint7">Cm</span>
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Cara Ukur TB <span className="text-[#D66A63]"> *</span>
                </label>
                <Dropdown
                  className="w-2/3"
                  options={options}
                  onSelect={handleOptionClick}
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Berat Badan <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  type="text"
                  name="berat_badan"
                  id="berat_badan"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-5 text-sm text-tint7">Kg</span>
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  IMT <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  type="text"
                  name="imt"
                  id="imt"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Hasil IMT <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  type="text"
                  name="hasil_imt"
                  id="hasil_imt"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
              </div>
            </div>
            <div >
              <label className="text-shade6 font-bold text-xl mv-4 underline">
                Alergi
              </label>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Obat
                </label>
                <input
                  type="text"
                  name="rps"
                  id="rps"
                  placeholder="Ada / Tidak Ada"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Makanan
                </label>
                <input
                  type="text"
                  name="rpd"
                  id="rpd"
                  placeholder="Ada / Tidak Ada"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Lainnya
                </label>
                <input
                  type="text"
                  name="rpk"
                  id="rpk"
                  placeholder="Ada / Tidak Ada"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
              </div>
              <br />
              <br />
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Lingkar Perut <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  type="text"
                  name="lingkar_perut"
                  id="lingkar_perut"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-5 text-sm text-tint7">Cm</span>
              </div>
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Detak Nadi <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  type="text"
                  name="detak_nadi"
                  id="detak_nadi"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-4 text-sm text-tint7">/Menit</span>
              </div>
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Nafas <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  type="text"
                  name="nafas"
                  id="nafas"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-4 text-sm text-tint7">/Menit</span>
              </div>
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Saturasi <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  type="text"
                  name="saturasi"
                  id="saturasi"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-6 text-sm text-tint7">%</span>
              </div>
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Suhu <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  type="text"
                  name="suhu"
                  id="suhu"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-6 text-sm text-tint7">℃</span>
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Detak Jantung <span className="text-[#D66A63]"> *</span>
                </label>
                <div className="w-2/3 flex flex-row gap-10 items-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="regular"
                    name="detak_jantung"
                    value="regular"
                  />
                  <label
                    htmlFor="regular"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Regular
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="iregular"
                    name="detak_jantung"
                    value="iregular"
                  />
                  <label
                    htmlFor="iregular"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Iregular
                  </label>
                </div>
              </div>
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Triage <span className="text-[#D66A63]"> *</span>
                </label>
                <div className="w-2/3 flex flex-col gap-2  text-start justify-start items-start">
                  <div className="flex flex-row items-center justify-center text-center">
                  <input
                      type="radio"
                      id="gawat_darurat"
                      name="triage"
                      value="gawat_darurat"
                    /> 
                    <label
                      htmlFor="gawat_darurat"
                      className=" text-white font-Poppins font-normal ml-4 "
                    >
                      Gawat Darurat
                    </label>
                  </div>
                  <div className="flex flex-row items-center justify-center text-center">
                  <input
                      type="radio"
                      id="darurat"
                      name="triage"
                      value="darurat"
                    /> 
                    <label
                      htmlFor="darurat"
                      className=" text-white font-Poppins font-normal ml-4 "
                    >
                      Darurat
                    </label>
                    
                  </div>
                  <div className="flex flex-row items-center justify-center text-center">
                  <input
                      type="radio"
                      id="tdk_gawat_darurat"
                      name="triage"
                      value="tdk_gawat_darurat"
                    /> 
                    <label
                      htmlFor="tdk_gawat_darurat"
                      className=" text-white font-Poppins font-normal ml-4 "
                    >
                      Tidak Gawat Darurat
                    </label>
                    
                  </div>
                  <div className="flex flex-row items-center justify-center text-center">
                  <input
                      type="radio"
                      id="meninggal"
                      name="triage"
                      value="meninggal"
                    /> 
                    <label
                      htmlFor="meninggal"
                      className=" text-white font-Poppins font-normal ml-4 "
                    >
                      Meninggal
                    </label>
                  </div>
                </div>
              </div>
              

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
