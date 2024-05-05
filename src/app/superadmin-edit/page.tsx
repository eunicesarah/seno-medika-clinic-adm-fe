"use client";
import { useState } from "react";
import Modal from "react-modal";
import Chip from "react-chip";

export default function Edit() {
  type Schedule = {
    hari: string;
    waktuMulai: string;
    waktuSelesai: string;
  };
  const [dateTimeStart, setDateTimeStart] = useState<String>("");
  const [dateTimeEnd, setDateTimeEnd] = useState<String>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const handleOpenModal = (e:any) => {
    e.preventDefault();
    setIsModalOpen(true);
    setDateTimeStart("");
    setDateTimeEnd("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
//   const handleSimpanClick = (schedule) => {
//     console.log(schedule);
//     // Get the values of "hari", "waktu mulai", and "waktu selesai"
//     // This is just a placeholder, replace it with your actual logic

//     const hari = document.querySelector(
//       'input[name="hari_jadwal"]:checked'
//     ).value;
//     const waktuMulai = document.getElementById("waktu_mulai]").value;
//     const waktuSelesai = document.getElementById("waktu_selesai").value;

//     // Add the new schedule to the state
//     setSchedules((prevSchedules) => [
//       ...prevSchedules,
//       { hari, waktuMulai, waktuSelesai },
//     ]);
//   };

//   const handleDelete = (scheduleToDelete) => () => {
//     setSchedules((prevSchedules) =>
//       prevSchedules.filter((schedule) => schedule !== scheduleToDelete)
//     );
//   };

  return (
    <div className="bg-tint6 h-screen w-full items-center justify-center gap-4 flex flex-col">
      <h1 className="text-4xl font-bold font-Poppins text-shade6 " data-testid="title">
        Edit Data Pegawai
      </h1>
      <div className="flex flex-col items-left justify-left">
        <h3 className="text-shade6 font-Poppins font-semibold">E-mail</h3>
        <input
          className="w-96 h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
          placeholder="Masukkan alamat e-mail Anda"
        />
      </div>
      <div className="items-left justify-left flex flex-col">
        <label className="pl-4 mb-1 block text-l text-shade6 font-Poppins font-semibold">
          Jadwal
        </label>
        <div>
          {schedules.map((schedule, index) => (
            <Chip
              key={index}
              label={`${schedule.hari}, ${schedule.waktuMulai} - ${schedule.waktuSelesai}`}
            //   onDelete={handleDelete(schedule)}
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

            <label className="font-bold text-l">Waktu Selesai</label>
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
      <div>
      <button
                  className="rounded-2xl py-2.5 px-16 bg-primary1 font-Poppins font-semibold hover:bg-shade5"
                >
                  Submit
                </button>
      </div>
    </div>
  );
}
