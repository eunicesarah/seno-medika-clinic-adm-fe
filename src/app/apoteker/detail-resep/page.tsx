"use client";
import { IoMdArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from 'next/navigation'

const head = [
    "No",
    "Obat",
    "Satuan",
    "Sisa Stok",
    "Jumlah",
    "Dosis",
    "Aturan Pakai",
    "Keterangan",
];

export default function DetailResep() {
    const searchParams = useSearchParams();
    const idPasien = searchParams.get('pasien_id');
    const [showPopup, setShowPopup] = useState(false);
    const [pasien, setPasien] = useState<any>(null);
    const [antrian, setAntrian] = useState<any>(null);
    const [nota, setNota] = useState<any>(null);
    const [detailObat, setDetailObat] = useState<any>(null);


    const pasienDataApi = "http://localhost:8080/pasien?find_by=id&target=";
    const antrianDataAPI = "http://localhost:8080/antrian?find_by=pasienId&target=";
    const detailObatDataAPI = "http://localhost:8080/apotek?find_by=detail_antrian&target=";

   
      
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
    
    const fetchDetailObat = async (nota_id : any) => {
        console.log(nota_id);
        await axios.get(`${detailObatDataAPI}${nota_id}`).then((response) => {
            const responseData = response.data;
            const fetchedData = responseData.data;
            console.log(fetchedData);
            setDetailObat(fetchedData);
            console.log(detailObat);
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    };
    
    useEffect(() => {
        fetchDataPasien();
        fetchDataAntrian();
        fetchDetailObat(idPasien);
      }, []);
    
      const handleBackButton = () => {
        window.location.href = `/apoteker/dashboard`;
      }
    //TODO : Add popup component
    //TODO : Add button tidak diambil
    //TODO : Add button selesai
    const handleUpdateStockObat = async (obat_id: number, nama_obat:string, jenis_asuransi: string, harga: number, satuan:string, jumlahObat: number) => {
        try {
            const jumlah = {
                nama_obat: nama_obat,
                stock: jumlahObat,
                jenis_asuransi: jenis_asuransi,
                harga: harga,
                satuan: satuan,

            }
            console.log(jumlah);
            const response = await axios.put(
              `http://localhost:8080/obat?update_by=id&target=${obat_id}`,
            jumlah
        
            );
            console.log(response);
          }
            catch (error) {
                console.error("Error fetching data:", error);
            }
      }

    const handleSelesaiButton =  () => {

        const obatArray = detailObat.map((obat:any) => ({
            obat_id: obat.Obat.obat_id,
            nama_obat: obat.Obat.nama_obat,
            jenis_asuransi: obat.Obat.jenis_asuransi,
            harga: obat.Obat.harga,
            stock: obat.Obat.stock,
            satuan: obat.Obat.satuan,
            jumlah: obat.ListObat.jumlah,
          }));
        console.log(obatArray);
        obatArray.forEach((item:any) => {
            const newStock = item.stock - item.jumlah;
            console.log(newStock);
            handleUpdateStockObat(item.obat_id, item.nama_obat, item.jenis_asuransi, item.harga, item.satuan, newStock);
          });
    }

    return (
        <div className="bg-tint6 w-screen h-screen flex flex-col font-Poppins">
            <div className="flex flex-row justify-between items-center ml-10"> 
                <div className="flex flex-row text-black font-bold ">
                            <IoMdArrowBack className="mr-2 text-4xl" />
                            <button className="  underline underline-offset-2 text-xl" onClick={handleBackButton}>
                                Kembali ke Dashboard
                            </button>
                </div>
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
            </div>
            <div data-testid='title' className="font-Poppins ml-16 mt-8 mb-5 font-bold h-11 w-auto text-3xl text-shade6" > 
                DETAIL RESEP
            </div>
            <div className=" flex flex-row w-1/5 ml-10 mr-5 text-center bg-shade2 rounded-2xl px-7 py-3">
                        <p className="text-white font-poppins text-xl font-normal">
                            Nama Pasien :
                        </p>
                        <p className="text-white font-poppins text-xl font-normal ml-3">
                            {pasien && <p>{pasien.jenis_kelamin === 'laki-laki' ? 'Tuan' : (pasien.status_perkawinan === 'belum-kawin' ? 'Nona' : 'Nyonya')} {pasien.nama}</p>}
                         </p>
            </div>
            <div className="flex flex-row min-h-96 mt-5">
                
                <div className="w-full ml-10 mr-10 flex flex-col ">
                    <div className="rounded-2xl overflow-hidden">
                        <table data-testid='table-medicine' className="w-full min-w-max table-auto text-center">
                            <thead className=" bg-shade5  ">
                                <tr>
                                    {head.map((head) => (
                                        <th key={head} className="py-3">
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-tint4 text-black">
                                {detailObat && detailObat.map((obat: any, index: number) => (
                                    <tr key={index} className="">
                                        <td className="p-2">{index + 1}</td>
                                        <td className="p-2">{obat.Obat.nama_obat}</td>
                                        <td className="p-2">{obat.Obat.satuan}</td>
                                        <td className="p-2">{obat.Obat.stock}</td>
                                        <td className="p-2">{obat.ListObat.jumlah}</td>
                                        <td className="p-2">{obat.ListObat.dosis}</td>
                                        <td className="p-2">{obat.ListObat.aturan_pakai}</td>
                                        <td className="p-2">{obat.ListObat.keterangan}</td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                   
                    
                </div>
            </div>  
            <div className="flex flex-row ml-10 mr-10 justify-between ">
                <div className="flex my-7">
                    <button data-testid='popup-lanjutkan-pembayaran'className="bg-cancel px-3 py-3 font-bold rounded-xl items-center hover:bg-cancel" onClick={() => setShowPopup(true)}>
                        Tidak Diambil
                    </button>
                </div>
                <div className="flex  my-7">
                    <button data-testid='popup-lanjutkan-pembayaran'className="bg-shade4  px-3 py-3 font-bold rounded-xl items-center hover:bg-shade6" onClick={() => handleSelesaiButton()}>
                        Selesai
                    </button>
                </div>
            </div>
            
        </div>
    );
}
