import React, { useEffect, useState } from "react";
import Dropdown from "../components/dropdown";
import RemoveButton from "../../../public/remove_button.svg";
import Image from "next/image";
import axios from "axios";
import { useSearchParams } from 'next/navigation'


interface Diagnosa {
  diagnosa: string;
  jenis: string;
  kasus: string;
  status_diagnosis: string;
  // pemeriksaanDokter: number;
}

export default function Diagnosa() {
    const searchParams = useSearchParams();
    const [diagnosaData, setDiagnosaData] = useState<Diagnosa[]>([]);
    const antrian_id = searchParams.get('antrianID')
    const [diagnosa, setDiagnosa] = useState('');
    const [jenis, setJenis] = useState('');
    const [kasus, setKasus] = useState('');
    const [status_diagnosis, setStatusDiagnosa] = useState('');
    const [pemeriksaanDokter, setPemeriksaanDokter] = useState(11);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [diagnosaOne, setDiagnosaOne] = useState<Diagnosa>({
      diagnosa: '',
      jenis: '',
      kasus: '',
      status_diagnosis: '',
      // pemeriksaanDokter: 0,
    });
    const options = [
        { label: "Diagnosa1", value: "Diagnosa1" },
        { label: "Diagnosa2", value: "Diagnosa2" },
        { label: "Diagnosa3", value: "Diagnosa3" },
      ];
    const jenisOptions = [
        { label: "PRIMER", value: "PRIMER" },
        { label: "SEKUNDER", value: "SEKUNDER" },
        { label: "KOMPLIKASI", value: "KOMPLIKASI" },
      ];
    const kasusOptions = [
        { label: "LAMA", value: "LAMA" },
        { label: "BARU", value: "BARU" },
      ];
    const statusDiagnosaOptions = [
        { label: "StatusDiagnosa1", value: "StatusDiagnosa1" },
        { label: "StatusDiagnosa2", value: "StatusDiagnosa2" },
        { label: "StatusDiagnosa3", value: "StatusDiagnosa3" },
      ];
    const addDiagnosa = () => {
      const newDiagnosaData: Diagnosa = {
        diagnosa: diagnosa,
        jenis: jenis,
        kasus: kasus,
        status_diagnosis: status_diagnosis,
        // pemeriksaanDokter: pemeriksaanDokter,
      };
      setDiagnosaData([...diagnosaData, newDiagnosaData]);
      console.log(diagnosaData);
    };
    const removeDiagnosa = (index: number) => {
      const newDiagnosaData = diagnosaData.filter((_, i) => i !== index);
      setDiagnosaData(newDiagnosaData);
      console.log(diagnosaData);
    };

    useEffect(() => {
      // setDiagnosa(exampleDiagnosa);
    }, []);
    interface ValidationErrors {
      [key: string]: string;
    }
    
    const validateForm = () =>{
      let err: ValidationErrors = {};
      let isValid = true;

      if (diagnosaOne.diagnosa ===""){
        err.diagnosa = "Diagnosa harus diisi";
        isValid = false;
      }

      setErrors(err);
      return isValid;
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
      const formIsValid = await validateForm();
      if(formIsValid){
        try{
          const response = await axios.patch(`http://localhost:8080/pemeriksaan_dokter?update_by=antrian_id&update_type=diagnosa&target=${antrian_id}`, diagnosaOne); {
          console.log(response);
          alert("Diagnosa berhasil disimpan");
          }
        } catch (error) {
          console.error(error);
        }
      }
      
    }
    return (
        <div className="flex flex-col w-full pt-12 pl-6 pr-10 pb-10 mb-14 rounded-md ">
            <div className="flex flex-row justify-between items-center mb-4">
              <label htmlFor='diagnosa' title="DiagnosaContent" className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
                Diagnosa
                <span className="text-[#D66A63]"> *</span>
              </label>
              <Dropdown
                id="diagnosa"
                className="w-2/3"
                options={options}
                value={diagnosa}
                // onSelect={(selectedOption:any) => setDiagnosa(selectedOption.value)}
                onSelect={(selectedOption:any) => setDiagnosaOne(prevState => ({...prevState, diagnosa: selectedOption.value}))}
                placeholder="Cari Diagnosa"
                required
              />
            </div>
            {errors.diagnosa && <p className="text-[#D66A63]">{errors.diagnosa}</p>}
            <div className="flex flex-row justify-between items-center mb-4">
              <label htmlFor='jenis' className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
                Jenis
              </label>
              <Dropdown
                id="jenis"
                className="w-2/3"
                options={jenisOptions}
                value={jenis}
                // onSelect={(selectedOption:any) => setJenis(selectedOption.value)}
                onSelect={(selectedOption:any) => setDiagnosaOne(prevState => ({...prevState, jenis: selectedOption.value}))}
                required
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label htmlFor='kasus' className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
                Kasus
              </label>
              <Dropdown
                id="kasus"
                className="w-2/3"
                options={kasusOptions}
                value={kasus}
                // onSelect={(selectedOption:any) => setKasus(selectedOption.value)}
                onSelect={(selectedOption:any) => setDiagnosaOne(prevState => ({...prevState, kasus: selectedOption.value}))}
                required
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label htmlFor='status' className="w-1/3 pl-4 mb-1 text-l text-shade8 font-Poppins font-semibold">
                Status Diagnosis
              </label>
              <Dropdown
                id="statusDiagnosa"
                className="w-2/3"
                options={statusDiagnosaOptions}
                value={status_diagnosis}
                // onSelect={(selectedOption:any) => setStatusDiagnosa(selectedOption.value)}
                onSelect={(selectedOption:any) => setDiagnosaOne(prevState => ({...prevState, status_diagnosis: selectedOption.value}))}
                required
              />
            </div>
            {/* <div className='flex justify-end'>
                <button className="w-1/5 h-10 mt-4 bg-primary1 text-white rounded-md font-Poppins font-semibold"
                        onClick={addDiagnosa} >
                    Tambahkan Diagnosa
                </button>
            </div> */}
            
            <div className="flex flex-col justify-between items-center my-3 gap-4 w-full">
              {diagnosaData.map((obat, index) => (
                <div key={index} className="w-full">
                  <hr className="h-px bg-shade6 border-0 w-full" />
                  <div className="flex justify-between items-center w-full">
                    <div className="flex-grow">
                      <p className="font-bold">{obat.diagnosa}</p>
                      <p>Jenis: {obat.jenis}</p>
                      <p>Kasus: {obat.kasus}</p>
                      <p>Status Diagnosa: {obat.status_diagnosis}</p>
                    </div>
                    <button className="w-10 h-10" onClick={() => removeDiagnosa(index)}>
                      {/* <Image src={RemoveButton} alt="Remove Button" /> */}
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex justify-end'>
                <button className="w-1/5 h-10 mt-4 bg-primary1 text-white rounded-md font-Poppins font-semibold"
                        onClick={handleSave} >
                    Simpan Diagnosa
                </button>
            </div>
        </div>
    );
}
