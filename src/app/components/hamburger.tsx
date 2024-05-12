import { useState } from "react";
import Image from "next/image";
import Pill from "../../../public/Pill.png";
import Nurse from "../../../public/Nurse.png";
import Permanent from "../../../public/Permanent Job.png";
import Receipt from "../../../public/Receipt Terminal.png";
import Stethoscope from "../../../public/Stethoscope.png";
import AddUser from "../../../public/Add User Male.png";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex items-center justify-between font-Poppins ml-16">
      <nav>
        <section className="flex">
          <div
            className="space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-1 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-1 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-1 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-[#CADFD7]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center text-[#CADFD7] w-full">
              <li className="py-5 flex flex-row w-full items-center text-2xl pl-8 gap-4 hover:bg-shade6">
                <Image src={AddUser} alt="tambah akun"></Image>
                <a href="/superadmin/register" className="font-bold ">Tambahkan Akun Karyawan</a>
              </li>
              <li className="py-5 flex flex-row w-full items-center text-2xl pl-8 gap-4 hover:bg-shade6">
                <Image src={Permanent} alt="gambar dashboard frontoffice"></Image>
                <a href="/frontoffice" className="font-bold">Dashboard Front Office</a>
              </li>
              <li className="py-5 flex flex-row w-full items-center text-2xl pl-8 gap-4 hover:bg-shade6">
                <Image src={Nurse} alt="gambar dashboard perawat"></Image>
                <a href="/perawat" className="font-bold">Dashboard Perawat</a>
              </li>
              <li className="py-5 flex flex-row w-full items-center text-2xl pl-8 gap-4 hover:bg-shade6">
                <Image src={Stethoscope} alt="gambar dashboard dokter"></Image>
                <a href="/dokter" className="font-bold">Dashboard Dokter</a>
              </li>
              <li className="py-5 flex flex-row w-full items-center text-2xl pl-8 gap-4 hover:bg-shade6">
                <Image src={Pill} alt="gambar dashboard apoteker"></Image>
                <a href="/apoteker" className="font-bold">Dashboard Apoteker</a>
              </li>
              <li className="py-5 flex flex-row w-full items-center text-2xl pl-8 gap-4 hover:bg-shade6">
                <Image src={Receipt} alt="gambar dashboard kasir"></Image>
                <a href="/kasir" className="font-bold">Dashboard Kasir</a>
              </li>
            </ul>
          </div>
        </section>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 25%;
        height: 100vh;
        top: 0;
        left: 0;
        background: #274A3D;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
      }
    `}</style>
    </div>
  );
}
