"use client";
import { IoMdArrowBack } from "react-icons/io";
import Dropdown from "../../components/dropdown";
import { useState } from "react";

const headObat = [
    "No",
    "Obat",
    "Qyt",
    "Harga Persatuan",
    "Total",
    "Keterangan",
];
const headTindakan = [
    "No",
    "Tindakan",
    "Harga",
];

const pembayaranOptions = [
    { label: "Tunai", value: "tunai" },
    { label: "Debit", value: "debit" },
    { label: "Asuransi", value: "asuransi" },
    { label: "Transfer", value: "transfer" },
    { label: "QRIS", value: "qris" },
];
export default function DetailPembayaran() {
    const [selectedPembayaran, setSelectedPembayaran] = useState(null);
    const [tableData, setTableData] = useState(null);

    const handlePembayaran = (option: any) => {
        setSelectedPembayaran(option);
        console.log(option);
    };

    return (
        <div className="bg-tint6 h-screen flex flex-col font-Poppins">
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
            <div className="flex flex-row ml-10 mt-14">
                <div className="w-1/5 mr-5">
                    <div className=" bg-shade2 rounded-3xl px-10 py-10 mb-5">
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
                                            {/* {created_at} */}
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
                                            {/* {poli} */}
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
                                            {/* {pasien && <p>{pasien.no_erm}</p>} */}
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
                                            {/* {pasien && <p>{pasien.nama}</p>} */}
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
                                        <p className="text-white font-poppins text-xl font-normal mb-3"></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text-white font-poppins text-xl font-normal mb-3">
                                            Penjamin
                                        </p>
                                    </td>
                                    <td>
                                        <p className="text-white font-poppins text-xl font-normal mb-3"></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-row text-black font-bold ">
                        <IoMdArrowBack className="mr-2 text-4xl" />
                        <p className="  underline underline-offset-2 text-xl">
                            Kembali ke Dashboard
                        </p>
                    </div>
                </div>
                <div className="w-4/5 ml-5 mr-10 flex flex-col ">
                    <div className="rounded-2xl overflow-hidden">
                        <table className="table-auto text-center w-full ">
                            <thead className=" bg-shade5  ">
                                <tr>
                                    {headObat.map((headObat) => (
                                        <th key={headObat} className="py-2">
                                            {headObat}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-tint4 text-black">
                                <tr className="">
                                    <td className="p-2">1</td>
                                    <td className="p-2">Paracetamol</td>
                                    <td className="p-2">2</td>
                                    <td className="p-2"><span>Rp</span>10.000,00</td>
                                    <td className="p-2"><span>Rp</span>20.000,00</td>
                                    <td className="p-2">2 Hari sekali</td>
                                </tr>
                                <tr className="">
                                    <td className="p-2">2</td>
                                    <td className="p-2">Paracetamol</td>
                                    <td className="p-2">2</td>
                                    <td className="p-2"><span>Rp</span>10.000,00</td>
                                    <td className="p-2"><span>Rp</span>20.000,00</td>
                                    <td className="p-2">2 Hari sekali</td>
                                </tr>
                                <tr className="">
                                    <td className="p-2">3</td>
                                    <td className="p-2">Paracetamol</td>
                                    <td className="p-2">2</td>
                                    <td className="p-2"><span>Rp</span>10.000,00</td>
                                    <td className="p-2"><span>Rp</span>20.000,00</td>
                                    <td className="p-2">2 Hari sekali</td>
                                </tr>
                                <tr className="">
                                    <td className="p-2">4</td>
                                    <td className="p-2">Paracetamol</td>
                                    <td className="p-2">2</td>
                                    <td className="p-2"><span>Rp</span>10.000,00</td>
                                    <td className="p-2"><span>Rp</span>20.000,00</td>
                                    <td className="p-2">2 Hari sekali</td>
                                </tr>
                                <tr className="">
                                    <td className="p-2">5</td>
                                    <td className="p-2">Paracetamol</td>
                                    <td className="p-2">2</td>
                                    <td className="p-2"><span>Rp</span>10.000,00</td>
                                    <td className="p-2"><span>Rp</span>20.000,00</td>
                                    <td className="p-2">2 Hari sekali</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="rounded-2xl overflow-hidden mt-10">
                        <table className="table-auto text-center w-full ">
                            <thead className=" bg-shade5  ">
                                <tr>
                                    {headTindakan.map((headTindakan) => (
                                        <th key={headTindakan} className="py-2">
                                            {headTindakan}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-tint4 text-black">
                                <tr className="">
                                    <td className="p-2">1</td>
                                    <td className="p-2">Jahit</td>
                                    <td className="p-2"><span>Rp</span>500.000,00</td>
                                </tr>
                                <tr className="">
                                    <td className="p-2">2</td>
                                    <td className="p-2">Bedah</td>
                                    <td className="p-2"><span>Rp</span>100.000.000,00</td>
                                </tr>
                                <tr className="">
                                    <td className="p-2">3</td>
                                    <td className="p-2">Anestesi</td>
                                    <td className="p-2"><span>Rp</span>1.000.000,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-row justify-end">
                        <div className="bg-shade2 mt-7 rounded-2xl w-1/2 px-5 py-5 flex flex-col text-base">
                            <div className="flex flex-row justify-between my-1 ">
                                <div>Items (20 Qyt)</div>
                                <div><span>Rp</span>10.000.000</div>
                            </div>
                            <div className="flex flex-row justify-between my-1">
                                <div>Tax (10%)</div>
                                <div><span>Rp</span>10.000.000</div>
                            </div>
                            <div className="flex flex-row justify-between my-1">
                                <div>Metode Pembayaran</div>
                                <div className="w-1/2">
                                    <Dropdown
                                        options={pembayaranOptions}
                                        onSelect={(pembayaranOptions: any) =>
                                            handlePembayaran(
                                                pembayaranOptions.value
                                            )
                                        }
                                        className=""
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between text-2xl font-bold mt-4">
                                <div>Total</div>
                                <div><span>Rp</span>10.000.000</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end my-7">
                            <button className="bg-shade4 w-1/4 px-3 py-3 font-bold rounded-xl items-center hover:bg-shade6">
                                Lanjutkan Pembayaran
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
