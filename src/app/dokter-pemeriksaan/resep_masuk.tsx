import React, {useState} from 'react';
import Dropdown from "../components/dropdown";

export default function ResepMasuk() {
    const [ruangTujuan, setRuangTujuan] = useState('');
    const [statusObat, setStatusObat] = useState('');
    const ruangTujuanOpt = [
        { label: "Apotek", value: "Apotek" },
    ];
    const statusObatOpt = [
        { label: "Belum Dikirim", value: "Belum Dikirim" },
        { label: "Sudah Dikirim", value: "Sudah Dikirim" },
    ];
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
                required
              />
            </div>
            <div>
                <button className="w-1/3 h-10 mt-4 bg-primary1 text-white rounded-md font-Poppins font-semibold ">
                    Tambah Obat
                </button>
            </div>
        </div>
    );
}