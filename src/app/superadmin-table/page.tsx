const head = [
  "Nama Pegawai",
  "Role",
  "Nomor Lisensi",
  "E-mail",
  "Jenis Poli",
  "Jadwal Praktik",
  "Aksi",
];
const rows = [
  {
    nama_pegawai: "Isti",
    role: "Super Admin",
    nomor_lisensi: "123456",
    email: "isti@gmail.com",
    jenis_poli: "Umum",
    jadwal_praktik: "Senin, 7:00-15:00",
  },
  {
    nama_pegawai: "Isti",
    role: "Super Admin",
    nomor_lisensi: "123456",
    email: "isti@gmail.com",
    jenis_poli: "Umum",
    jadwal_praktik: "Senin, 7:00-15:00",
  },
  {
    nama_pegawai: "Isti",
    role: "Super Admin",
    nomor_lisensi: "123456",
    email: "isti@gmail.com",
    jenis_poli: "Umum",
    jadwal_praktik: "Senin, 7:00-15:00",
  },
];
export default function Home() {
  return (
    <div className="bg-tint6 w-full h-screen flex flex-col">
    <div className="flex mr-20 mt-14">
                <div className="ml-auto">
                    <button className="px-12 py-4 bg-gray-100 rounded-[51px] shadow flex-col justify-start inline-flex hover:bg-slate-200">
                        <p className="text-neutral-900 text-2xl font-semibold font-['Poppins'] leading-9">Isti</p>
                        <p className="text-gray-700 text-xl font-normal font-['Poppins']">Super Admin</p>
                    </button>
                </div>
            </div>
      <div className="h-full w-full overflow-scroll p-16">
        <table className="w-full min-w-max table-auto text-center ">
          <thead className=" bg-shade1 ">
            <tr>
              {head.map((head) => (
                <th key={head} className="px-4 py-2">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(
              (
                {
                  nama_pegawai,
                  role,
                  nomor_lisensi,
                  email,
                  jenis_poli,
                  jadwal_praktik,
                },
                index
              ) => {
                const isLast = index === rows.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={nama_pegawai} className="odd:bg-tint4 even:bg-tint5 text-shade7 text-center" >
                    <td className="px-4 py-2">{nama_pegawai}</td>
                    <td className="px-4 py-2">{role}</td>
                    <td className="px-4 py-2">{nomor_lisensi}</td>
                    <td className="px-4 py-2">{email}</td>
                    <td className="px-4 py-2">{jenis_poli}</td>
                    <td className="px-4 py-2">{jadwal_praktik}</td>
                    <td className="px-4 py-2">
                    <a href="#" className="font-medium hover:text-blue-500 hover:underline">Edit</a>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
