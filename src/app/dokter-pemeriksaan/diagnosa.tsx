import React, { useState } from 'react';
import Dropdown from "../components/dropdown";

export default function Diagnosa() {
    const [diagnosa, setDiagnosa] = useState('');
    const [jenis, setJenis] = useState('');
    const [kasus, setKasus] = useState('');
    const [statusDiagnosa, setStatusDiagnosa] = useState('');
    const options = [
        { label: "Diagnosa1", value: "Diagnosa1" },
        { label: "Diagnosa2", value: "Diagnosa2" },
        { label: "Diagnosa3", value: "Diagnosa3" },
      ];
    const jenisOptions = [
        { label: "PRIMER", value: "PRIMER" },
        { label: "SEKUNDER", value: "SEKUNDER" },
        { label: "KOMPLIKASI", value: "KOMPLIKASI" },
      ];
    const kasusOptions = [
        { label: "LAMA", value: "LAMA" },
        { label: "BARU", value: "BARU" },
      ];
    const statusDiagnosaOptions = [
        { label: "StatusDiagnosa1", value: "StatusDiagnosa1" },
        { label: "StatusDiagnosa2", value: "StatusDiagnosa2" },
        { label: "StatusDiagnosa3", value: "StatusDiagnosa3" },
      ];
    return (
        <div className="flex flex-col w-full pt-12 pl-6 pr-10 pb-10 mb-14 rounded-md ">
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
                Diagnosa
                <span className="text-[#D66A63]"> *</span>
              </label>
              <Dropdown
                id="diagnosa"
                className="w-2/3"
                options={options}
                value={diagnosa}
                placeholder="Cari Diagnosa"
                required
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
                Jenis
              </label>
              <Dropdown
                id="diagnosa"
                className="w-2/3"
                options={jenisOptions}
                value={diagnosa}
                required
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
                Kasus
              </label>
              <Dropdown
                id="diagnosa"
                className="w-2/3"
                options={kasusOptions}
                value={diagnosa}
                required
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
                Status Diagnosis
              </label>
              <Dropdown
                id="diagnosa"
                className="w-2/3"
                options={statusDiagnosaOptions}
                value={diagnosa}
                required
              />
            </div>
            <div className='flex justify-end'>
                <button className="w-1/3 h-10 mt-4 bg-primary1 text-white rounded-md font-Poppins font-semibold">
                    Tambahkan Diagnosa
                </button>
            </div>
        </div>
    );
}