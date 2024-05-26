"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SMLogo from "../../../public/Logo_Seno_Medika.svg";
import ExpandableContent from "../components/expandableContent";
import SegitigaAtas from "../../../public/segitiga_atas.svg";
import SegitigaBawah from "../../../public/segitiga_bawah.svg";
import Diagnosa from "./diagnosa";
import Resep from "./resep";
import Keur from "./keur";
import Tindakan from "./tindakan";

import Head from "next/head";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface PemeriksaanFisik {
  pemeriksaan_fisik_id: number,
  pemeriksaan_dokter_id: number,
  terapi_yg_sdh_dilakukan: string,
	rencana_tindakan     : string,
	tindakan_keperawatan :  string ,
	observasi           :  string,
	merokok             :  boolean,
	konsumsi_alkohol     :  boolean ,
	kurang_sayur : boolean
}

interface KeadaanFisik {
  pemeriksaanKulit        :    boolean, 
	pemeriksaanKuku          :   boolean, 
	pemeriksaanKepala         :  boolean, 
	pemeriksaanMata            : boolean,
	pemeriksaanTelinga          : boolean,
	pemeriksaanHidungSinus      : boolean,
	pemeriksaanMulutBibir       : boolean,
	pemeriksaanLeher            :boolean,
	pemeriksaanDadaPunggung     : boolean,
	pemeriksaanKardiovaskuler  :  boolean,
	pemeriksaanAbdomenPerut     : boolean,
	pemeriksaanEkstremitasAtas :  boolean,
	pemeriksaanEkstremitasBawah : boolean,
	pemeriksaanGenitaliaPria    : boolean
}

interface Anatomi {
  pasien_id: number,
  pemeriksaan_dokter_id: number,
  bagian_tubuh: string,
  keterangan: string
}

const head = ["No", "Bagian Tubuh", "Keterangan", "Action"];
const head2 = ["Tanggal", "Pemeriksaan", "Keterangan"];

export default function PemeriksaanDokter() {
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const searchParams = useSearchParams();
  const id = searchParams.get("antrianID");

  const antrianAPI = "http://localhost:8080/antrian?find_by=id&target=";
  const additionalDataAPI = "http://localhost:8080/pasien?find_by=id&target=";
  const [data, setData] = useState<any>(null);
  const [pemeriksaanStruct, setPemeriksaanStruct] = useState<any>(null);
  const [pasien, setPasien] = useState<any>(null);
  const [anatomi, setAnatomi] = useState<string>('');
    const [keterangan, setKeterangan] = useState<string>('');

  const [anatomiList, setAnatomiList] = useState<Anatomi[]>([]);
  const [terapi, setTerapi] = useState<string>('');
    const [rencanaTindakan, setRencanaTindakan] = useState<string>('');
    const [tindakanKeperawatan, setTindakanKeperawatan] = useState<string>('');
    const [observasi, setObservasi] = useState<string>('');
    const [merokok, setMerokok] = useState<boolean>(false);
    const [konsumsiAlkohol, setKonsumsiAlkohol] = useState<boolean>(false);
    const [kurangSayur, setKurangSayur] = useState<boolean>(false);


  const [pemeriksaanfisik, setpemeriksaanfisik] = useState<PemeriksaanFisik>({
    pemeriksaan_fisik_id: 0,
    pemeriksaan_dokter_id: (pemeriksaanStruct)?pemeriksaanStruct.pemeriksaan_dokter_id: 0,
    terapi_yg_sdh_dilakukan: '',
    rencana_tindakan     : '',
    tindakan_keperawatan :  '' ,
    observasi           :  '',
    merokok             :  false,
    konsumsi_alkohol     :  false ,
    kurang_sayur : false
  });


  const [keadaanFisik, setKeadaanFisik] = useState<KeadaanFisik>({
    pemeriksaanKulit: false,
    pemeriksaanKuku: false,
    pemeriksaanKepala: false,
    pemeriksaanMata: false,
    pemeriksaanTelinga: false,
    pemeriksaanHidungSinus: false,
    pemeriksaanMulutBibir: false,
    pemeriksaanLeher: false,
    pemeriksaanDadaPunggung: false,
    pemeriksaanKardiovaskuler: false,
    pemeriksaanAbdomenPerut: false,
    pemeriksaanEkstremitasAtas: false,
    pemeriksaanEkstremitasBawah: false,
    pemeriksaanGenitaliaPria: false
  });


  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    switch (name){
      case 'anatomi':
        setAnatomi(value);
        break;
      case 'keterangan':
        setKeterangan(value);
        break;
    }
  }

  const handleInputPemeriksaanFisik = (e: any) => {
    const { name, value } = e.target;
    setpemeriksaanfisik({...pemeriksaanfisik, [name]: value});
  }

  const handleBoolPemeriksaanFisik = (e: any) => {
    const { name, checked, value } = e.target;
    setpemeriksaanfisik({...pemeriksaanfisik, [name]: (value === "ya" && checked)});
  }

    const handleBoolKeadaanFisik = (e: any) => {
        const { name, checked } = e.target;
        setKeadaanFisik({...keadaanFisik, [name]: checked});
    }

  const handleAddAnatomi = () => {
    if (anatomi === '' || keterangan === '') {
        alert('Bagian tubuh dan keterangan tidak boleh kosong');
        return;
    }
    setAnatomiList([...anatomiList, {pasien_id: pemeriksaanStruct.pasien_id, pemeriksaan_dokter_id: pemeriksaanStruct.pemeriksaan_dokter_id ,bagian_tubuh: anatomi, keterangan: keterangan}]);
    setAnatomi('');
    setKeterangan('');
  }

  const deleteLastAnatomi = () => {
    const newAnatomiList = anatomiList.slice(0, anatomiList.length - 1);
    setAnatomiList(newAnatomiList);
  }
  

      
  const handleSave = async(e:any) => {
    e.preventDefault();
    // console.log(diagnosaData);
    // console.log(antrian_id);
    // const diagnosaUpdate = {
    //   antrian_id: antrian_id,
    //   diagnosa: diagnosaData,
    // };
    // const diagnosaToSend = diagnosaData[0];
    // console.log(diagnosaToSend);
    
      try{
        const response = await axios.patch(`http://localhost:8080/pemeriksaan_dokter?update_by=antrian_id&update_type=pemeriksaan_fisik&target=${id}`,pemeriksaanfisik ); {
        console.log(response);
        alert("Pemeriksaan fisik berhasil disimpan");
        }
        const response2 = await axios.patch(`http://localhost:8080/pemeriksaan_dokter?update_by=antrian_id&update_type=keadaan_fisik&target=${id}`,keadaanFisik ); {
          console.log(response2);
          alert("Keadaan fisik berhasil disimpan");
        }
      } catch (error) {
        console.error(error);
      }
    
    
  }

  const handleSavePemeriksaan = async(e:any) => {
    axios.post(`http://localhost:8080/list-anatomi`, anatomiList).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.error("Error fetching data:", error);
    })

    axios.patch(`http://localhost:8080/pemeriksaan_dokter?update_by=antrian_id&update_type=pemeriksaan_fisik&target=${id}`, pemeriksaanfisik).then((response) => {
      console.log(response);
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });

    axios.patch(`http://localhost:8080/pemeriksaan_dokter?update_by=antrian_id&update_type=keadaan_fisik&target=${id}`, keadaanFisik).then((response) => {
      console.log(response);
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
  }

  
  const fetchData = async () => {
    let arr: Array<any> = [];

    try {
      const response = await axios.get(`${antrianAPI}${id}`);
      const data1 = response.data;
      const data = data1.data;
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Data tidak in");
    }
  };

  const getPemeriksaanStruct = async () => {
    await axios.get(`http://localhost:8080/pemeriksaan_dokter?find_by=antrian_id&target=${id}`).then((response) => {
      const data = response.data.data;
      setPemeriksaanStruct(data.pemeriksaan);
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  useEffect(() => {
    fetchData();
    getPemeriksaanStruct();
  }, []);

  const fetchDataPasien = async () => {

    try {
      const response = await axios.get(
        `${additionalDataAPI}${data.pasien_id}`
      );
      const responseData = response.data;
      const fetchedData = responseData.data;
      console.log(fetchedData);
      setPasien(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  
  };

  useEffect(() => {
    fetchDataPasien();
  }, [data]);

  console.log(data);
  console.log(pasien);

  function calculateAge(dateOfBirth: string) {
    const dob = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    const years = age;

    let months;
    if (today.getMonth() < dob.getMonth()) {
      months = 12 - dob.getMonth() + today.getMonth();
    } else {
      months = today.getMonth() - dob.getMonth();
    }

    if (today.getDate() < dob.getDate()) {
      months--;
    }

    let days;
    if (today.getDate() < dob.getDate()) {
      const tempDate = new Date(today.getFullYear(), today.getMonth(), 0);
      const daysInMonth = tempDate.getDate();
      days = daysInMonth - dob.getDate() + today.getDate();
    } else {
      days = today.getDate() - dob.getDate();
    }
    
    return { years, months, days };
  }

  const tabs: Tab[] = [
    {
      title: "Diagnosa",
      content: <Diagnosa />,
    },
    {
      title: "Resep",
      content: <Resep />,
    },
    // {
    //   title: "Keur",
    //   content: <Keur tanggal="23/04/2024" dokter="dr. Upin" />,
    // },
    // {
    //   title: "Tindakan",
    //   content: <Tindakan />,
    // },
  ];

  return (
    <div className=" bg-tint6 min-h-screen flex flex-col font-Poppins">
      <div className="flex mr-20 mt-14 bg-tint6">
        <div>
          <Image
            src={SMLogo}
            alt="Logo Seno Medika"
            className="w-32 h-32 ml-28"
          />
        </div>
        <div className="ml-auto">
          <button className="px-12 py-4 bg-gray-100 rounded-[51px] shadow flex-col justify-start inline-flex hover:bg-slate-200">
            <p className="text-neutral-900 text-2xl font-semibold font-Poppins leading-9">
              dr. Upin
            </p>
            <p className="text-gray-700 text-xl font-normal font-Poppins">
              Dokter
            </p>
          </button>
        </div>
      </div>

      <div className=" flex flex-row ml-10 mt-14 font-Poppins">
        <div className=" bg-shade2 rounded-3xl px-10 py-10 mr-14 mb-5 h-fit">
          <div className=" mb-7 text-3xl font-Poppins font-semibold leading-10">
            Data Pasien
          </div>
          <table>
            <tbody>
              <tr>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    Tanggal
                  </p>
                </td>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    {data?.created_at}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    Poli
                  </p>
                </td>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    {data?.poli}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    No eRM
                  </p>
                </td>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    {pasien?.no_erm}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    NIK
                  </p>
                </td>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    {pasien?.nik}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    Nama Pasien
                  </p>
                </td>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    {pasien && <p>{pasien.jenis_kelamin === 'laki-laki' ? 'Tuan' : (pasien.status_perkawinan === 'belum-kawin' ? 'Nona' : 'Nyonya')} {pasien.nama}</p>}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    Usia
                  </p>
                </td>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                  {pasien && (
                        <p>
                          {calculateAge(pasien.tanggal_lahir).years} tahun{" "}
                          {calculateAge(pasien.tanggal_lahir).months} bulan{" "}
                          {calculateAge(pasien.tanggal_lahir).days} hari{" "}
                        </p>
                      )}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mr-9 mb-3">
                    Golongan Darah
                  </p>
                </td>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    {pasien?.golongan_darah}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    Penjamin
                  </p>
                </td>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    {pasien?.penjamin}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    Alamat
                  </p>
                </td>
                <td>
                  <p className="text-white font-Poppins text-xl font-normal mb-3">
                    {pasien?.alamat}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <form className="mr-10 flex-grow" onSubmit={(e) => e.preventDefault()}>
          <div className=" flex flex-row w-full h-16">
            <div className=" bg-tint3 flex-grow flex flex-row">
              <div className="w-72 text-black text-2xl font-semibold leading-10 ml-8 flex flex-row items-center">
                Pemeriksaan Fisik
              </div>
              <button
                className=" flex flex-row items-center ml-auto mr-12"
                onClick={() => setShowPopup1(!showPopup1)}
              >
                <div className=" w-44 text-black text-l font-semibold leading-9 text-right mr-2">
                  {showPopup1 ? "Sembunyikan" : "Tampilkan"}
                </div>
                <Image
                  src={showPopup1 ? SegitigaAtas : SegitigaBawah}
                  alt={showPopup1 ? "Segitiga Atas" : "Segitiga Bawah"}
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
          <ExpandableContent
            isExpanded={showPopup1}
            onClose={() => setShowPopup1(false)}
          >
            <div className=" bg-tint7 px-5 py-8">
              <div className="flex flex-row justify-between items-center mb-4">
                <label
                  htmlFor="terapi_yg_sdh_dilakukan"
                  className="w-1/3 pl-4 mb-1 text-l text-black font-Poppins font-semibold"
                >
                  Terapi yang sudah dilakukan pasien
                </label>
                <textarea
                  name="terapi_yg_sdh_dilakukan"
                  id="terapi_yg_sdh_dilakukan"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-shade1 text-shade7"
                  placeholder="Terapi"
                    onChange={handleInputPemeriksaanFisik}
                    value={pemeriksaanfisik.terapi_yg_sdh_dilakukan}
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label
                  htmlFor="rencana_tindakan"
                  className="w-1/3 pl-4 mb-1 text-l text-black font-Poppins font-semibold"
                >
                  Rencana Tindakan
                </label>
                <textarea
                  name="rencana_tindakan"
                  id="rencana_tindakan"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-shade1 text-shade7"
                  placeholder="Rencana Tindakan"
                    onChange={handleInputPemeriksaanFisik}
                    value={pemeriksaanfisik.rencana_tindakan}
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label
                  htmlFor="tindakan_keperawatan"
                  className="w-1/3 pl-4 mb-1 text-l text-black font-Poppins font-semibold"
                >
                  Tindakan Keperawatan
                </label>
                <textarea
                  name="tindakan_keperawatan"
                  id="tindakan_keperawatan"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-shade1 text-shade7"
                  placeholder="Tindakan Keperawatan"
                    onChange={handleInputPemeriksaanFisik}
                    value={pemeriksaanfisik.tindakan_keperawatan}
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label
                  htmlFor="observasi"
                  className="w-1/3 pl-4 mb-1 text-l text-black font-Poppins font-semibold"
                >
                  Observasi
                </label>
                <textarea
                  name="observasi"
                  id="observasi"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-shade1 text-shade7"
                  placeholder="Observasi"
                    onChange={handleInputPemeriksaanFisik}
                    value={pemeriksaanfisik.observasi}
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 pl-4 mb-1 text-l text-black font-Poppins font-semibold">
                  Merokok
                </label>
                <div className="w-2/3 flex flex-row gap-10 items-center">
                  <div className="flex items-center">
                    <input type="radio" id="ya" name="merokok" value="ya" onChange={handleBoolPemeriksaanFisik}  />
                    <label
                      htmlFor="ya"
                      className="text-black font-Poppins font-normal ml-4"
                    >
                      Ya
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="tidak"
                      name="merokok"
                      value="tidak"
                    />
                    <label
                      htmlFor="tidak"
                      className="text-black font-Poppins font-normal ml-4"
                    >
                      Tidak
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 pl-4 mb-1 text-l text-black font-Poppins font-semibold">
                  Konsumsi alkohol
                </label>
                <div className="w-2/3 flex flex-row gap-10 items-center">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="ya"
                      name="konsumsi_alkohol"
                      value="ya"
                        onChange={handleBoolPemeriksaanFisik}
                    />
                    <label
                      htmlFor="ya"
                      className="text-black font-Poppins font-normal ml-4"
                    >
                      Ya
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="tidak"
                      name="konsumsi_alkohol"
                      value="tidak"
                    />
                    <label
                      htmlFor="tidak"
                      className="text-black font-Poppins font-normal ml-4"
                    >
                      Tidak
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 pl-4 mb-1 text-l text-black font-Poppins font-semibold">
                  Kurang sayur/ buah
                </label>
                <div className="w-2/3 flex flex-row gap-10 items-center">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="ya"
                      name="kurang_sayur"
                      value="ya"
                        onChange={handleBoolPemeriksaanFisik}
                    />
                    <label
                      htmlFor="ya"
                      className="text-black font-Poppins font-normal ml-4"
                    >
                      Ya
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="tidak"
                      name="kurang_sayur"
                      value="tidak"
                    />
                    <label
                      htmlFor="tidak"
                      className="text-black font-Poppins font-normal ml-4"
                    >
                      Tidak
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-tint6 p-2">
                  <label className="text-black font-bold text-xl">
                    Anatomi Tubuh
                  </label>
                  <div className="flex flex-row justify-between items-center mb-4">
                    <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
                      Bagian Tubuh
                      <span className="text-[#D66A63]"> *</span>
                    </label>
                    <input
                        name="anatomi"
                        onChange={handleInputChange}
                        value={anatomi}
                        required
                        placeholder="Masukkan nama bagian tubuh"
                        className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border border-shade1 rounded-2xl"
                    />
                    </div>
                </div>
                <div className="bg-tint6 p-2">
                  <div className="flex flex-row justify-between items-center mb-4">
                    <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
                      Keterangan
                      <span className="text-[#D66A63]"> *</span>
                    </label>
                    <textarea
                        name="keterangan"
                        id="keterangan"
                        className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-shade1 text-shade7"
                        placeholder="Keterangan"
                        onChange={handleInputChange}
                        value={keterangan}
                    />
                  </div>
                </div>
                <div className='bg-tint6 flex justify-end pb-10 pr-2'>
                  <button className="w-1/3 h-10 bg-primary1 text-white rounded-md font-Poppins font-semibold" onClick={handleAddAnatomi}>
                    Tambah
                  </button>
                </div>
                <table className="w-full min-w-max table-auto text-center text-black  ">
                  <thead>
                    <tr>
                      {head.map((head) => (
                        <th key={head} className="px-4 py-2 bg-tint4">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                    <tbody>
                        {anatomiList.map((anatomi, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{anatomi.bagian_tubuh}</td>
                            <td className="border border-gray-300 px-4 py-2">{anatomi.keterangan}</td>
                            <td className="border border-gray-300 px-4 py-2"><input type="checkbox"/></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <button className="bg-[#D66A63] px-3 py-2 hover:bg-[#A93B3B] font-normal rounded-xl" onClick={deleteLastAnatomi}>Hapus</button>
                <p></p>
              </div>
              <div className="p-2">
                <label className="text-black font-bold text-xl">
                  Keadaan Fisik
                </label>
                <div className="flex flex-row justify-between mb-4">
                  <div className="w-1/2 flex flex-col justify-between mb-4">
                    <div>
                      <input
                        type="checkbox"
                        value="ya"
                        id="pemeriksaan_kulit"
                        name="pemeriksaan_kulit"
                        onChange={handleBoolKeadaanFisik}
                      />
                      <label
                        htmlFor="pemeriksaan_kulit"
                        className="text-black font-Poppins font-normal ml-4"
                      >
                        Pemeriksaan Kulit
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="ya"
                        id="pemeriksaan_kuku"
                        name="pemeriksaan_kuku"
                        onChange={handleBoolKeadaanFisik}
                      />
                      <label
                        htmlFor="pemeriksaan_kuku"
                        className="text-black font-Poppins font-normal ml-4"
                      >
                        Pemeriksaan Kuku
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="ya"
                        id="pemeriksaan_kepala"
                        name="pemeriksaan_kepala"
                        onChange={handleBoolKeadaanFisik}
                      />
                      <label
                        htmlFor="pemeriksaan_kepala"
                        className="text-black font-Poppins font-normal ml-4"
                      >
                        Pemeriksaan Kepala
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="ya"
                        id="pemeriksaan_mata"
                        name="pemeriksaan_mata"
                        onChange={handleBoolKeadaanFisik}
                      />
                      <label
                        htmlFor="pemeriksaan_mata"
                        className="text-black font-Poppins font-normal ml-4"
                      >
                        Pemeriksaan Mata
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="ya"
                        id="pemeriksaan_telinga"
                        name="pemeriksaan_telinga"
                        onChange={handleBoolKeadaanFisik}
                      />
                      <label
                        htmlFor="pemeriksaan_telinga"
                        className="text-black font-Poppins font-normal ml-4"
                      >
                        Pemeriksaan Telinga
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="ya"
                        id="pemeriksaan_hidung_sinus"
                        name="pemeriksaan_hidung_sinus"
                        onChange={handleBoolKeadaanFisik}
                      />
                      <label
                        htmlFor="pemeriksaan_hidung_sinus"
                        className="text-black font-Poppins font-normal ml-4"
                      >
                        Pemeriksaan Hidung dan Sinus
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="ya"
                        id="pemeriksaan_mulut_bibir"
                        name="pemeriksaan_mulut_bibir"
                        onChange={handleBoolKeadaanFisik}
                      />
                      <label
                        htmlFor="pemeriksaan_mulut_bibir"
                        className="text-black font-Poppins font-normal ml-4"
                      >
                        Pemeriksaan Mulut dan Bibir
                      </label>
                    </div>
                  </div>
                  <div className="flex-grow">

                  </div>
                  <div className="flex flex-col justify-between mb-4 w-1/2">
                    <div>
                      <input
                        type="checkbox"
                        value="ya"
                        id="pemeriksaan_leher"
                        name="pemeriksaan_leher"
                        onChange={handleBoolKeadaanFisik}
                      />
                      <label
                        htmlFor="pemeriksaan_leher"
                        className="text-black font-Poppins font-normal ml-4"
                      >
                        Pemeriksaan Leher
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="ya"
                        id="pemeriksaan_dada_punggung"
                        name="pemeriksaan_dada_punggung"
                        onChange={handleBoolKeadaanFisik}
                      />
                      <label
                        htmlFor="pemeriksaan_dada_punggung"
                        className="text-black font-Poppins font-normal ml-4"
                      >
                        Pemeriksaan Dada dan Punggung
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="ya"
                        id="pemeriksaan_kardiovaskuler"
                        name="pemeriksaan_kardiovaskuler"
                        onChange={handleBoolKeadaanFisik}
                      />
                      <label
                        htmlFor="pemeriksaan_kardiovaskuler"
                        className="text-black font-Poppins font-normal ml-4"
                      >
                        Pemeriksaan Kardiovaskuler
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="ya"
                        id="pemeriksaan_abdomen_perut"
                        name="pemeriksaan_abdomen_perut"
                        onChange={handleBoolKeadaanFisik}
                      />
                      <label
                        htmlFor="pemeriksaan_abdomen_perut"
                        className="text-black font-Poppins font-normal ml-4"
                      >
                        Pemeriksaan Abdomen Perut
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="ya"
                        id="pemeriksaan_ekstremitas_atas"
                        name="pemeriksaan_ekstremitas_atas"
                        onChange={handleBoolKeadaanFisik}
                      />
                      <label
                        htmlFor="pemeriksaan_ekstremitas_atas"
                        className="text-black font-Poppins font-normal ml-4"
                      >
                        Pemeriksaan Ekstremitas Atas <br />
                        (Bahu, Siku, Tangan)
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="ya"
                        id="pemeriksaan_ekstremitas_bawah"
                        name="pemeriksaan_ekstremitas_bawah"
                        onChange={handleBoolKeadaanFisik}
                      />
                      <label
                        htmlFor="pemeriksaan_ekstremitas_bawah"
                        className="text-black font-Poppins font-normal ml-4"
                      >
                        Pemeriksaan Ekstermitas Bawah <br /> (Panggul, Lutut,
                        Pergelangan Kaki dan Telapak Kaki)
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="ya"
                        id="pemeriksaan_genitalia_pria"
                        name="pemeriksaan_genitalia_pria"
                        onChange={handleBoolKeadaanFisik}
                      />
                      <label
                        htmlFor="pemeriksaan_genitalia_pria"
                        className="text-black font-Poppins font-normal ml-4"
                      >
                        Pemeriksaan Genitilia Pria
                      </label>
                    </div>
                  </div>
                </div>
                <table className="w-full min-w-max table-auto text-center text-black bg-tint4 ">
                  <thead>
                    <tr>
                      {head2.map((head) => (
                        <th key={head} className="px-4 py-2">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                </table>
                <div className='flex justify-end mt-20'>
                  <button className="w-1/3 h-10 mt-4 bg-primary1 text-white rounded-md font-Poppins font-semibold" onClick={handleSavePemeriksaan}>
                      Simpan Pemeriksaan Fisik
                  </button>
              </div>
              </div>
            </div>

            <div className=" bg-tint3">
              <button
                className=" flex flex-row items-center ml-auto mr-12"
                onClick={() => setShowPopup1(!showPopup1)}
              >
                <div className=" w-44 text-black text-l font-semibold leading-9 text-right mr-2">
                  {showPopup1 ? "Sembunyikan" : "Tampilkan"}
                </div>
                <Image
                  src={showPopup1 ? SegitigaAtas : SegitigaBawah}
                  alt={showPopup1 ? "Segitiga Atas" : "Segitiga Bawah"}
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </ExpandableContent>

          <div className=" flex flex-row w-full h-16 mt-8">
            <div className=" bg-tint3 flex-grow flex flex-row">
              <div className="w-72 text-black text-2xl font-semibold leading-10 ml-8 flex flex-row items-center">
                Riwayat Pengobatan
              </div>
              <button
                className=" flex flex-row items-center ml-auto mr-12"
                onClick={() => setShowPopup2(!showPopup2)}
              >
                <div className=" w-44 text-black text-l font-semibold leading-9 text-right mr-2">
                  {showPopup2 ? "Sembunyikan" : "Tampilkan"}
                </div>
                <Image
                  src={showPopup2 ? SegitigaAtas : SegitigaBawah}
                  alt={showPopup2 ? "Segitiga Atas" : "Segitiga Bawah"}
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
          <ExpandableContent
            isExpanded={showPopup2}
            onClose={() => setShowPopup2(false)}
          >
            <div>
              <div className=" text-black">
                <div className=" mt-2">
                  <div>
                    {tabs.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className="text-whit px-10 py-3"
                        style={{
                          fontWeight: "bold",
                          backgroundColor:
                            activeTab === index ? "#EDF4F2" : "#95BEAF",
                          color: activeTab === index ? "#000000" : "#46846E",
                        }}
                      >
                        {tab.title}
                      </button>
                    ))}
                  </div>
                  <div className=" bg-tint7">{tabs[activeTab].content}</div>
                </div>
              </div>
            </div>
          </ExpandableContent>
        </form>
      </div>
    </div>
  );
}
