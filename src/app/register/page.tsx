"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../../../public/logo.svg";
import CustomDatePicker from "../../components/Datepicker";
import Dropdown from "../../components/Dropdown";
import CustomDropdown from "../../components/CustomDropdown";
import axios from 'axios';
import { isValid } from "date-fns";

const genderOptions = [
    { label: "Laki-laki", value: "laki-laki" },
    { label: "Perempuan", value: "perempuan" },
];

const goldarOption = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "O", value: "O" },
    { label: "AB", value: "AB" },
];

const agamaOptions = [
    { label: "Islam", value: "islam" },
    { label: "Kristen", value: "kristen" },
    { label: "Katolik", value: "katolik" },
    { label: "Hindu", value: "hindu" },
    { label: "Buddha", value: "buddha" },
    { label: "Konghucu", value: "konghucu" },
    { label: "Lainnya", value: "lainnya" },
];

const pendidikanOptions = [
    { label: "SD", value: "sd" },
    { label: "SMP", value: "smp" },
    { label: "SMA", value: "sma" },
    { label: "D3", value: "d3" },
    { label: "S1", value: "s1" },
    { label: "S2", value: "s2" },
    { label: "S3", value: "s3" },
];

const kawinOptions = [
    { label: "Belum Kawin", value: "belum-kawin" },
    { label: "Kawin", value: "kawin" },
    { label: "Cerai Hidup", value: "cerai-hidup" },
    { label: "Cerai Mati", value: "cerai-mati" },
];

const wargaNegaraOptions = [
    { label: "WNI", value: "wni" },
    { label: "WNA", value: "wna" },
    { label: "Lainnya", value: "lainnya" },
];

const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
];
const asuransiOptions = [
    { label: "Tunai", value: "tunai" },
    { label: "BPJS", value: "bpjs" },
];

export default function Register() {
    const [selectedGenderOption, setSelectedGenderOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    // const [selectedGoldar, setSelectedGoldarOption] = useState("");
    // const [selectedAgama, setSelectedAgamaOption] = useState("");
    // const [selectedPendidikan, setSelectedPendidikanOption] = useState("");
    // const [selectedKawin, setSelectedKawinOption] = useState("");
    // const [selectedWargaNegara, setSelectedWargaNegaraOption] = useState("");
    const [selectedAsuransi, setSelectedAsuransi] = useState(null);
    const [showNoAsuransiTextField, setShowNoAsuransiTextField] =
        useState(false);
    // const [inputNoAsuransiValue, setInputNoAsuransiValue] = useState("");
    // const [selectedValue, setSelectedValue] = useState("");
    // const [selectedProvinsi, setSelectedProvinsi] = useState(null);
    // const [selectedKota, setSelectedKota] = useState(null);
    // const [selectedKecamatan, setSelectedKecamatan] = useState(null);
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [kotaOptions, setKotaOptions] = useState([]);
    const [kecamatanOptions, setKecamatanOptions] = useState([]);
    const [kelurahanOptions, setKelurahanOptions] = useState([]);
    const [errors, setErrors] = useState({}); 
    const [isFormValid, setIsFormValid] = useState(false);


    const validateForm = () => { 
        let errors = {}; 

        if(!formValues.name){
            errors.nama = 'Nama is required.';
        }

        if (!formValues.email) { 
            errors.email = 'Email is required.'; 
        }else if (!/\S+@\S+\.\S+/.test(formValues.email)) { 
            errors.email = 'Email is invalid.'; 
        } 

        if(!formValues.NIK) {
            errors.NIK = 'NIK is required.';
        }

        if(!formValues.no_KK) {
            errors.no_KK = 'No KK is required.';
        }

        if(!formValues.no_erm) {
            errors.no_erm = 'No ERM is required.';
        }

        if(!formValues.golongan_darah){
            errors.goldar = 'Golongan Darah is required.';
        }

        if(!formValues.gender){
            errors.gender = "Jenis Kelamin is required."
        }

        if(!formValues.tempat_lahir) {
            errors.tempat_lahir = 'Tempat Lahir is required.';
        }

        if(!formValues.tanggal_lahir) {
            errors.tanggal_lahir = 'Tanggal Lahir is required.';
        }
        
        if(!formValues.provinsi){
            errors.provinsi = 'Provinsi is required.';
        }
        if(!formValues.kabupaten_kota){
            errors.kabupaten_kota = 'Kabupaten Kota is required.';
        }
        if(!formValues.kecamatan){
            errors.kecamatan = 'Kecamatan is required.';
        }
        if(!formValues.kelurahan){
            errors.kelurahan = 'Kelurahan is required.';
        }
        if(!formValues.alamat){
            errors.alamat = 'Alamat is required.';
        }
        if(!formValues.no_telepon){
            errors.no_telepon = 'No Telepon is required.';
        }else if(!/^\d{10,13}$/.test(formValues.no_telepon)){
            errors.no_telepon = 'No Telepon is invalid.';
        }
        if(!formValues.warga_negara){
            errors.warga_negara = 'Warga Negara is required.';
        }
        if(!formValues.status_perkawinan){
            errors.status_perkawinan = 'Status Perkawinan is required.';
        }
        if(!formValues.pendidikan_terakhir){
            errors.pendidikan_terakhir = 'Pendidikan Terakhir is required.';
        }
        if(!formValues.agama){
            errors.agama = 'Agama is required.';
        }
        if(!formValues.pekerjaan){
            errors.pekerjaan = 'Pekerjaan is required.';
        }
        if(!formValues.nama_kontak_darurat){
            errors.nama_kontak_darurat = 'Nama Kontak Darurat is required.';
        }
        if(!formValues.no_kontak_darurat){
            errors.no_kontak_darurat = 'No Kontak Darurat is required.';
        }

  
        setErrors(errors); 
        setIsFormValid(Object.keys(errors).length === 0); 
    }; 

    // const handleOptionSelect2 = (selectedOption: any) => {
    //     setSelectedValue(selectedOption);
    // };
    const handleAsuransiChange = (option: any) => {
        setSelectedAsuransi(option);
        setShowNoAsuransiTextField(option.value !== "tunai");
        setFormValues({
          ...formValues,
          ["jenis_pembayaran"]: option.label,
      });
    };
    // const handleOptionGoldarChange = (option: any) => {
    //     setSelectedGoldarOption(option);
    // };
    // const handleOptionAgamaChange = (option: any) => {
    //     setSelectedAgamaOption(option);
    // };
    // const handleOptionPendidikanChange = (option: any) => {
    //     setSelectedPendidikanOption(option);
    // };
    // const handleOptionKawinChange = (option: any) => {
    //     setSelectedKawinOption(option);
    // };
    // const handleOptionWargaNegaraChange = (option: any) => {
    //     setSelectedWargaNegaraOption(option);
    // };
    const handleDateChange = (date: any) => {
        setSelectedDate(date);
        setFormValues({
            ...formValues,
            ["tanggal_lahir"]: date,
        });
    };
    const handleGenderOptionChange = (value: any) => {
        setSelectedGenderOption(value);
        setFormValues({
            ...formValues,
            ["gender"]: value,
        });
    };
    const handleProvinsiSelect = (selectedOption: any) => {
        // setSelectedProvinsi(selectedOption);
        setFormValues({
            ...formValues,
            ["provinsi"]: selectedOption.label,
        });

        fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedOption.value}.json`
        )
            .then((response) => response.json())
            .then((data) => {
                const kotaOptions = data.map((item:any) => ({
                    label: item.name,
                    value: item.id,
                }));
                setKotaOptions(kotaOptions);
            });
    };

    const handleCitySelect = (selectedOption: any) => {
        // setSelectedKota(selectedOption);
        setFormValues({
            ...formValues,
            ["kabupaten_kota"]: selectedOption.label,
        });
        fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedOption.value}.json`
        )
            .then((response) => response.json())
            .then((data) => {
                const kecamatanOptions = data.map((item:any) => ({
                    label: item.name,
                    value: item.id,
                }));
                setKecamatanOptions(kecamatanOptions);
            });
    };

    const handleKecamatanSelect = (selectedOption: any) => {
        // setSelectedKecamatan(selectedOption);
        setFormValues({
            ...formValues,
            ["kecamatan"]: selectedOption.label,
        });
        fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedOption.value}.json`
        )
            .then((response) => response.json())
            .then((data) => {
                const kelurahanOptions = data.map((item:any) => ({
                    label: item.name,
                    value: item.id,
                }));
                setKelurahanOptions(kelurahanOptions);
            });
    };
    const handleKelurahanSelect = (selectedOption: any) => {
        setFormValues({
            ...formValues,
            ["kelurahan"]: selectedOption.label,
        });
    };

    useEffect(() => {
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
            .then((response) => response.json())
            .then((data) => {
                const provinceOptions = data.map((item:any) => ({
                    label: item.name,
                    value: item.id,
                }));
                setProvinceOptions(provinceOptions);
            });
    }, []);

    const [formValues, setFormValues] = useState({
        name: "",
        NIK: "",
        no_KK: "",
        no_erm: "",
        gender: "",
        golongan_darah: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        email: "",
        no_telepon: "",
        provinsi: "",
        kabupaten_kota: "",
        kecamatan: "",
        kelurahan: "",
        alamat: "",
        warga_negara: "",
        status_perkawinan: "",
        pendidikan_terakhir: "",
        agama: "",
        pekerjaan: "",
        nama_kontak_darurat: "",
        no_kontak_darurat: "",
        jenis_pembayaran: "",
        no_asuransi: "",
        no_IHS: "0",
        no_rm_lama: "0",
        no_dok_lama: "0",
        created_by: "0",
        updated_by: "0",
    });
    const styles = { 
        container: { 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '100vh', 
            backgroundColor: '#f0f0f0', 
        }, 
        heading: { 
            fontWeight: 'bold', 
            fontSize: '25px', 
            color: "green", 
            textAlign: "center", 
        }, 
        subHeading: { 
            fontWeight: 'bold', 
            fontSize: '25px', 
            textAlign: "center", 
      
        }, 
        form: { 
            backgroundColor: '#fff', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
            width: '100%', 
            maxWidth: '400px', 
            margin: '0 auto', 
        }, 
        input: { 
            width: '100%', 
            padding: '12px', 
            marginBottom: '12px', 
            border: '1px solid #ccc', 
            borderRadius: '10px', 
            fontSize: '16px', 
            transition: 'border-color 0.2s ease', 
        }, 
        button: { 
            backgroundColor: 'green', 
            color: '#fff', 
            fontWeight: 'bold', 
            fontSize: '16px', 
            padding: '12px', 
            border: 'none', 
            borderRadius: '10px', 
            cursor: 'pointer', 
            width: '40%', 
            transition: 'opacity 0.2s ease', 
        }, 
        error: { 
            color: 'red', 
            fontSize: '14px', 
            marginBottom: '6px', 
        }, 
    }; 

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        console.log(formValues)
        validateForm();
        if(isFormValid){
            await axios.post('http://localhost:8080/pasien', formValues)
            .then(response => {
                console.log(response)
                if(response.status < 400){
                    alert('Data berhasil disimpan')
                    location.href = '/dashboard'
                }else(
                    alert(response.data.message)
                )
            })
            .catch(error => console.log(error))
        }else{
            alert('Form is not valid')
        }

      }

    const handleInputChange = (e: any) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };
    const handleDropdownChange = (name: any, value: any) => {
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return (
        <main className="min-h-screen font-poppins bg-tint5">
            <div className="flex flex-row ">
                <Image
                    src={logo}
                    alt="Logo Seno Medika"
                    height={153}
                    width={153}
                />
                <div className="flex flex-col">
                    <h1 className="text-shade6 font-bold text-5xl">
                        REGISTRASI PASIEN
                    </h1>
                    <h2 className="text-2xl font-semibold text-shade7">
                        Lengkapi berikut untuk registrasi pasien yang ingin
                        berobat
                    </h2>
                </div>
            </div>
            <div className="bg-tint4 font-poppins mx-16 rounded-3xl">
                <form className="" onSubmit={handleSubmit}>
                    <div className="px-10 py-5 gap-y-4 grid grid-cols-12 gap-5">
                        <div className="col-start-1 col-span-12">
                            <label className="text-shade6 font-semibold text-2xl">
                                Name *
                            </label>
                            <div className="mt-2 ">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Masukkan Nama Anda"
                                    autoComplete="given-name"
                                    className="w-full h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                                    value={formValues.name}
                                    onChange={handleInputChange}
                                />
                                {errors.nama && <p style={styles.error}>{errors.nama}</p>} 
                            </div>
                        </div>
                        <div className="col-start-1 col-span-12">
                            <div className="mt-2">
                                <label className="text-shade6 font-semibold text-2xl">
                                    NIK *
                                </label>
                                <input
                                    type="text"
                                    name="NIK"
                                    id="NIK"
                                    placeholder="Masukkan NIK Anda"
                                    autoComplete="NIK"
                                    value={formValues.NIK}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                                />
                                {errors.NIK && <p style={styles.error}>{errors.NIK}</p>} 
                            </div>
                        </div>
                        <div className="col-start-1 col-span-12">
                            <div className="mt-2">
                                <label className="text-shade6 font-semibold text-2xl">
                                    No KK *
                                </label>
                                <input
                                    type="text"
                                    name="no_KK"
                                    id="no_KK"
                                    placeholder="Masukkan No KK Anda"
                                    value={formValues.no_KK}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                                />
                                {errors.no_KK && <p style={styles.error}>{errors.no_KK}</p>} 
                            </div>
                        </div>
                        <div className="col-start-1 col-span-12">
                            <div className="mt-2">
                                <label className="text-shade6 font-semibold text-2xl">
                                    No Rekam Medik *
                                </label>
                                <input
                                    type="text"
                                    name="no_erm"
                                    id="no_erm"
                                    value={formValues.no_erm}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan No Rekam Medik Anda"
                                    className="w-full h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                                />
                                {errors.no_erm && <p style={styles.error}>{errors.no_erm}</p>} 
                            </div>
                        </div>
                          <div className="col-start-1 col-span-3 ">
                              <label className="text-shade6 font-semibold text-2xl">
                                  Golongan Darah *
                              </label>
                              <div>
                                <Dropdown
                                    options={goldarOption}
                                    onSelect={(goldarOption: any) =>
                                        handleDropdownChange(
                                            "golongan_darah",
                                            goldarOption.value
                                            // onSelect={handleOptionGoldarChange}
                                        )
                                    }
                                />
                                {errors.goldar && <p style={styles.error}>{errors.goldar}</p>} 
                              </div>
                          </div>
                          <div className="col-start-4 col-span-3">
                              <label className="text-shade6 font-semibold text-2xl">
                                  Jenis Kelamin *
                              </label>
                              <div className="flex flex-row space-x-7">
                                  {genderOptions.map((option) => (
                                      <label
                                          key={option.value}
                                          className={`relative flex items-center border-none rounded-2xl h-12 px-10 py-3.5  ${
                                              selectedGenderOption ===
                                              option.value
                                                  ? "bg-shade5 text-white"
                                                  : "bg-tint7 text-gray-700"
                                          } cursor-pointer font-semibold text-sm`}
                                      >
                                          <input
                                              type="radio"
                                              value={option.value}
                                              checked={
                                                  selectedGenderOption ===
                                                  option.value
                                              }
                                              onChange={() =>
                                                  handleGenderOptionChange(
                                                      option.value
                                                  )
                                              }
                                              className="absolute opacity-0 cursor-pointer"
                                          />
                                          {option.label}
                                      </label>
                                  ))}
                              </div>
                              {errors.gender && <p style={styles.error}>{errors.gender}</p>} 
                          </div>
                          <div className="col-start-7 col-span-3">
                              <label
                                  htmlFor="tempat_lahir"
                                  className="text-shade6 font-semibold text-2xl"
                              >
                                  Tempat Lahir *
                              </label>
                              <div className="mt-2">
                                  <input
                                      type="text"
                                      name="tempat_lahir"
                                      id="tempat_lahir"
                                      placeholder="Masukkan Tempat Lahir Anda"
                                      value={formValues.tempat_lahir}
                                      onChange={handleInputChange}
                                      className="w-full h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                                  />
                                  {errors.tempat_lahir && <p style={styles.error}>{errors.tempat_lahir}</p>} 
                              </div>
                          </div>
                          <div className="col-start-10 col-span-3">
                              <label
                                  htmlFor=""
                                  className="text-shade6 font-semibold text-2xl"
                              >
                                  Tanggal Lahir *
                              </label>
                              <div className="mt-2 w-full">
                                  <CustomDatePicker
                                      selectedDate={selectedDate}
                                      onDateChange={handleDateChange} 
                                      className="w-full"
                                  />
                                  {errors.tanggal_lahir && <p style={styles.error}>{errors.tanggal_lahir}</p>} 
                              </div>
                          </div>
                          <div className="col-start-1 col-span-6">
                              <label
                                  htmlFor="email"
                                  className="text-shade6 font-semibold text-2xl"
                              >
                                  Email *
                              </label>
                              <div className="mt-2">
                                  <input
                                      type="email"
                                      name="email"
                                      id="email"
                                      placeholder="Masukkan Email Anda"
                                      value={formValues.email}
                                      onChange={handleInputChange}
                                      className="w-full h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                                  />
                                  {errors.email && <p style={styles.error}>{errors.email}</p>} 
                              </div>
                          </div>

                          <div className="col-start-7 col-span-6">
                              <label
                                  htmlFor="no_telepon"
                                  className="text-shade6 font-semibold text-2xl"
                              >
                                  No HP / Telepon *
                              </label>
                              <div className="mt-2">
                                  <input
                                      type="text"
                                      name="no_telepon"
                                      id="no_telepon"
                                      placeholder="Masukkan No HP / Telepon Anda"
                                      value={formValues.no_telepon}
                                      onChange={handleInputChange}
                                      className="w-full h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                                  />
                                  {errors.no_telepon && <p style={styles.error}>{errors.no_telepon}</p>} 
                              </div>
                          </div>
                        
                          <div className="col-start-1 col-span-3">
                              <label
                                  htmlFor="city"
                                  className="text-shade6 font-semibold text-2xl"
                              >
                                  Provinsi *
                              </label>
                              <div className="mt-2">
                                  <Dropdown
                                      options={provinceOptions}
                                      onSelect={handleProvinsiSelect}
                                  />
                                  {errors.provinsi && <p style={styles.error}>{errors.provinsi}</p>} 
                              </div>
                          </div>

                          <div className="col-start-4 col-span-3">
                              <label
                                  htmlFor="region"
                                  className="text-shade6 font-semibold text-2xl"
                              >
                                  Kabupaten / Kota *
                              </label>
                              <div className="mt-2">
                                  <Dropdown
                                      options={kotaOptions}
                                      onSelect={handleCitySelect}
                                  />
                                  {errors.kabupaten_kota && <p style={styles.error}>{errors.kabupaten_kota}</p>} 
                              </div>
                          </div>

                          <div className="col-start-7 col-span-3">
                              <label
                                  htmlFor="postal-code"
                                  className="text-shade6 font-semibold text-2xl"
                              >
                                  Kecamatan *
                              </label>
                              <div className="mt-2">
                                  <Dropdown
                                      options={kecamatanOptions}
                                      onSelect={handleKecamatanSelect}
                                  />
                                  {errors.kecamatan && <p style={styles.error}>{errors.kecamatan}</p>} 
                              </div>
                          </div>

                          <div className="col-start-10 col-span-3">
                              <label
                                  htmlFor="postal-code"
                                  className="text-shade6 font-semibold text-2xl"
                              >
                                  Kelurahan *
                              </label>
                              <div className="mt-2">
                                  <Dropdown
                                      options={kelurahanOptions}
                                      onSelect={handleKelurahanSelect}
                                  />
                                  {errors.kelurahan && <p style={styles.error}>{errors.kelurahan}</p>} 
                              </div>
                          </div>
                        <div className="col-start-1 col-span-12">
                            <label className="text-shade6 font-semibold text-2xl">
                                Alamat Lengkap *
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="alamat"
                                    id="alamat"
                                    autoComplete="alamat"
                                    placeholder="Masukkan Alamat Lengkap Anda"
                                    value={formValues.alamat}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                                />
                                {errors.alamat && <p style={styles.error}>{errors.alamat}</p>} 
                            </div>
                        </div>
                        <div className="col-start-1 col-span-3">
                            <label
                                htmlFor="city"
                                className="text-shade6 font-semibold text-2xl"
                            >
                                Warga Negara *
                            </label>
                            <div className="mt-2">
                                <Dropdown
                                    options={wargaNegaraOptions}
                                    // onSelect={handleOptionWargaNegaraChange}
                                    onSelect={(wargaNegaraOptions: any) =>
                                        handleDropdownChange(
                                            "warga_negara",
                                            wargaNegaraOptions.value
                                        )
                                    }
                                />
                                {errors.warga_negara && <p style={styles.error}>{errors.warga_negara}</p>} 
                            </div>
                        </div>

                        <div className="col-start-4 col-span-3">
                            <label
                                htmlFor="region"
                                className="text-shade6 font-semibold text-2xl"
                            >
                                Status Perkawinan *
                            </label>
                            <div className="mt-2">
                                <Dropdown
                                    options={kawinOptions}
                                    onSelect={(kawinOptions: any) =>
                                        handleDropdownChange(
                                            "status_perkawinan",
                                            kawinOptions.value
                                        )
                                    }
                                />
                                {errors.status_perkawinan && <p style={styles.error}>{errors.status_perkawinan}</p>} 
                            </div>
                        </div>

                        <div className="col-start-7 col-span-3">
                            <label
                                htmlFor="postal-code"
                                className="text-shade6 font-semibold text-2xl"
                            >
                                Pendidikan Terakhir *
                            </label>
                            <div className="mt-2">
                                <Dropdown
                                    options={pendidikanOptions}
                                    // onSelect={handleOptionPendidikanChange}
                                    onSelect={(pendidikanOptions: any) =>
                                        handleDropdownChange(
                                            "pendidikan_terakhir",
                                            pendidikanOptions.value
                                        )
                                    }
                                />
                                {errors.pendidikan_terakhir && <p style={styles.error}>{errors.pendidikan_terakhir}</p>} 
                            </div>
                        </div>

                        <div className="col-start-10 col-span-3">
                            <label
                                htmlFor="postal-code"
                                className="text-shade6 font-semibold text-2xl"
                            >
                                Agama *
                            </label>
                            <div className="mt-2">
                                <Dropdown
                                    options={agamaOptions}
                                    // onSelect={handleOptionAgamaChange}
                                    onSelect={(agamaOptions: any) =>
                                        handleDropdownChange(
                                            "agama",
                                            agamaOptions.value
                                        )
                                    }
                                />
                                {errors.agama && <p style={styles.error}>{errors.agama}</p>} 
                            </div>
                        </div>
                        
                        
                        <div className="col-start-1 col-span-4">
                            <label
                                htmlFor="pekerjaan"
                                className="text-shade6 font-semibold text-2xl"
                            >
                                Pekerjaan *
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="pekerjaan"
                                    id="pekerjaan"
                                    placeholder="Masukkan Pekerjaan Anda"
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                                />
                                {errors.pekerjaan && <p style={styles.error}>{errors.pekerjaan}</p>} 
                            </div>
                        </div>

                        <div className="col-start-5 col-span-4">
                            <label
                                htmlFor="nama_kontak_darurat"
                                className="text-shade6 font-semibold text-2xl"
                            >
                                Nama Kontak Darurat *
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="nama_kontak_darurat"
                                    id="nama_kontak_darurat"
                                    placeholder="Masukkan Nama Kontak Darurat Anda"
                                    value={formValues.nama_kontak_darurat}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                                />
                                {errors.nama_kontak_darurat && <p style={styles.error}>{errors.nama_kontak_darurat}</p>} 
                            </div>
                        </div>

                        <div className="col-start-9 col-span-4">
                            <label
                                htmlFor="no_kontak_darurat"
                                className="text-shade6 font-semibold text-2xl"
                            >
                                No Kontak Darurat *
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="no_kontak_darurat"
                                    id="no_kontak_darurat"
                                    placeholder="Masukkan No Kontak Darurat Anda"
                                    value={formValues.no_kontak_darurat}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                                />
                                {errors.no_kontak_darurat && <p style={styles.error}>{errors.no_kontak_darurat}</p>} 
                            </div>
                        </div>
                        
                        <div className="col-start-1 col-span-12">
                            <label
                                htmlFor="city"
                                className="text-shade6 font-semibold text-2xl"
                            >
                                Jenis Pembayaran *
                            </label>
                            <CustomDropdown
                                options={asuransiOptions}
                                selectedOption={selectedAsuransi}
                                onChange={handleAsuransiChange}
                                // onSelect={(asuransiOptions:any) => handleDropdownChange('jenis_pembayaran', selectedAsuransi)}
                            />
                            {showNoAsuransiTextField && (
                                <div className="mt-2">
                                    <label className="text-shade6 font-semibold text-2xl">
                                        No Asuransi *
                                    </label>
                                    <input
                                    type="text"
                                    name="no_asuransi"
                                    id="no_asuransi"
                                    autoComplete="no_asuransi"
                                    placeholder="Masukkan No Asuransi Anda"
                                    value={formValues.no_asuransi}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                                />
                                </div>
                            )}
                        </div>
                
                      <div className="col-start-11 col-span-2 ">
                        <div className="mt-2">
                          <button
                              type="submit"
                              className="flex items-center justify-center text-white font-semibold border-none rounded-2xl h-12 px-10 py-3.5 bg-primary1 w-full"
                          >
                              Simpan
                          </button>
                        </div>
                      </div>
                    </div>

                </form>
            </div>
        </main>
    );
}
