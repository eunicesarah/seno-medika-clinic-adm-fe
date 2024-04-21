import React, { useState, useEffect } from 'react';

export default function Keur({tanggal, dokter}: {tanggal: string, dokter: string}) {
    const [mulaiTanggal, setMulaiTanggal] = useState<string>('');
    const [sampaiTanggal, setSampaiTanggal] = useState<string>('');
    const [selama, setSelama] = useState<string>('');

    // hitung hari
    useEffect(() => {
        if (mulaiTanggal && sampaiTanggal) {
            const start = new Date(mulaiTanggal);
            const end = new Date(sampaiTanggal);
            const differenceInTime = end.getTime() - start.getTime();
            const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
            setSelama(`${differenceInDays} hari`);
        }
    }, [mulaiTanggal, sampaiTanggal]);

    return (
        <div className=' flex flex-col w-full pt-12 pl-6 pr-10 pb-10 mb-14 rounded-md'>
            <div className=' flex flex-row justify-between items-center mb-4'>
                <label className='w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold'>
                    Tanggal
                </label>
                <div className='w-2/3'>
                    {tanggal}
                </div>
            </div>
            <div className=' flex flex-row justify-between items-center mb-4'>
                <label className='w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold'>
                    Dokter / Tenaga Medis
                    <span className='text-[#D66A63]'> *</span>
                </label>
                <div className='w-2/3'>
                    {dokter}
                </div>
            </div>
            <div className=' flex flex-row justify-between items-center mb-4'>
                <label className='w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold'>
                    No. Surat
                    <span className='text-[#D66A63]'> *</span>
                </label>
                <input
                    type = "text"
                    name = "noSurat"
                    id = "noSurat"
                    className='w-2/3 h-10 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-md'
                    placeholder='U001/SS-1/KPSM/III/2024'
                />
            </div>
            <div className=' flex flex-row justify-between items-center mb-4'>
                <label className='w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold'>
                    Mulai Tanggal
                    <span className='text-[#D66A63]'> *</span>
                </label>
                <input
                    type = "date"
                    name = "mulaiTanggal"
                    id = "mulaiTanggal"
                    onChange={(e) => setMulaiTanggal(e.target.value)}
                    className='w-2/3 h-10 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-md'
                />
            </div>
            <div className=' flex flex-row justify-between items-center mb-4'>
                <label className='w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold'>
                    Sampai Tanggal
                    <span className='text-[#D66A63]'> *</span>
                </label>
                <input
                    type = "date"
                    name = "sampaiTanggal"
                    id = "sampaiTanggal"
                    onChange={(e) => setSampaiTanggal(e.target.value)}
                    className='w-2/3 h-10 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-md'
                />
            </div>
            <div className=' flex flex-row justify-between items-center mb-4'>
                <label className='w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold'>
                    Selama
                </label>
                <input
                    type = "text"
                    name = "selama"
                    id = "selama"
                    value={selama}
                    readOnly
                    className='w-2/3 h-10 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-md'
                />
            </div>
            <div className=' flex flex-row justify-between items-center mb-4'>
                <label className='w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold'>
                    Catatan
                </label>
                <textarea
                    name = "catatan"
                    id = "catatan"
                    className='w-2/3 h-24 pl-4 pt-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-md'
                />
            </div>

            <div className=' flex justify-end'>
                <button className='w-1/3 h-10 mt-4 bg-primary1 text-white rounded-md font-Poppins font-semibold'>
                    Tambahkan Keur
                </button>
            </div>
        </div>
    );
}