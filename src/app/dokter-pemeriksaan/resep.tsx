import React, { useEffect, useState } from "react";
import Dropdown from "../components/dropdown";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Noto_Sans_Mayan_Numerals } from "next/font/google";

interface Resep {
  ruang_tujuan: string;
  status_obat: string;
}

interface ListObat {
  obat_id: number;
  jumlah: number;
  dosis: string;
  aturan_pakai: string;
  harga: number;
  keterangan: string;
  nama_obat?: string;
}

export default function Resep() {
  const searchParams = useSearchParams();
  const antrianID = searchParams.get("antrianID");
  const [resepData, setResepData] = useState<Resep[]>([]);
  const [listObatData, setListObatData] = useState<ListObat[]>([]);
  const [ruangTujuan, setRuangTujuan] = useState("");
  const [statusObat, setStatusObat] = useState("");
  const [namaObatOptions, setNamaObatOptions] = useState<any[]>([]);
  const [selectedObat, setSelectedObat] = useState(null);
  const [jumlah, setJumlah] = useState(0);
  const [dosis, setDosis] = useState("");
  const [aturanPakai, setAturanPakai] = useState("");
  const [harga, setHarga] = useState(0);
  const [keterangan, setKeterangan] = useState("");
  const [pemeriksaanID, setPemeriksaanID] = useState<any>(null);

  const ruangTujuanOpt = [{ label: "Apotek", value: "Apotek" }];
  const statusObatOpt = [
    { label: "Belum Dikirim", value: "Belum Dikirim" },
    { label: "Sudah Dikirim", value: "Sudah Dikirim" },
  ];

  const fetchObat = async () => {
    try {
      const response = await axios.get("http://localhost:8080/obat");
      const obat = response.data.data;
      const options = obat.map((obat: { obat_id: any; nama_obat: any }) => ({
        label: obat.nama_obat,
        value: obat.obat_id,
        nama_obat: obat.nama_obat,
      }));
      setNamaObatOptions(options);
    } catch (error) {
      console.error("Error fetching obat data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "jumlah":
        setJumlah(value === "" ? 0 : parseInt(value));
        break;
      case "harga":
        setHarga(value === "" ? 0 : parseFloat(value));
        break;
      case "dosis":
        setDosis(value);
        break;
      case "aturan_pakai":
        setAturanPakai(value);
        break;
      case "keterangan":
        setKeterangan(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchObat();
  }, []);

  const handleObatDropdown = (value: any) => {
    setSelectedObat(value);
  };

  const removeObat = (index: number) => {
    const newListObatData = listObatData.filter((_, i) => i !== index);
    setListObatData(newListObatData);
  };

  const addResep = () => {
    if (!selectedObat) {
      alert("Please select a medicine");
      return;
    }

    const newListObatData: ListObat = {
      obat_id: selectedObat.value,
      jumlah: jumlah,
      dosis: dosis,
      aturan_pakai: aturanPakai,
      harga: harga,
      keterangan: keterangan,
      nama_obat: selectedObat.label,
    };

    setListObatData([...listObatData, newListObatData]);

    // Reset form fields
    setSelectedObat(null);
    setJumlah(0);
    setDosis("");
    setAturanPakai("");
    setHarga(0);
    setKeterangan("");
  };

  const fetchPemeriksaanId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/pemeriksaan_dokter?find_by=antrian_id&target=${antrianID}`
      );
      const pemeriksaanData = response.data.data;
      const pemeriksaanId = pemeriksaanData.pemeriksaan.pemeriksaan_dokter_id; // Extract the ID
      setPemeriksaanID(pemeriksaanId); // Set the ID
      console.log("Pemeriksaan ID:", pemeriksaanId);
    } catch (error) {
      console.error("Error fetching pemeriksaan data:", error);
    }
  };

  useEffect(() => {
    if(antrianID){

      fetchPemeriksaanId();
    }
  }, [antrianID]);

  const handleSave = async (e: any) => {
    e.preventDefault();
  
    if (!pemeriksaanID) {
      alert("Pemeriksaan ID is not set");
      return;
    }
  
    const resepUpdate = {
      pemeriksaan_dokter_id: pemeriksaanID,
      ruang_tujuan: ruangTujuan,
      status_obat: statusObat,
    };
  
    try {
      // Update resep
      const response = await axios.put(`http://localhost:8080/resep?update_by=id&target=${pemeriksaanID}`, resepUpdate);
      
      const updatedListObatData = listObatData.map(obat => ({ ...obat, resep_id: response.data.data.resep_id }));

      // Post updated listObatData
      for (const obat of updatedListObatData) {
        const responseObat = await axios.post(`http://localhost:8080/obat/list`, obat);
        console.log("Obat update response:", responseObat.data);
      }
      // const responseListObat = await axios.post(`http://localhost:8080/obat/list`, updatedListObatData[0]);
  
      // console.log("List obat update response:", responseListObat.data);
      alert("Resep berhasil disimpan");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error saving resep:", error.response?.data || error.message);
        alert(`Error saving resep: ${error.response?.data.message || error.message}`);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };
  
  
  

  return (
    <div className="flex flex-col w-full pt-12 pl-6 pr-10 pb-10 mb-14 rounded-md">
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
            options={namaObatOptions}
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
            value={jumlah}
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
            value={dosis}
            required
            placeholder="Masukkan Dosis"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Aturan Pakai
            <span className="text-[#D66A63]"> *</span>
          </label>
          <input
            name="aturan_pakai"
            onChange={handleInputChange}
            value={aturanPakai}
            required
            placeholder="Masukkan Aturan Pakai"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          <label className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
            Harga
            <span className="text-[#D66A63]"> *</span>
          </label>
          <input
            name="harga"
            onChange={handleInputChange}
            value={harga}
            required
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
            value={keterangan}
            placeholder="Masukkan Keterangan"
            className="w-2/3 h-12 pl-4 pr-4 text-sm text-shade8 font-Poppins font-normal border rounded-2xl"
          />
        </div>
        <button onClick={addResep} className="w-1/5 h-10 mt-4 bg-primary1 text-white rounded-md font-Poppins font-semibold hover:text-shade6 hover:bg-tint5">
          Tambah Resep
        </button>
      </div>
      <div>
        <h3 className="w-1/3 pl-4 mb-1 text-xl text-shade8 font-Poppins font-bold mt-4">Daftar Obat</h3>
        <ul>
        {listObatData.map((obat, index) => (
            <li key={index} className="p-4 border rounded-lg">
              <div className="font-semibold">Nama Obat: {obat.nama_obat}</div>
              <div>Dosis: {obat.dosis}</div>
              <div>Jumlah: {obat.jumlah}</div>
              <div>Aturan Pakai: {obat.aturan_pakai}</div>
              <div>Keterangan: {obat.keterangan}</div>
              <button onClick={() => removeObat(index)} className="w-1/5 h-10 mt-1 bg-[#D66A63] text-white rounded-md font-Poppins font-semibold hover:bg-cancel">Hapus</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSave} className="w-1/5 h-10 mt-4 bg-primary1 text-white rounded-md font-Poppins font-semibold items-end hover:text-shade6 hover:bg-tint5">
        Simpan Resep
      </button>
    </div>
  );
}
