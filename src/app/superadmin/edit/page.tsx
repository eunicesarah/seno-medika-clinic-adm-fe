"use client";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Chip from "react-chip";
import axios from "axios";
import { useSearchParams } from "next/navigation";

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
  const [user, setUser] = useState<any>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("user_id");
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");

  const handleOpenModal = (e:any) => {
    e.preventDefault();
    setIsModalOpen(true);
    setDateTimeStart("");
    setDateTimeEnd("");
  };

  const fetchDataUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user?find_by=id&target=${id}`);
      console.log("Response data:", response.data.data);
      if (response.data.status === "ok") {
        setUser(response.data.data);
      } else {
        console.error("Error fetching users:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const editUser = async (e:any) => {
    e.preventDefault();
    
    try {
      const req = await axios.patch('http://localhost:8080/user?change_type=name&change_by=id', { key: id?.toString(), value: nama });
      const req2 = await axios.patch('http://localhost:8080/user?change_type=email&change_by=id', { key: id?.toString(), value:   email });
      {
      console.log(req);
      console.log(req2);
      }
    } catch (error) {
      console.error("Error patch users:", error);
    }
  }

  useEffect(() => {
    fetchDataUser();
  }, []);
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
    <div className="bg-tint6 h-screen w-full justify-center gap-4 flex flex-col p-16">
      <h1 className="text-4xl font-bold font-Poppins text-shade6 " data-testid="title">
        Edit Data Pegawai
      </h1>
      <div className="flex flex-col items-left justify-left">
        <h3 className="text-shade6 font-Poppins font-semibold">Nama Pegawai: {user && <h4>{user.nama}</h4>}</h3>
      </div>
      <div className="flex flex-col items-left justify-left">
        <h3 className="text-shade6 font-Poppins font-semibold">E-mail</h3>
        <input
          name="email"
          className="w-96 h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
          placeholder="Masukkan perubahan alamat e-mail Anda"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-left justify-left">
        <h3 className="text-shade6 font-Poppins font-semibold">Nama Lengkap</h3>
        <input
          name="nama"
          className="w-96 h-12 px-7 py-3.5 left-0 top-9 bg-gray-100 rounded-2xl border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-shade7"
          placeholder="Masukkan perubahan nama lengkap Anda"
          onChange={(e) => setNama(e.target.value)}
        />
      </div>
      <div>
      <button
                  className="rounded-2xl py-2.5 px-16 bg-primary1 font-Poppins font-semibold hover:bg-shade5"
                  onClick={editUser}
                >
                  Submit
                </button>
      </div>
    </div>
  );
}
