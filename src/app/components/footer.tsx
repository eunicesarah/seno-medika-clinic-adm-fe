import Image from "next/image";
import dokter2 from "../../../public/dokter2.svg";


export default function Footer() {


    return (
        <div className="flex flex-row justify-between bg-gradient-to-br from-[#172C25] to-[#366453] h-[254px] space-x-3 pt-4 px-2 lg:pt-14 lg:px-16">
            <div className="w-1/2">
                <div className="flex flex-row items-center">
                    <Image
                    src={dokter2}
                    alt="MBA Depan"
                    height={63}
                    width={63}
                    />
                    <h1 className="font-semibold text-base lg:text-2xl px-4">Seno Medika</h1>
                </div>
                <p className="py-3 lg:py-6 text-xs lg:text-xl text-justify">Jl. A. Yani No.675-677, Padasuka, Kec. Cibeunying Kidul, Kota Bandung, Jawa Barat 40125</p>
            </div>
            <div className="">
                <h1 className="font-semibold text-base lg:text-lg">Jam Operasional</h1>
                <div className="grid grid-cols-4 gap-0 lg:gap-2 text-xs lg:text-base mt-3">
                    <p className="col-start-1 col-span-1 font-semibold">Poli Umum</p>
                    <p className="col-start-2 col-span-1">Senin-Sabtu</p>
                    <p className="col-start-3 col-span-2">08.00 - 12.00 & 15.00 - 19.00</p>
                    <p className="col-start-1 col-span-1 font-semibold">Poli Gigi</p>
                    <p className="col-start-2 col-span-1">Senin-Sabtu</p>
                    <p className="col-start-3 col-span-2">08.00 - 12.00 & 15.00 - 19.00</p>
                    <p className="col-start-1 col-span-1 font-semibold">Klinik Khitan</p>
                    <p className="col-start-2 col-span-1">Senin-Sabtu</p>
                    <p className="col-start-3 col-span-1">09.00 - 19.00</p>
                </div>
            </div>
        </div>
    );
};