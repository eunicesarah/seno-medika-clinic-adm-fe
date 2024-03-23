import Image from "next/image";
import SMLogo from "../../../public/Logo_Seno_Medika.svg";
import React from "react";


export default function Home() {
    return (
        <div className=" bg-tint6 flex-col flex h-auto">
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
                        <p className="text-neutral-900 text-2xl font-semibold font-['Poppins'] leading-9">Isti</p>
                        <p className="text-gray-700 text-xl font-normal font-['Poppins']">Super Admin</p>
                    </button>
                </div>
            </div>
            <p className=" font-poppins ml-20 mt-8 font-bold h-11 w-auto text-3xl text-shade6">DATA PEMERIKSAAN MEDIS</p>
            <div className="flex items-center ml-20 mt-4">
                <div className="flex w-auto h-auto items-start">
                    <p className="text-black">Tampilkan data</p>
                </div>
            </div>
        </div>
    )
}