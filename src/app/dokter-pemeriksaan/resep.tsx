import React, { useEffect, useState } from "react";
import Dropdown from "../components/dropdown";
import RemoveButton from "../../../public/remove_button.svg";
import Image from "next/image";

interface Obat {
  nama_obat: string;
  jumlah: number;
  dosis: string;
  aturan_pakai: string;
  harga: number;
  keterangan: string;
}
export default function ResepMasuk() {
  const [ruangTujuan, setRuangTujuan] = useState("");
  const [statusObat, setStatusObat] = useState("");
  const [obatData, setObatData] = useState<Obat[]>([]);
  const ruangTujuanOpt = [{ label: "Apotek", value: "Apotek" }];
  const statusObatOpt = [
    { label: "Racik", value: "racik" },
    { label: "Non Racik", value: "non_racik" },
  ];
  const exampleObat: Obat[] = [
    {
      nama_obat: "Paracetamol",
      jumlah: 20,
      dosis: "500mg",
      aturan_pakai: "Sehari 3 kali",
      harga: 10000,
      keterangan: "Obat demam",
    },
    {
      nama_obat: "Ibuprofen",
      jumlah: 15,
      dosis: "200mg",
      aturan_pakai: "Sehari 2 kali",
      harga: 8000,
      keterangan: "Obat nyeri",
    },
    {
      nama_obat: "Amoxicillin",
      jumlah: 10,
      dosis: "500mg",
      aturan_pakai: "Sehari 3 kali",
      harga: 15000,
      keterangan: "Antibiotik",
    },
  ];

  useEffect(() => {
    setObatData(exampleObat);
  }, []);
  return (
    <div className="flex flex-col w-full pt-12 pl-6 pr-10 pb-10 mb-14 rounded-md ">
      <div className="flex flex-row justify-between items-center mb-4">
        <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
          Ruang Tujuan
          <span className="text-[#D66A63]"> *</span>
        </label>
        <Dropdown
          id="ruang_tujuan"
          className="w-2/3"
          options={ruangTujuanOpt}
          value={ruangTujuan}
          placeholder="Pilih Ruang Tujuan"
          data-testid="ruang_tujuan"
          required
        />
      </div>
      <div className="flex flex-row justify-between items-center mb-4">
        <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
          Status Obat
          <span className="text-[#D66A63]"> *</span>
        </label>
        <Dropdown
          id="status_obat"
          className="w-2/3"
          options={statusObatOpt}
          value={statusObat}
          placeholder="Status Obat"
          data-testid="status_obat"
          required
        />
      </div>
      <div className="flex flex-row justify-between items-center mb-4">
        <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
          Nama Obat
          <span className="text-[#D66A63]"> *</span>
        </label>
        <input
          id="nama_obat"
          className="w-full h-12 px-7 py-3.5 bg-gray-100 rounded-2xl border text-shade7 border-shade1"
        />
      </div>
      <div className="flex flex-row justify-between items-center mb-4">
        <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
          Jumlah
          <span className="text-[#D66A63]"> *</span>
        </label>
        <input
          id="jumlah"
          className="w-full h-12 px-7 py-3.5 bg-gray-100 rounded-2xl border text-shade7 border-shade1"
        />
      </div>
      <div className="flex flex-row justify-between items-center mb-4">
        <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
          Dosis
          <span className="text-[#D66A63]"> *</span>
        </label>
        <input
          id="dosis"
          className="w-full h-12 px-7 py-3.5 bg-gray-100 rounded-2xl border text-shade7 border-shade1"
        />
      </div>
      <div className="flex flex-row justify-between items-center mb-4">
        <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
          Aturan Pakai
        </label>
        <input
          id="aturan_pakai"
          className="w-full h-12 px-7 py-3.5 bg-gray-100 rounded-2xl border text-shade7 border-shade1"
        />
      </div>
      <div className="flex flex-row justify-between items-center mb-4">
        <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
          Harga
        </label>
        <input
          id="harga"
          className="w-full h-12 px-7 py-3.5 bg-gray-100 rounded-2xl border text-shade7 border-shade1"
        />
      </div>
      <div className="flex flex-row justify-between items-center mb-4">
        <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
          Keterangan
        </label>
        <textarea
          id="jumlah"
          className="w-full px-7 py-3.5 bg-gray-100 rounded-2xl border border-shade1 text-shade7"
        />
      </div>
      <div>
        <button className="w-1/3 h-10 mt-4 bg-primary1 text-white rounded-md font-Poppins font-semibold ">
          Tambah Obat
        </button>
      </div>
      <div className="flex flex-col justify-between items-center my-3 gap-4 w-full">
        {obatData.map((obat, index) => (
          <div key={index} className="w-full">
            <hr className="h-px bg-shade6 border-0 w-full" />
            <div className="flex justify-between items-center w-full">
              <div className="flex-grow">
                <p className="font-bold">{obat.nama_obat}</p>
                <p>Jumlah: {obat.jumlah}</p>
                <p>Dosis: {obat.dosis}</p>
                <p>Aturan Pakai: {obat.aturan_pakai}</p>
                <p>Harga: {obat.harga}</p>
                <p>Keterangan: {obat.keterangan}</p>
              </div>
              <button className="w-10 h-10">
                <Image src={RemoveButton} alt="Remove Button" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
