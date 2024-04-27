"use client";
import { IoMdArrowBack } from "react-icons/io";
import Dropdown from "../../components/dropdown";
import { useState, useEffect } from "react";
import KonfirmasiPembayaranPopup from "./konfirmasi_pembayaran";
import axios from "axios";
import { useSearchParams } from 'next/navigation'
import { get } from "http";

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
    const searchParams = useSearchParams();
    const idPasien = searchParams.get('pasien_id');
    const [selectedPembayaran, setSelectedPembayaran] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [pasien, setPasien] = useState<any>(null);
    const [antrian, setAntrian] = useState<any>(null);
    const [nota, setNota] = useState<any>(null);
    const [detailObat, setDetailObat] = useState<any>(null);
    const [detailTindakan, setDetailTindakan] = useState<any>(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPriceTindakan, setTotalPriceTindakan] = useState(0);    
    const [totalQuantityTindakan, setTotalQuantityTindakan] = useState(0);
    const [totalPriceObat, setTotalPriceObat] = useState(0);
    const [totalQuantityObat, setTotalQuantityObat] = useState(0);

    const pasienDataApi = "http://localhost:8080/pasien?find_by=id&target=";
    const antrianDataAPI = "http://localhost:8080/antrian?find_by=pasienId&target=";
    const kasirDataAPI = "http://localhost:8080/kasir?find_by=pasien_id&target=";
    const detailObatDataAPI = "http://localhost:8080/kasir?find_by=detail_resep&target=";
    const detailTindakanDataAPI = "http://localhost:8080/kasir?find_by=detail_tindakan&target=";
    const handlePembayaran = (option: any) => {
        setSelectedPembayaran(option);
        console.log(detailObat);
        console.log(option);
    };

    const getUsia = (tanggalLahir: string) => {
        const today = new Date();
        const birthDate = new Date(tanggalLahir);
        var age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const getDate = () =>{
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        fetchDataPasien();
        fetchDataAntrian();
        fetchDataNota();
      }, []);

    useEffect(() => {
        setTotalPrice(totalPriceObat + totalPriceTindakan);
        setTotalQuantity(totalQuantityObat + totalQuantityTindakan);  
    }, [totalPriceObat, totalPriceTindakan]);
      
    const fetchDataPasien = async () => {
        try {
          const response = await axios.get(
            `${pasienDataApi}${idPasien}`
          );
          const responseData = response.data;
          const fetchedData = responseData.data;
          console.log(fetchedData);
          setPasien(fetchedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };
    const fetchDataAntrian = async () => {
        try {
          const response = await axios.get(
            `${antrianDataAPI}${idPasien}`
          );
          const responseData = response.data;
          const fetchedData = responseData.data;
          console.log(fetchedData);
          setAntrian(fetchedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };
    const fetchDataNota = async () => {
            try {
                const response = await axios.get(
                    `${kasirDataAPI}${idPasien}`
                );
                const responseData = response.data;
                const fetchedData = responseData.data;
                console.log(fetchedData);
                setNota(fetchedData);
                fetchDetailObat(fetchedData[0].nota_id);
                fetchDetailTindakan(fetchedData[0].nota_id);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
    };
    const fetchDetailObat = async (nota_id : any) => {
        console.log("1232131231231");
        console.log(nota_id);
        let totalPricee = 0;
        let totalQuantityy = 0;
        await axios.get(`${detailObatDataAPI}${nota_id}`).then((response) => {
            const responseData = response.data;
            const fetchedData = responseData.data;
            console.log(fetchedData);
            setDetailObat(fetchedData);
            fetchedData.forEach((obat: any) => {
                    totalPricee += obat.Obat.harga * obat.ListObat.jumlah;
                    totalQuantityy += obat.ListObat.jumlah;
            });
        }).catch((error) => {
            console.error("Error fetching data:", error);
        }).finally(() => {
            setTotalPriceObat(totalPricee);
            setTotalQuantityObat(totalQuantityy);
        });
    };
    const fetchDetailTindakan = async (nota_id : any) => {
        console.log("1232131231231");
        console.log(nota_id);
        let totalPricee = 0;
        let totalQuantityy = 0;
        await axios.get(`${detailTindakanDataAPI}${nota_id}`).then((response) => {
            const responseData = response.data;
            const fetchedData = responseData.data;
            console.log(fetchedData);
            setDetailTindakan(fetchedData);
            fetchedData.forEach((tindakan: any) => {
                totalPricee += tindakan.harga_tindakan;
                totalQuantityy += 1;
            });
        }).catch((error) => {
            console.error("Error fetching data:", error);
        }).finally(() => {
            setTotalPriceTindakan(totalPricee);
            setTotalQuantityTindakan(totalQuantityy);
        });
    };


    return (
        <div className="bg-tint6 h-full flex flex-col font-Poppins">
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
            <div data-testid='title' className="ml-10 text-black font-bold text-3xl mt-9" > 
                DETAIL PEMBAYARAN 
            </div>
            <div className="flex flex-row ml-10 mt-5">
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
                                        <p className="text-white font-poppins text-xl font-normal mb-3 ml-3">
                                            {getDate()}
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
                                        <p className="text-white font-poppins text-xl font-normal mb-3 ml-3">
                                            {antrian && <p>{antrian[0].poli}</p>}
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
                                        <p className="text-white font-poppins text-xl font-normal mb-3 ml-3 ">
                                            {pasien && <p>{pasien.no_erm}</p>}
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
                                        <p className="text-white font-poppins text-xl font-normal mb-3 ml-3">
                                        {pasien && <p>{pasien.jenis_kelamin === 'laki-laki' ? 'Tuan' : (pasien.status_perkawinan === 'belum-kawin' ? 'Nona' : 'Nyonya')} {pasien.nama}</p>}
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
                                        <p className="text-white font-poppins text-xl font-normal mb-3 ml-3">
                                            {pasien && <p>{getUsia(pasien.tanggal_lahir)}</p>}
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
                                        <p className="text-white font-poppins text-xl font-normal mb-3 ml-3">
                                            {pasien && <p>{pasien.penjamin}</p>}
                                        </p>
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
                        <table data-testid='table-medicine' className="table-auto text-center w-full ">
                            <thead className=" bg-shade5  ">
                                <tr>
                                    {headObat.map((headObat) => (
                                        <th key={headObat} className="py-3">
                                            {headObat}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-tint4 text-black">
                                {detailObat && detailObat.map((obat: any, index: number) => (
                                    <tr key={index} className="">
                                        <td className="p-2">{index + 1}</td>
                                        <td className="p-2">{obat.Obat.nama_obat}</td>
                                        <td className="p-2">{obat.ListObat.jumlah}</td>
                                        <td className="p-2"><span>Rp</span>{obat.Obat.harga}</td>
                                        <td className="p-2"><span>Rp</span>{obat.Obat.harga * obat.ListObat.jumlah}</td>
                                        <td className="p-2">{obat.ListObat.dosis}</td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                    <div className="rounded-2xl overflow-hidden mt-10">
                        <table data-testid='table-action' className="table-auto text-center w-full ">
                            <thead className=" bg-shade5  ">
                                <tr>
                                    {headTindakan.map((headTindakan) => (
                                        <th key={headTindakan} className="py-3">
                                            {headTindakan}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-tint4 text-black">
                                {detailTindakan && detailTindakan.map((tindakan: any, index: number) => (
                                    <tr key={index} className="">
                                        <td className="p-2">{index + 1}</td>
                                        <td className="p-2">{tindakan.nama_tindakan}</td>
                                        <td className="p-2"><span>Rp</span>{tindakan.harga_tindakan}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-row justify-end">
                        <div className="bg-shade2 mt-7 rounded-2xl w-1/2 px-5 py-5 flex flex-col text-base">
                            <div className="flex flex-row justify-between my-1 ">
                                <div>Items ({totalQuantity} Qyt)</div>
                                <div><span>Rp</span>{totalPrice}</div>
                            </div>
                            <div className="flex flex-row justify-between my-1">
                                <div>Tax (10%)</div>
                                <div><span>Rp</span>{totalPrice*0.1}</div>
                            </div>
                            <div className="flex flex-row justify-between my-1">
                                <div>Metode Pembayaran</div>
                                <div className="w-1/2" data-testid='dropdown-payment'>
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
                                <div data-testid='total-price'>Total</div>
                                <div><span>Rp</span>{totalPrice+totalPrice*0.1}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end my-7">
                            <button data-testid='popup-lanjutkan-pembayaran'className="bg-shade4 w-1/4 px-3 py-3 font-bold rounded-xl items-center hover:bg-shade6" onClick={() => setShowPopup(true)}>
                                Lanjutkan Pembayaran
                            </button>
                    </div>
                </div>
            </div>
            <KonfirmasiPembayaranPopup 
            showPopup={showPopup} 
            setShowPopup={setShowPopup} 
            poli={antrian && antrian.length > 0 ? antrian[0].poli : undefined} 
            noERM={pasien?.no_erm}
            namaPasien={pasien?.nama} 
            metodePembayaran={selectedPembayaran} 
            />
            
        </div>
    );
}
