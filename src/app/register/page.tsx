"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../../../public/logo.svg";
import CustomDatePicker from "../../components/Datepicker";
import Dropdown from "../../components/Dropdown";
import CustomDropdown from "../../components/CustomDropdown";

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
    const [selectedGoldar, setSelectedGoldarOption] = useState("");
    const [selectedAgama, setSelectedAgamaOption] = useState("");
    const [selectedPendidikan, setSelectedPendidikanOption] = useState("");
    const [selectedKawin, setSelectedKawinOption] = useState("");
    const [selectedWargaNegara, setSelectedWargaNegaraOption] = useState("");
    const [selectedAsuransi, setSelectedAsuransi] = useState(null);
    const [showNoAsuransiTextField, setShowNoAsuransiTextField] =
        useState(false);
    const [inputNoAsuransiValue, setInputNoAsuransiValue] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedProvinsi, setSelectedProvinsi] = useState(null);
    const [selectedKota, setSelectedKota] = useState(null);
    const [selectedKecamatan, setSelectedKecamatan] = useState(null);
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [kotaOptions, setKotaOptions] = useState([]);
    const [kecamatanOptions, setKecamatanOptions] = useState([]);
    const [kelurahanOptions, setKelurahanOptions] = useState([]);

    const handleOptionSelect2 = (selectedOption: any) => {
        setSelectedValue(selectedOption);
        console.log(selectedOption);
    };
    const handleAsuransiChange = (option: any) => {
        setSelectedAsuransi(option);
        setShowNoAsuransiTextField(option.value !== "tunai");
        setFormValues({
          ...formValues,
          ["jenis_pembayaran"]: option.label,
      });
    };
    const handleOptionGoldarChange = (option: any) => {
        setSelectedGoldarOption(option);
    };
    const handleOptionAgamaChange = (option: any) => {
        setSelectedAgamaOption(option);
    };
    const handleOptionPendidikanChange = (option: any) => {
        setSelectedPendidikanOption(option);
    };
    const handleOptionKawinChange = (option: any) => {
        setSelectedKawinOption(option);
    };
    const handleOptionWargaNegaraChange = (option: any) => {
        setSelectedWargaNegaraOption(option);
    };
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
        setSelectedProvinsi(selectedOption);
        console.log(selectedOption);
        console.log(
            `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${selectedOption.value}.json`
        );
        setFormValues({
            ...formValues,
            ["provinsi"]: selectedOption.label,
        });

        fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedOption.value}.json`
        )
            .then((response) => response.json())
            .then((data) => {
                const kotaOptions = data.map((item) => ({
                    label: item.name,
                    value: item.id,
                }));
                setKotaOptions(kotaOptions);
            });
    };

    const handleCitySelect = (selectedOption: any) => {
        setSelectedKota(selectedOption);
        console.log(selectedOption.value);
        setFormValues({
            ...formValues,
            ["kabupaten_kota"]: selectedOption.label,
        });
        fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedOption.value}.json`
        )
            .then((response) => response.json())
            .then((data) => {
                const kecamatanOptions = data.map((item) => ({
                    label: item.name,
                    value: item.id,
                }));
                setKecamatanOptions(kecamatanOptions);
            });
    };

    const handleKecamatanSelect = (selectedOption: any) => {
        setSelectedKecamatan(selectedOption);
        console.log(selectedOption.value);
        setFormValues({
            ...formValues,
            ["kecamatan"]: selectedOption.label,
        });
        // Fetch subdistrict options based on selected district
        console.log(selectedOption.value);
        fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedOption.value}.json`
        )
            .then((response) => response.json())
            .then((data) => {
                const kelurahanOptions = data.map((item) => ({
                    label: item.name,
                    value: item.id,
                }));
                setKelurahanOptions(kelurahanOptions);
            });
    };
    const handleKelurahanSelect = (selectedOption: any) => {
        console.log(selectedOption.value);
        setFormValues({
            ...formValues,
            ["kelurahan"]: selectedOption.label,
        });
    };

    useEffect(() => {
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
            .then((response) => response.json())
            .then((data) => {
                const provinceOptions = data.map((item) => ({
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
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(formValues);
    };

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
