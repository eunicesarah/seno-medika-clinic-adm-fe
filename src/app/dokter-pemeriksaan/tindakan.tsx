import React, { useEffect, useState } from "react";
import CustomDatePicker from "../../components/Datepicker";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface Tindakan {
  jenis_tindakan: string;
  prosedur_tindakan: string;
  jumlah: number;
  keterangan: string;
  tanggal_tindakan: string;
  harga: number;
  indikasi_tindakan: string;
  tujuan: string;
  risiko: string;
  komplikasi: string;
  alternatif_risiko: string;
}
interface ValidationErrors {
  [key: string]: string;
}
export default function Tindakan() {
  const searchParams = useSearchParams();
  const antrian_id = searchParams.get("antrianID");
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState<ValidationErrors>({}); 
  const [tindakanData, setTindakanData] = useState<Tindakan[]>([]);
  const [tindakanOne, setTindakanOne] = useState<Tindakan>({
    jenis_tindakan: "",
    prosedur_tindakan: "",
    jumlah: 0,
    keterangan: "",
    tanggal_tindakan: "",
    harga: 0,
    indikasi_tindakan: "",
    tujuan: "",
    risiko: "",
    komplikasi: "",
    alternatif_risiko: "",
  });

  const validateForm = () => {
    let err: ValidationErrors = {};
    let isValid = true;

    if (!tindakanOne.jenis_tindakan) {
      isValid = false;
      err.jenis_tindakan = "Jenis Tindakan is required";
    }
    if (!tindakanOne.jumlah) {
      isValid = false;
      err.jumlah = "Jumlah is required";
    }
    if (!tindakanOne.harga) {
      isValid = false;
      err.harga = "Harga is required";
    }
    setErrors(err);
    return isValid;
  }


  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setTindakanOne({
      ...tindakanOne,
      [name]: value,
    });
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setTindakanData(
      tindakanData.map((tindakan) => ({
        ...tindakan,
        tanggal_tindakan: date,
      }))
    );
  };
  

  const removeTindakan = (index: number) => {
    const newTindakanData = tindakanData.filter((_, i) => i !== index);
    setTindakanData(newTindakanData);
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    console.log("Jenis Tindakan " + tindakanOne.jenis_tindakan);
    console.log("Prosedur Tindakan " + tindakanOne.prosedur_tindakan);
    console.log("Jumlah " + tindakanOne.jumlah);
    console.log("Keterangan " + tindakanOne.keterangan);
    console.log("Tanggal Rencana " + selectedDate);
    console.log("Harga " + tindakanOne.harga);
    console.log("Indikasi Tindakan " + tindakanOne.indikasi_tindakan);
    console.log("Tujuan " + tindakanOne.tujuan);
    console.log("Risiko " + tindakanOne.risiko);
    console.log("Komplikasi " + tindakanOne.komplikasi);
    console.log("Alternatif & Risiko " + tindakanOne.alternatif_risiko);
    console.log("Antrian ID " + antrian_id);

    const formIsValid  = await validateForm();
    if(formIsValid){
      try{
        console.log("masukk");
      }catch(error){
        console.error("Error fetching tindakan data:", error);
      }
    }
  }

  return (
    <div className="flex flex-col w-full pt-12 pl-6 pr-10 pb-10 mb-14 rounded-md ">
      <div className="flex flex-row justify-between items-center mb-4">
        <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
          Jenis Tindakan
          <span className="text-[#D66A63]"> *</span>
        </label>
        <input
          onChange={handleInputChange}
          name="jenis_tindakan"
          required
          placeholder="Masukkan Jenis Tindakan"
          className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
        />
      </div>
      {errors.jenis_tindakan && <p className="text-[#D66A63]">{errors.jenis_tindakan}</p>}
      <div className="flex flex-row justify-between items-center mb-4">
        <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
          Prosedur Tindakan
        </label>
        <input
          onChange={handleInputChange}
          name="prosedur_tindakan"
          placeholder="Masukkan Prosedur Tindakan"
          className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
        />
      </div>
      <div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Jumlah
            <span className="text-[#D66A63]"> *</span>
          </label>
          <input
            onChange={handleInputChange}
            name="jumlah"
            required
            placeholder="Masukkan Jumlah"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        {errors.jumlah && <p className="text-[#D66A63]">{errors.jumlah}</p>}
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Keterangan
          </label>
          <input
            onChange={handleInputChange}
            name="keterangan"
            placeholder="Masukkan Keterangan"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Tanggal Rencana
          </label>
          <CustomDatePicker
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            className="w-2/3"
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Harga <span className="text-[#D66A63]"> *</span>
          </label>
          <input
            onChange={handleInputChange}
            name="harga"
            placeholder="Masukkan Harga"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        {errors.harga && <p className="text-[#D66A63]">{errors.harga}</p> }
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Indikasi Tindakan
          </label>
          <input
            onChange={handleInputChange}
            name="indikasi_tindakan"
            placeholder="Masukkan Indikasi Tindakan"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Tujuan
          </label>
          <input
            onChange={handleInputChange}
            placeholder="Masukkan Tujuan"
            name="tujuan"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Risiko
          </label>
          <input
            onChange={handleInputChange}
            name="risiko"
            placeholder="Masukkan Risiko"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Komplikasi
          </label>
          <input
            onChange={handleInputChange}
            name="komplikasi"
            placeholder="Masukkan Komplikasi"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Alternatif & Risiko
          </label>
          <input
            onChange={handleInputChange}
            name="alternatif_risiko"
            placeholder="Masukkan Alternatif & Risiko"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        <div className="flex flex-col justify-between items-center my-3 gap-4 w-full">
              {tindakanData.map((tindakan, index) => (
                <div key={index} className="w-full">
                  <hr className="h-px bg-shade6 border-0 w-full" />
                  <div className="flex justify-between items-center w-full">
                    <div className="flex-grow">
                      <p className="font-bold">{tindakan.jenis_tindakan}</p>
                      <p>Jumlah: {tindakan.jumlah}</p>
                      <p>Keterangan: {tindakan.keterangan}</p>
                      <p>Indikasi Tindakan: {tindakan.indikasi_tindakan}</p>
                      <p>Tujuan: {tindakan.tujuan}</p>
                      <p>Risiko: {tindakan.risiko}</p>
                      <p>Komplikasi: {tindakan.komplikasi}</p>
                      <p>Alternatif: {tindakan.alternatif_risiko}</p>
                    </div>
                    <button className="w-10 h-10" onClick={() => removeTindakan(index)}>
                      {/* <Image src={RemoveButton} alt="Remove Button" /> */}
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
        <div>
          <button className="w-1/3 h-10 mt-4 bg-primary1 text-white rounded-md font-Poppins font-semibold " onClick={handleSave}>
            Simpan Tindakan
          </button>
        </div>
      </div>
    </div>
  );
}
