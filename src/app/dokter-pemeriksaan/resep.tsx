import React, { useEffect, useState } from "react";
import Dropdown from "../components/dropdown";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface Resep {
  ruang_tujuan: string;
  status_obat: string;
  nama_obat: string;
  jumlah: number;
  dosis: string;
  aturan_pakai: string;
  harga: number;
  keterangan: string;
}

export default function Resep() {
  const searchParams = useSearchParams();
  const antrian_id = searchParams.get("antrianID");
  const [resepData, setResepData] = useState<Resep[]>([]);
  const [ruangTujuan, setRuangTujuan] = useState("");
  const [statusObat, setStatusObat] = useState("");
  const [namaObat, setNamaObat] = useState("");
  const [jumlah, setJumlah] = useState(0);
  const [dosis, setDosis] = useState("");
  const [aturanPakai, setAturanPakai] = useState("");
  const [harga, setHarga] = useState(0);
  const [keterangan, setKeterangan] = useState("");
  const [resepOne, setResepOne] = useState<Resep>({
    ruang_tujuan: "",
    status_obat: "",
    nama_obat: "",
    jumlah: 0,
    dosis: "",
    aturan_pakai: "",
    harga: 0,
    keterangan: "",
  });
  const ruangTujuanOpt = [{ label: "Apotek", value: "Apotek" }];
  const statusObatOpt = [
    { label: "Belum Dikirim", value: "Belum Dikirim" },
    { label: "Sudah Dikirim", value: "Sudah Dikirim" },
  ];

  const fetchObat = async () => {
    try {
      const response = await axios.get("http://localhost:8080/obat");
      const obat = response.data.data;
      console.log(obat);
      const options = obat.map((obat: { obat_id: any; nama_obat: any }) => ({
        label: obat.nama_obat,
        value: obat.obat_id,
      }));
      setNamaObat(options);
    } catch (error) {
      console.error("Error fetching obat data:", error);
    }
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setResepOne({
      ...resepOne,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchObat();
  }, []);

  const handleObatDropdown = (value: any) => {
    setNamaObat(value);
  };

  const removeObat = (index: number) => {
    const newResepData = resepData.filter((_, i) => i !== index);
    setResepData(newResepData);
    console.log(resepData);
  };

  const addResep = () => {
    const newResepData: Resep = {
      ruang_tujuan: ruangTujuan,
      status_obat: statusObat,
      nama_obat: namaObat,
      jumlah: jumlah,
      dosis: dosis,
      aturan_pakai: aturanPakai,
      harga: harga,
      keterangan: keterangan,
    };
    setResepData([...resepData, newResepData]);
    console.log(resepData);
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    console.log("Ruang Tujuan: " + ruangTujuan);
    console.log("Status Obat: " + statusObat);
    console.log("Nama Obat: " + namaObat);
    console.log("Jumlah: " + resepOne.jumlah);
    console.log("Dosis: " + resepOne.dosis);
    console.log("Aturan Pakai: " + resepOne.aturan_pakai);
    console.log("Harga: " + resepOne.harga);
    console.log("Keterangan: " + resepOne.keterangan);
    console.log("Resep: " + resepData);
    console.log("Antrian ID: " + antrian_id);
    const resepUpdate = {
      antrian_id: antrian_id,
      resep: resepOne,
    };
    const resepToSend = resepOne;
    console.log("send " + resepToSend);
    // try{
    //     const response = await axios.post(`http://localhost:8080/resep`, resepOne);
    //     console.log(response);
    //     alert("Resep berhasil disimpan");
    // } catch (error) {
    //     console.error("Error saving resep:", error);
    // }
  };

  const removeResep = (index: number) => {
    const newResepData = resepData.filter((_, i) => i !== index);
    setResepData(newResepData);
    console.log(resepData);
  };
  return (
    <div className="flex flex-col w-full pt-12 pl-6 pr-10 pb-10 mb-14 rounded-md ">
      <div className="flex flex-row justify-between items-center mb-4">
        <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
          Ruang Tujuan
          <span className="text-[#D66A63]"> *</span>
        </label>
        <Dropdown
          id="ruang_tujuan"
          name="ruang_tujuan"
          className="w-2/3"
          options={ruangTujuanOpt}
          value={ruangTujuan}
          onSelect={(selectedOption: any) =>
            setRuangTujuan(selectedOption.value)
          }
          placeholder="Pilih Ruang Tujuan"
          data-testid="ruang_tujuan"
          required
        />
      </div>
      <div className="flex flex-row justify-between items-center mb-4">
        <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
          Status Obat
          <span className="text-[#D66A63]"> *</span>
        </label>
        <Dropdown
          id="status_obat"
          name="status_obat"
          className="w-2/3"
          options={statusObatOpt}
          value={statusObat}
          onSelect={(selectedOption: any) =>
            setStatusObat(selectedOption.value)
          }
          placeholder="Status Obat"
          data-testid="status_obat"
          required
        />
      </div>
      <div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Nama Obat
            <span className="text-[#D66A63]"> *</span>
          </label>
          <Dropdown
            id="nama_obat"
            className="w-2/3"
            options={namaObat}
            onSelect={handleObatDropdown}
            name="nama_obat"
            placeholder="Nama Obat"
            data-testid="nama_obat"
            required
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Jumlah
            <span className="text-[#D66A63]"> *</span>
          </label>
          <input
            name="jumlah"
            onChange={handleInputChange}
            required
            placeholder="Masukkan Jumlah"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Dosis
            <span className="text-[#D66A63]"> *</span>
          </label>
          <input
            name="dosis"
            onChange={handleInputChange}
            required
            placeholder="Masukkan Dosis Obat"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Aturan Pakai
          </label>
          <input
            name="aturan_pakai"
            onChange={handleInputChange}
            placeholder="Masukkan Aturan Pakai"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Harga
          </label>
          <input
            name="harga"
            onChange={handleInputChange}
            placeholder="Masukkan Harga"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Keterangan
          </label>
          <input
            name="keterangan"
            onChange={handleInputChange}
            placeholder="Masukkan Keterangan"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        <div className="flex flex-col justify-between items-center my-3 gap-4 w-full">
          {resepData.map((resep, index) => (
            <div key={index} className="w-full">
              <hr className="h-px bg-shade6 border-0 w-full" />
              <div className="flex justify-between items-center w-full">
                <div className="flex-grow">
                  <p className="font-bold">{resep.nama_obat}</p>
                  <p>Jumlah: {resep.jumlah}</p>
                  <p>Dosis: {resep.dosis}</p>
                  <p>Aturan Pakai: {resep.aturan_pakai}</p>
                  <p>Harga: {resep.harga}</p>
                  <p>Keterangan: {resep.keterangan}</p>
                </div>
                <button
                  className="w-10 h-10"
                  onClick={() => removeResep(index)}
                >
                  {/* <Image src={RemoveButton} alt="Remove Button" /> */}
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            className="w-1/3 h-10 mt-4 bg-primary1 text-white rounded-md font-Poppins font-semibold "
            onClick={handleSave}
          >
            Tambah Obat
          </button>
        </div>
      </div>
    </div>
  );
}
