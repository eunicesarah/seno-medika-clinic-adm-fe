import React from 'react';
import Popup from "@/app/components/popup";

export default function KonfirmasiPembayaranPopup({ showPopup, setShowPopup }:any) {
    return (
        showPopup && (
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
                            <p>24-02-2024 07:00:13</p>

                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Poli</p>
                            <p>Bidan</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>No eRM</p>
                            <p>123432943201</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Nama Pasien</p>
                            <p>Afnan Edsa Ramadhan</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Total</p>
                            <p><span>Rp</span>10.000.000</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Metode Pembayaran</p>
                            <p>BCA</p>
                        </div>
                        <div className="flex justify-between pt-6">
                            <button className="bg-shade6 w-1/3 px-3 py-3 font-bold rounded-2xl items-center hover:bg-tint6 hover:text-shade6" onClick={() => setShowPopup(false)}>
                                Batal
                            </button>
                            <button className="bg-tint6 text-shade5 w-1/3 px-3 py-3 font-bold rounded-2xl items-center hover:bg-shade6 hover:text-white" onClick={() => setShowPopup(false)}>
                                Konfirmasi
                            </button>
                        </div>
                    </div>
            </Popup>
        )
    );
}