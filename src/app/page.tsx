import Image from "next/image";
import mba_depan from "../../public/mba_depan.svg";
import dokter2 from "../../public/dokter2.svg";
import dokter from "../../public/dokter.svg";
import parkir from "../../public/parkir.svg";
import ruang_vip from "../../public/ruang_vip.svg";
import toko_kami from "../../public/toko_kami.svg"
import photobooth from "../../public/photobooth.svg"
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="min-h-screen  font-Poppins">
      <div className="bg-gradient-to-tr from-[#1C4033] to-[#5DB091] h-screen">
        <div className="flex flex-row-reverse ">
          <button className="bg-[#2F5849] text-white font-semibold py-3 px-8 mt-5 mb-[-20px] mr-5 rounded-3xl">LOGIN</button>
        </div>
        <div className="flex flex-col items-center justify-between p-20">
          <div className="flex flex-row items-center ">
            <div className=" flex flex-col items-center pt-8">
              <h1 className="text-6xl text-center font-bold text-tint7">PELAYANAN KESEHATAN <span className="text-tint6">RAMAH</span> DAN <span className="text-tint6">BERKUALITAS</span></h1>
              <h3 className="text-3xl text-center font-semibold my-10 text-tint7">Keselamatan dan kenyamanan pasien adalah prioritas utama kami. Dipandu oleh tenaga profesional yang berpengalaman, kami siap memberikan pelayanan medis yang aman dan berkualitas.</h3>
              <button className="text-2xl bg-shade4 py-5 px-7 text-white rounded-3xl font-semibold">BUAT JANJI</button>
            </div>
            <Image
            src={mba_depan}
            alt="MBA Depan"
            height={633}
            width={633}
            />
          </div>
        </div>
      </div>
      <div className="bg-tint7 h-screen">
        <div className="flex flex-col pt-[79px]">
          <h1 className="text-6xl text-center font-bold text-shade8">LAYANAN KAMI</h1>
          <div className="grid grid-cols-4 gap-20 text-shade4  mx-32 pt-24">
            <div className="bg-white border-none rounded-2xl drop-shadow-lg aspect-square flex flex-col items-center hover:text-white hover:bg-gradient-to-t from-[#327C61] to-[#70998A] " >
              <h1 className="text-3xl font-semibold pt-12 pb-10">Pelayanan Khitan</h1>
              <p className="px-4">Klinik Seno Medika Lebih Dari 45 Tahun Memberikan Pelayanan Khitanan Untuk Bayi, Anak Dan Dewasa.</p>
            </div>
            <div className="bg-white border-none rounded-2xl drop-shadow-lg aspect-square flex flex-col items-center hover:text-white hover:bg-gradient-to-t from-[#327C61] to-[#70998A]">
              <h1 className="text-3xl font-semibold pt-12 pb-10">Pelayanan Umum</h1>
              <p className="px-4">Klinik Seno Medika Memberikan Pelayanan Dokter Umum Untuk Anda. Dengan Tenaga Medis Yang Handal Dan Profesional Siap Melayani Anda.</p>
            </div>
            <div className="bg-white border-none rounded-2xl drop-shadow-lg aspect-square flex flex-col items-center hover:text-white hover:bg-gradient-to-t from-[#327C61] to-[#70998A]">
              <h1 className="text-3xl font-semibold pt-12 pb-10">Pelayanan Bidan</h1>
              <p className="px-4">Klinik Seno Medika menyediakan Layanan Komprehensif Bagi Wanita, Sejak Perencanaan Kehamilan Hingga Pascapersalinan.</p>
            </div>
            <div className="bg-white border-none rounded-2xl drop-shadow-lg aspect-square flex flex-col items-center hover:text-white hover:bg-gradient-to-t from-[#327C61] to-[#70998A]">
              <h1 className="text-3xl font-semibold pt-12 pb-10">Pelayanan Gigi</h1>
              <p className="px-4">Klinik Seno Medika Menyediakan Layanan Perawatan Gigi Komprehensif Untuk Mengatasi Berbagai Masalah Kesehatan Gigi Dan Mulut Anda.</p>
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
      <div className="relative overflow-hidden bg-tint7 h-[120vh]">
        <div className="absolute bottom-[-33.33%] left-1/2 transform translate-x-[-50%] w-[150vh] h-[120vh] rounded-full bg-gradient-to-t from-shade3 to-shade1 blur-[170px] justify-end"></div>
        <div className="relative flex flex-col pt-[79px] items-center h-full justify-between">
          <h1 className="text-6xl text-center font-bold text-shade8">FASILITAS KAMI</h1>
          <div className="grid grid-cols-2 gap-48 pt-48">
          <div className="relative">
            <Image
              src={photobooth}
              alt="parkir"
              height={350}
              width={350}
            />
            <p className="absolute top-32 left-28 font-poppins text-shade4 font-semibold text-2xl">Photobooth</p>
            <p className="absolute top-44 left-7 right-7 font-poppins text-shade4 text-xl text-center">Yuk Abadikan Momen Khitan Anak Anda Bersama Keluarga Di Photobooth Klinik Seno Medika</p>
          </div>
          <div className="relative">
            <Image
              src={parkir}
              alt="parkir"
              height={350}
              width={350}
            />
            <p className="absolute top-32 left-28 font-poppins text-shade4 font-semibold text-2xl">Parkir Luas</p>
            <p className="absolute top-44 left-7 right-7 font-poppins text-shade4 text-xl text-center">Kami Memiliki Tempat Parkir Yang Luas Sehingga Anda Tidak Perlu Khawatir Dalam Menyimpan Kendaraan Anda.</p>
          </div>
          </div>
          <div className="flex flex-row space-x-40 ">
            <div className="relative mt-36">
              <Image
                src={ruang_vip}
                alt="parkir"
                height={350}
                width={350}
              />
              <p className="absolute top-32 left-28 font-poppins text-shade4 font-semibold text-2xl">Ruang VIP</p>
              <p className="absolute top-44 left-7 right-7 font-poppins text-shade4 text-xl text-center">Kami Menyediakan Fasilitas Ruang VIP Untuk Menunjang Pelayanan Kami Demi Kebutuhan Anda.</p>
            </div>
              <Image
                src={dokter}
                alt="dokter"
                height={673}
                width={485}
                className=""
              />
            <div className="relative mt-36">
              <Image
                src={toko_kami}
                alt="parkir"
                height={350}
                width={350}
              />
              <p className="absolute top-32 left-28 font-poppins text-shade4 font-semibold text-2xl">Toko Kami</p>
              <p className="absolute top-44 left-7 right-7 font-poppins text-shade4 text-xl text-center">Yuk Ayah Bunda Bagi Yang Ingin Membelikan Hadiah Untuk Anda Bisa Di Toko Kami.</p>
            </div>

          </div>
        </div>
      </div>
      <div className="bg-tint7 h-screen ">
        <div className="flex flex-col pt-[79px] px-20">
          <h1 className="text-6xl text-center font-bold text-shade8">TENTANG KAMI</h1>
          <div className="flex flex-row pt-16">
          <Image
            src={dokter2}
            alt="MBA Depan"
            height={542}
            width={542}
            />
            <div className=" text-justify text-shade4 text-xl  leading-[30px] pl-10">
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
