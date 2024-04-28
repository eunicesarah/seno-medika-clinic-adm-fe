"use client";
import Image from "next/image";
import mba_depan from "../../public/mba_depan.svg";
import dokter2 from "../../public/dokter2.svg";
import dokter from "../../public/dokter.svg";
import parkir from "../../public/parkir.svg";
import ruang_vip from "../../public/ruang_vip.svg";
import toko_kami from "../../public/toko_kami.svg"
import photobooth from "../../public/photobooth.svg"
import Footer from "./components/footer";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };
  return (
    <main className="min-h-screen  font-Poppins">
      <div className="bg-gradient-to-tr from-[#1C4033] to-[#5DB091] h-screen">
        <div className="flex flex-row-reverse ">
          <button onClick={handleLoginClick} className="bg-[#2F5849] text-white font-semibold py-3 px-8 mt-5 mb-[-20px] mr-5 rounded-3xl">LOGIN</button>
        </div>
        <div className="flex flex-col items-center justify-between py-20 px-16">
          <div className="flex flex-row items-center">
            <div className=" flex flex-col items-center pt-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold text-tint7">PELAYANAN KESEHATAN <span className="text-tint6">RAMAH</span> DAN <span className="text-tint6">BERKUALITAS</span></h1>
              <h3 className="text-xl md:text-2xl xl:text-3xl text-center font-semibold my-10 text-tint7">Keselamatan dan kenyamanan pasien adalah prioritas utama kami. Dipandu oleh tenaga profesional yang berpengalaman, kami siap memberikan pelayanan medis yang aman dan berkualitas.</h3>
              {/* <button className="text-base md:text-xl xl:text-2xl bg-shade4 py-5 px-7 text-white rounded-3xl font-semibold">BUAT JANJI</button> */}
            </div>
            <Image
            src={mba_depan}
            alt="MBA Depan"
            className="aspect-square hidden lg:block"
            />
          </div>
        </div>
      </div>
      <div className="bg-tint7 h-screen">
        <div className="flex flex-col pt-[79px]">
          <h1 className="text-3xl lg:text-6xl text-center font-bold text-shade8">LAYANAN KAMI</h1>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-9 md:gap-12 lg:gap-16 xl:gap-20 text-shade4 mx-4 sm:mx-10 lg-mx-15 xl:mx-32 pt-24">
            <div className="bg-white border-none rounded-2xl drop-shadow-lg aspect-square flex flex-col items-center hover:text-white hover:bg-gradient-to-t from-[#327C61] to-[#70998A] " >
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold pt-4 sm:pt-7 lg:pt-12 pb-3 sm:pb-4 lg:pb-10">Pelayanan Khitan</h1>
              <p className="px-3 lg:px-4 text-sm sm:text-base lg:text-xl text-center">Klinik Seno Medika Lebih Dari 45 Tahun Memberikan Pelayanan Khitanan Untuk Bayi, Anak Dan Dewasa.</p>
            </div>
            <div className="bg-white border-none rounded-2xl drop-shadow-lg aspect-square flex flex-col items-center hover:text-white hover:bg-gradient-to-t from-[#327C61] to-[#70998A]">
              <h1 className="text-xl sm:text-2xl xl:text-3xl font-semibold pt-4 sm:pt-7 lg:pt-12 pb-3 sm:pb-4 lg:pb-10">Pelayanan Umum</h1>
              <p className="px-3 lg:px-4 text-sm sm:text-base xl:text-xl text-center">Klinik Seno Medika Memberikan Pelayanan Dokter Umum Untuk Anda. Dengan Tenaga Medis Yang Handal Dan Profesional Siap Melayani Anda.</p>
            </div>
            <div className="bg-white border-none rounded-2xl drop-shadow-lg aspect-square flex flex-col items-center hover:text-white hover:bg-gradient-to-t from-[#327C61] to-[#70998A]">
              <h1 className="text-xl sm:text-2xl xl:text-3xl font-semibold pt-4 sm:pt-7 lg:pt-12 pb-3 sm:pb-4 lg:pb-10">Pelayanan Bidan</h1>
              <p className="px-3 lg:px-4 text-sm sm:text-base xl:text-xl text-center">Klinik Seno Medika menyediakan Layanan Komprehensif Bagi Wanita, Sejak Perencanaan Kehamilan Hingga Pascapersalinan.</p>
            </div>
            <div className="bg-white border-none rounded-2xl drop-shadow-lg aspect-square flex flex-col items-center hover:text-white hover:bg-gradient-to-t from-[#327C61] to-[#70998A]">
              <h1 className="text-xl sm:text-2xl xl:text-3xl font-semibold pt-4 sm:pt-7 lg:pt-12 pb-3 sm:pb-4 lg:pb-10">Pelayanan Gigi</h1>
              <p className="px-3 lg:px-4 text-sm sm:text-base xl:text-xl text-center">Klinik Seno Medika Menyediakan Layanan Perawatan Gigi Komprehensif Untuk Mengatasi Berbagai Masalah Kesehatan Gigi Dan Mulut Anda.</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-shade1 from-10%  to-tint7 to-100% h-[150vh]"> */}
      {/* <div className="bg-tint7 h-[150vh]">
        <div className="flex flex-col pt-[79px] items-center">
          <h1 className="text-6xl text-center font-bold text-shade8">FASILITAS KAMI</h1>
          <Image
            src={dokter}
            alt="dokter"
            height={673}
            width={485}
            />
          
          <div className="w-[700px] h-[700px] rounded-full bg-gradient-to-b from-[#1C4033] to-[#5DB091] blur-[120px] justify-end"></div>
        </div>
      </div> */}
      <div className="relative overflow-hidden bg-tint7 h-screen lg:hidden">
        <div className="absolute bottom-[-33.33%] left-1/2 transform translate-x-[-50%] w-[60vh] h-[60vh] rounded-full bg-gradient-to-t from-shade2 to-shade1 blur-[170px] justify-end"></div>
        <div className="relative flex flex-col pt-20 items-center h-full justify-between">
          <h1 className="text-3xl lg:text-6xl text-center font-bold text-shade8 mb-10">FASILITAS KAMI</h1>
          <div className="flex flex-col justify-between items-center">
            <div className="grid grid-cols-2 gap-8 pb-10">
              <div className="relative">
                <Image
                  src={photobooth}
                  alt="parkir"
                  className="w-40 shadow-lg"
                  />
                <p className="absolute font-poppins text-shade4 font-semibold left-10 top-11 text-base lg:text-2xl">Photobooth</p>
                <p className="absolute font-poppins text-shade4 left-2 right-2 top-16 text-xs lg:text-xl text-center">Yuk Abadikan Momen Khitan Anak Anda Bersama Keluarga Di Photobooth Klinik Seno Medika.</p>
              </div>
              <div className="relative">
                <Image
                  src={parkir}
                  alt="parkir"
                  className="w-40 shadow-lg"
                  />
                <p className="absolute font-poppins text-shade4 font-semibold left-10 top-11 text-base lg:text-2xl">Parkir Luas</p>
                <p className="absolute font-poppins text-shade4 left-2 right-2 top-16 text-xs lg:text-xl text-center">Kami Memiliki Tempat Parkir Yang Luas, Anda Tidak Perlu Khawatir Dalam Menyimpan Kendaraan Anda.</p>
              </div>
              <div className="relative">
                <Image
                  src={ruang_vip}
                  alt="parkir"
                  className="w-40 shadow-lg"
                  />
                <p className="absolute font-poppins text-shade4 font-semibold left-10 top-11 text-base lg:text-2xl">Ruang VIP</p>
                <p className="absolute font-poppins text-shade4 left-2 right-2 top-16 text-xs lg:text-xl text-center">Kami Menyediakan Fasilitas Ruang VIP Untuk Menunjang Pelayanan Kami Demi Kebutuhan Anda.</p>
              </div>
              <div className="relative">
                <Image
                  src={toko_kami}
                  alt="parkir"
                  className="w-40 shadow-lg"
                  />
                <p className="absolute font-poppins text-shade4 font-semibold left-10 top-11 text-base lg:text-2xl">Toko Kami</p>
                <p className="absolute font-poppins text-shade4 left-2 right-2 top-16 text-xs lg:text-xl text-center">Yuk Ayah Bunda Bagi Yang Ingin Membelikan Hadiah Untuk Anda Bisa Di Toko Kami.</p>
              </div>

            </div>
            <Image
                src={dokter}
                alt="dokter"
                className="h-96"
              />
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden bg-tint7 h-[120vh] hidden lg:block">
        <div className="absolute bottom-[-33.33%] left-1/2 transform translate-x-[-50%] w-[150vh] h-[120vh] rounded-full bg-gradient-to-t from-shade2 to-shade1 blur-[170px] justify-end"></div>
        <div className="relative flex flex-col pt-[79px] items-center h-full justify-between">
          <h1 className="text-6xl text-center font-bold text-shade8">FASILITAS KAMI</h1>
          <div className="grid grid-cols-2 gap-30 xl:gap-48 pt-30">
          <div className="relative">
            <Image
              src={photobooth}
              alt="parkir"
              className="h-60 xl:h-80"
            />
            <p className="absolute top-24  xl:top-32 left-28 font-poppins text-shade4 font-semibold text-2xl">Photobooth</p>
            <p className="absolute top-32 left-11 right-11 xl:top-44 xl:left-7 xl:right-7 font-poppins text-shade4 text-lg xl:text-xl text-center">Yuk Abadikan Momen Khitan Anak Anda Bersama Keluarga Di Photobooth Klinik Seno Medika</p>
          </div>
          <div className="relative">
            <Image
              src={parkir}
              alt="parkir"
              className="h-60 xl:h-80"
            />
            <p className="absolute top-24  xl:top-32 left-28 font-poppins text-shade4 font-semibold text-2xl">Parkir Luas</p>
            <p className="absolute top-32 left-11 right-11 xl:top-44 xl:left-7 xl:right-7 font-poppins text-shade4 text-lg xl:text-xl text-center">Kami Memiliki Tempat Parkir Yang Luas Sehingga Anda Tidak Perlu Khawatir Dalam Menyimpan Kendaraan Anda.</p>
          </div>
          </div>
          <div className="flex flex-row space-x-20 xl:space-x-40 ">
            <div className="relative mt-36">
              <Image
                src={ruang_vip}
                alt="parkir"
                className="h-60 xl:h-80"
              />
              <p className="absolute top-24  xl:top-32 left-28 font-poppins text-shade4 font-semibold text-2xl">Ruang VIP</p>
              <p className="absolute top-32 left-11 right-11 xl:top-44 xl:left-7 xl:right-7 font-poppins text-shade4 text-lg xl:text-xl text-center">Kami Menyediakan Fasilitas Ruang VIP Untuk Menunjang Pelayanan Kami Demi Kebutuhan Anda.</p>
            </div>
              <Image
                src={dokter}
                alt="dokter"
                className="h-[500px]"
              />
            <div className="relative mt-36">
              <Image
                src={toko_kami}
                alt="parkir"
                className="h-60 xl:h-80"
              />
              <p className="absolute top-24  xl:top-32 left-28 font-poppins text-shade4 font-semibold text-2xl">Toko Kami</p>
              <p className="absolute top-32 left-11 right-11 xl:top-44 xl:left-7 xl:right-7 font-poppins text-shade4 text-lg xl:text-xl text-center">Yuk Ayah Bunda Bagi Yang Ingin Membelikan Hadiah Untuk Anda Bisa Di Toko Kami.</p>
            </div>

          </div>
        </div>
      </div>
      <div className="bg-tint7 h-screen ">
        <div className="flex flex-col pt-[79px] px-10 xl:px-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold text-shade8">TENTANG KAMI</h1>
          <div className="flex flex-col items-center lg:flex-row pt-4 xl:pt-16 ">
          <Image
            src={dokter2}
            alt="MBA Depan"
            className="w-60 lg:w-96"
            />
            <div className="text-justify text-shade4 text-xs pt-5 md:text-base xl:text-xl  xl:leading-[30px] lg:pl-10">
              Klinik Seno Medika didirikan pada tahun 1975 oleh dr. H. Mukadji Seno., Sp. Rad (K) Onk Rad yang terletak di Jl. Ahmad Yani no 677, Bandung. Sejak awal, Klinik Seno Medika merupakan klinik yang khusus melayani khitan / sirkumsisi.
              <br/>
              <br/>
              Klinik Seno medika memberikan pelayanan yang aman karena ditunjang oleh tenaga profesional yang berpengalaman, fasilitas dan sarana prasarana yang selalu menjadi perhatian kami untuk menjaga kenyamanan pasien dan keluarga, Klinik Seno Medika juga mengutamakan keramahan terhadap pasien dan keluarga dalam memberikan informasi dan melayani pasien dan keluarga sehingga memberikan pengalaman yang menyenangkan selama proses khitan.
              <br/>
               <br/>
              Saat ini Klinik Seno Medika telah mengembangkan pelayanan kesehatan yang cukup signifikan selain khitan, yaitu pelayanan pelayanan dokter umum, dokter gigi, dan bidan. Klinik Seno Medika didukung oleh dokter dan tim medis yang berpengalaman dan didukung oleh tenaga profesional lainnya. Selama lebih dari 45 tahun, Klinik Seno Medika telah menangani berbagai macam pasien dari berbagai kalangan dan usia, dan kami berkomitmen akan terus meningkatkan kualitas dan fasilitas pelayanannya serta akan terus memenuhi kebutuhan masyarakat akan ketersediaan layanan kesehatan.
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  );
}
