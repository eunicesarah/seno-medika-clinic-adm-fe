"use client";
import { useState } from "react";
import Image from "next/image";
import Pattern from "../../../public/pattern.svg";
import Modal from "react-modal";
import Chip from "react-chip"

export default function Register() {
  const [selectedPosisi, setSelectedPosisi] = useState("");
  const [selectedPoli, setSelectedPoli] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
  });

  type Schedule = {
	hari: string;
	waktuMulai: string;
	waktuSelesai: string;
  };
  
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const [jenisPoli, setJenisPoli] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [dateTimeStart, setDateTimeStart] = useState<String>("");
  const [dateTimeEnd, setDateTimeEnd] = useState<String>("");
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const handlePosisiChange = (value:any) => {
    setSelectedPosisi(value);
    setShowAdditionalFields(
      value === "Dokter" || value === "Apoteker" || value === "Suster"
    );
    setShowSubmitButton(value === "Kasir" || value === "front_officer");
  };

  const handlePoliChange = (value: any) => {
    setSelectedPoli(value);
  };

  const handleOpenModal = (e:any) => {
    e.preventDefault();
    setIsModalOpen(true);
    setDateTimeStart("");
    setDateTimeEnd("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleJenisPoliChange = (value:any) => {
    setJenisPoli(value);
  };

  // const handleSimpanClick = (schedule:any) => {
  //   console.log(schedule);
  //   // Get the values of "hari", "waktu mulai", and "waktu selesai"
  //   // This is just a placeholder, replace it with your actual logic

  //   const hari = document.querySelector('input[name="hari_jadwal"]:checked').value;
  //   const waktuMulai = document.getElementById('waktu_mulai]').value;
  //   const waktuSelesai = document.getElementById("waktu_selesai").value;

  //   // Add the new schedule to the state
  //   setSchedules(prevSchedules => [...prevSchedules, { hari, waktuMulai, waktuSelesai }]);
  // };

  // const handleDelete = (scheduleToDelete) => () => {
  //   setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule !== scheduleToDelete));
  // };

  const handleSubmit = () => {
    if (selectedPosisi === "Kasir") {
      // Submit the form for Kasir
      console.log("Form submitted for Kasir:", formData);
    } else {
      // Handle the form data for other positions (e.g., Dokter)
      console.log("Form data for other positions:", formData);
      // You can show a different form based on the selected position
    }
  };

  return (
    <div className="w-full h-screen bg-tint6 flex flex-row">
      <div className="h-screen w-auto ">
        {selectedPosisi != "Dokter" &&
          selectedPosisi != "Suster" &&
          selectedPosisi != "Apoteker" && (
            <Image src={Pattern} alt="blg" className="h-screen" />
          )}
      </div>
      <div className="px-10 py-9 items-center flex flex-col w-full justify-center">
        <h1 className="uppercase text-shade6 text-5xl font-Poppins font-bold leading-9 text-center m-5 ">
          REGISTRASI
        </h1>
        <form className="space-y-4 md:space-y-6 flex flex-row">
          <div className="flex flex-col gap-3">
            <div className="mx-16">
              <label className="pl-4 mb-1 block text-l text-shade6 font-Poppins font-semibold">
                Nama
              </label>
              <input
                type="text"
                name="nama"
                id="nama"
                className="w-96 h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>
            <div className="mx-16">
              <label className="pl-4 mb-1 block text-l text-shade6 font-Poppins font-semibold">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-96 h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                placeholder="Masukkan alamat e-mail Anda"
              />
            </div>
            <div className="mx-16 ">
              <label className="pl-4 mb-1 block text-l text-shade6 font-Poppins font-semibold">
                Kata Sandi
              </label>
              <input
                className="w-96 h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                type="password"
                name="password"
                id="password"
                placeholder="Masukkan kata sandi Anda"
              />
            </div>
            <div className="max-w-sm mx-16">
              <label className="pl-4 mb-1 block text-l text-shade6 font-Poppins font-semibold">
                Daftar Sebagai
              </label>
              <select
                id="posisi"
                name="posisi"
                className="font-Poppins font-semibold w-full  p-2 rounded-xl px-7 py-3.5 left-0 top-9 bg-gray-100  border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                onChange={(e) => handlePosisiChange(e.target.value)}
                value={selectedPosisi}
              >
                <option className="text-shade8 font-Poppins font-semibold w-full  p-2 hover:text-tint7 hover:bg-shade4">
                  Pilih
                </option>
                <option
                  className="text-shade8 font-Poppins font-semibold w-full rounded-t-xl  p-2 hover:text-tint7 hover:bg-shade4"
                  value="Dokter"
                >
                  Dokter
                </option>
                <option
                  className="text-shade8 font-Poppins font-semibold w-full  p-2 hover:text-tint7 hover:bg-shade4"
                  value="Apoteker"
                >
                  Apoteker
                </option>
                <option
                  className="text-shade8 font-Poppins font-semibold w-full  p-2 hover:text-tint7 hover:bg-shade4"
                  value="Kasir"
                >
                  Kasir
                </option>
                <option
                  className="text-shade8 font-Poppins font-semibold w-full  p-2 hover:text-tint7 hover:bg-shade4"
                  value="Suster"
                >
                  Suster
                </option>
                <option
                  className="text-shade8 font-Poppins font-semibold  w-full rounded-b-xl  p-2 hover:text-tint7 hover:bg-shade4"
                  value="front_officer"
                >
                  Front Officer
                </option>
              </select>
            </div>
            <div className="flex flex-row justify-center">
              {showSubmitButton && (
                <button
                  className="rounded-2xl py-2.5 px-16 bg-primary1 font-Poppins font-semibold hover:bg-shade5"
                  onClick={handleSubmit}
                >
                  {selectedPosisi === "Kasir" ||
                  selectedPosisi === "front_officer"
                    ? "Submit"
                    : "Lanjut"}
                </button>
              )}
            </div>
          </div>
          {showAdditionalFields && (
            <div className="flex flex-col gap-3">
              <div className="mx-16">
                <label className="pl-4 mb-1 block text-l text-shade6 font-Poppins font-semibold">
                  Nomor Lisensi
                </label>
                <input
                  type="text"
                  name="no_lisensi"
                  id="no_lisensi"
                  className="w-96 h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                  placeholder="Masukkan nomor lisensi Anda"
                />
              </div>
              <div className="max-w-sm mx-16">
                {selectedPosisi === "Dokter" && (
                  <div>
                    <label className="pl-4 mb-1 block text-l text-shade6 font-Poppins font-semibold">
                      Jenis Poli
                    </label>
                    <select
                      id="jenis_poli"
                      name="jenis_poli"
                      className="font-Poppins font-semibold w-full  p-2 rounded-xl px-7 py-3.5 left-0 top-9 bg-gray-100  border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
                      onChange={(e) => handlePoliChange(e.target.value)}
                      value={selectedPoli}
                    >
                      <option className="text-shade8 font-Poppins font-semibold w-full  p-2 hover:text-tint7 hover:bg-shade4">
                        Pilih
                      </option>
                      <option
                        className="text-shade8 font-Poppins font-semibold w-full rounded-t-xl  p-2 hover:text-tint7 hover:bg-shade4"
                        value="poli_umum"
                      >
                        Poli Umum
                      </option>
                      <option
                        className="text-shade8 font-Poppins font-semibold w-full  p-2 hover:text-tint7 hover:bg-shade4"
                        value="poli_gigi"
                      >
                        Poli Gigi
                      </option>
                      <option
                        className="text-shade8 font-Poppins font-semibold w-full  p-2 hover:text-tint7 hover:bg-shade4"
                        value="bidan"
                      >
                        Bidan
                      </option>
                    </select>
                  </div>
                )}
              </div>
              <div className="mx-16">
                {selectedPosisi === "Dokter" && (
                  <div>
                    <label className="pl-4 mb-1 block text-l text-shade6 font-Poppins font-semibold">
                      Jadwal
                    </label>
                    <div>
                    {schedules.map((schedule, index) => (
                <Chip
                  key={index}
                  label={`${schedule.hari}, ${schedule.waktuMulai} - ${schedule.waktuSelesai}`}
                  // onDelete={handleDelete(schedule)}
                />
              ))}
                      <button
                        name="jadwal"
                        id="jadwal"
                        onClick={handleOpenModal}
                        className="w-auto h-12 px-7 py-3.5 left-0 top-9 bg-transparent rounded-2xl border-2 border-shade8 justify-start items-center gap-2.5 inline-flex text-shade7 hover:bg-shade8 hover:text-tint7 hover:border-tint7 "
                      >
                        Tambah Jadwal +
                      </button>
                    </div>
                    <Modal
                      isOpen={isModalOpen}
                      onRequestClose={handleCloseModal}
                      contentLabel="Schedule Modal"
                      className="text-shade8 font-Poppins items-center justify-center p-8 flex flex-col gap-5 bg-tint4 h-auto w-auto rounded-b-3xl"
                    >
                      <label className="font-bold ">Pilih Jadwal</label>
                      <div className=" p-4 flex flex-col gap-2 justify-center items-center">
                        <label className="font-bold text-l">Hari</label>
                        <div className="flex flex-row gap-2">
                          <div>
                            <label className="relative cursor-pointer">
                              <input
                                type="radio"
                                className="peer sr-only"
                                name="hari_jadwal"
                                id="hari_jadwal"
                                value="senin"
                              />
                              <div className="justify-center overflow-hidden rounded-xl bg-tint6 shadow-md ring ring-transparent peer-checked:bg-shade6 peer-checked:text-tint7 transition-all active:scale-95 peer-checked:ring-shade8">
                                <header className="px-2.5 py-2.5 items-center justify-center">
                                  <p className="text-m font-semibold tracking-wide  items-center justify-center">
                                    Senin
                                  </p>
                                </header>
                              </div>
                            </label>
                          </div>
                          <div>
                            <label className="relative cursor-pointer">
                              <input
                                type="radio"
                                className="peer sr-only"
                                name="hari_jadwal"
                                id="hari_jadwal"
                                value="selasa"
                              />
                              <div className="justify-center overflow-hidden rounded-xl bg-tint6 shadow-md ring ring-transparent peer-checked:bg-shade6 peer-checked:text-tint7 transition-all active:scale-95 peer-checked:ring-shade8">
                                <header className="px-2.5 py-2.5 items-center justify-center">
                                  <p className="text-m font-semibold tracking-wide  items-center justify-center">
                                    Selasa
                                  </p>
                                </header>
                              </div>
                            </label>
                          </div>
                          <div>
                            <label className="relative cursor-pointer">
                              <input
                                type="radio"
                                className="peer sr-only"
                                name="hari_jadwal"
                                id="hari_jadwal"
                                value="rabu"
                              />
                              <div className="justify-center overflow-hidden rounded-xl bg-tint6 shadow-md ring ring-transparent peer-checked:bg-shade6 peer-checked:text-tint7 transition-all active:scale-95 peer-checked:ring-shade8">
                                <header className="px-2.5 py-2.5 items-center justify-center">
                                  <p className="text-m font-semibold tracking-wide  items-center justify-center">
                                    Rabu
                                  </p>
                                </header>
                              </div>
                            </label>
                          </div>
                          <div>
                            <label className="relative cursor-pointer">
                              <input
                                type="radio"
                                className="peer sr-only"
                                name="hari_jadwal"
                                id="hari_jadwal"
                                value="kamis"
                              />
                              <div className="justify-center overflow-hidden rounded-xl bg-tint6 shadow-md ring ring-transparent peer-checked:bg-shade6 peer-checked:text-tint7 transition-all active:scale-95 peer-checked:ring-shade8">
                                <header className="px-2.5 py-2.5 items-center justify-center">
                                  <p className="text-m font-semibold tracking-wide  items-center justify-center">
                                    Kamis
                                  </p>
                                </header>
                              </div>
                            </label>
                          </div>
                          <div>
                            <label className="relative cursor-pointer">
                              <input
                                type="radio"
                                className="peer sr-only"
                                name="hari_jadwal"
                                id="hari_jadwal"
                                value="jumat"
                              />
                              <div className="justify-center overflow-hidden rounded-xl bg-tint6 shadow-md ring ring-transparent peer-checked:bg-shade6 peer-checked:text-tint7 transition-all active:scale-95 peer-checked:ring-shade8">
                                <header className="px-2.5 py-2.5 items-center justify-center">
                                  <p className="text-m font-semibold tracking-wide  items-center justify-center">
                                    Jumat
                                  </p>
                                </header>
                              </div>
                            </label>
                          </div>
                          <div>
                            <label className="relative cursor-pointer">
                              <input
                                type="radio"
                                className="peer sr-only"
                                name="jadwal"
                                value="sabtu"
                              />
                              <div className="justify-center overflow-hidden rounded-xl bg-tint6 shadow-md ring ring-transparent peer-checked:bg-shade6 peer-checked:text-tint7 transition-all active:scale-95 peer-checked:ring-shade8">
                                <header className="px-2.5 py-2.5 items-center justify-center">
                                  <p className="text-m font-semibold tracking-wide  items-center justify-center">
                                    Sabtu
                                  </p>
                                </header>
                              </div>
                            </label>
                          </div>
                          <div>
                            <label className="relative cursor-pointer">
                              <input
                                type="radio"
                                className="peer sr-only"
                                name="hari_jadwal"
                                id="hari_jadwal"
                                value="minggu"
                              />
                              <div className="justify-center overflow-hidden rounded-xl bg-tint6 shadow-md ring ring-transparent peer-checked:bg-shade6 peer-checked:text-tint7 transition-all active:scale-95 peer-checked:ring-shade8">
                                <header className="px-2.5 py-2.5 items-center justify-center">
                                  <p className="text-m font-semibold tracking-wide  items-center justify-center">
                                    Minggu
                                  </p>
                                </header>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-3">
                        <label className="font-bold text-l">Waktu Mulai</label>
                        <input
                          type="text"
                          name="waktu_mulai"
                          id="waktu_mulai"
                          className="flex h-auto p-2 rounded-xl w-full"
                          placeholder="JJ:MM"
                        />

                        <label className="font-bold text-l">
                          Waktu Selesai
                        </label>
                        <input
                          type="text"
                          name="waktu_selesai"
                          id="waktu_selesai"
                          className="flex h-auto p-2 rounded-xl w-full"
                          placeholder="JJ:MM"
                        />
                      </div>
                      <button
                        // onClick={handleSimpanClick}
                        className="h-11 bg-primary1 rounded-2xl p-2.5 px-6 justify-center items-center inline-flex font-semibold text-tint7 hover:bg-tint6 hover:text-shade7"
                      >
                        Simpan
                      </button>
                      <button onClick={handleCloseModal}>Close</button>
                    </Modal>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex items-end justify-center h-full">
            {(selectedPosisi === "Dokter" ||
              selectedPosisi === "Suster" ||
              selectedPosisi === "Apoteker") &&
              showAdditionalFields && (
                <button
                  className="rounded-2xl py-2.5 px-16 bg-primary1 font-Poppins font-semibold hover:bg-shade5"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
          </div>
        </form>
      </div>
    </div>
  );
}
