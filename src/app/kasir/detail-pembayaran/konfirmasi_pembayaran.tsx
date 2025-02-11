import React from 'react';
import Popup from "@/app/components/popup";
import { useState } from 'react';
import Image from 'next/image';
import SuccessLogo from '../../../../public/ok.svg';
export default function KonfirmasiPembayaranPopup({ showPopup, setShowPopup, poli, noERM, namaPasien, metodePembayaran, total, antrian_id}:any) {
    const [showConfirm, setShowConfirm] = useState(false);
    const handleConfirm = () => {
        setShowPopup(false);
        setShowConfirm(true);
    }
    const getDate = () =>{
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${day}-${month}-${year}`;
    }
    return (
        <div>
            {showPopup && (
            <Popup
                isvisible={showPopup}
                onClose={() => setShowPopup(false)}
            >
                <div className="flex flex-col bg-shade2 pb-8 pl-8 pr-8 gap-2">
                        <div className="flex flex-row place-self-center text-xl pb-4">
                            <div className="place-self-center font-semibold">Konfirmasi Pembayaran</div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div>
                            Tanggal

                            </div>
                            <div>
                            <p>{getDate()}</p>

                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Poli</p>
                            <p>{poli}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>No eRM</p>
                            <p>{noERM}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Nama Pasien</p>
                            <p>{namaPasien}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Total</p>
                            <p><span>Rp</span>{total}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Metode Pembayaran</p>
                            <p>{metodePembayaran}</p>
                        </div>
                        <div className="flex justify-between pt-6">
                            <button className="bg-shade6 w-1/3 px-3 py-3 font-bold rounded-2xl items-center hover:bg-tint6 hover:text-shade6" onClick={() => setShowPopup(false)}>
                                Batal
                            </button>
                            <button className="bg-tint6 text-shade5 w-1/3 px-3 py-3 font-bold rounded-2xl items-center hover:bg-shade6 hover:text-white" onClick={handleConfirm}>
                                Konfirmasi
                            </button>
                        </div>
                    </div>
                    
            </Popup>

        )}
        {showConfirm && (
            <Popup
                isvisible={showConfirm}
                onClose={() => setShowConfirm(false)}
            >
                <div className='flex flex-col justify-center text-center font-bold text-lg pb-10 items-center gap-4'>
                    <h1>Pembayaran berhasil dikonfimasi!</h1>
                    <Image src={SuccessLogo} alt="Success Logo" width={100} height={100} className='flex justify-self-center'/>

                </div>
            </Popup>
        )}
        </div>

        
    );
}