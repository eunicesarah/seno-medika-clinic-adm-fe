"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const head = [
    "Nama Pegawai",
    "Role",
    "Nomor Lisensi",
    "E-mail",
    "Jenis Poli",
    "Jadwal Praktik",
    "Aksi",
];

type User = {
    user_id: number;
    nomor_lisensi: string;
    nama: string;
    email: string;
    role: string;
    jenis_poli: string;
    jadwal_praktik: string;
};

const Home = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/user?find_by=all&target=all"
            );
            console.log("Response data:", response.data);
            if (response.data.status === "ok") {
                setUsers(response.data.data);
            } else {
                console.error("Error fetching users:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (id: any) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/user?delete_by=id&target=${id}`
            );
            console.log("Response data:", response.data);
            if (response.data.status === "ok") {
                setUsers(users.filter((user) => user.user_id !== id));
            } else {
                console.error("Error deleting user:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="bg-tint6 w-full h-screen flex flex-col">
            <div className="flex mr-20 mt-14">
                <div className="ml-auto">
                    <button className="px-12 py-4 bg-gray-100 rounded-[51px] shadow flex-col justify-start inline-flex hover:bg-slate-200">
                        <p className="text-neutral-900 text-2xl font-semibold font-['Poppins'] leading-9">
                            Isti
                        </p>
                        <p className="text-gray-700 text-xl font-normal font-['Poppins']">
                            Super Admin
                        </p>
                    </button>
                </div>
            </div>
            <div className="h-full w-full overflow-scroll p-16">
                <table data-testid='table' className="w-full min-w-max table-auto text-center ">
                    <thead className=" bg-shade1 ">
                        <tr>
                            {head.map((heading) => (
                                <th key={heading} className="px-4 py-2">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(
                            ({
                                user_id,
                                nomor_lisensi,
                                nama,
                                email,
                                role,
                                jenis_poli,
                                jadwal_praktik,
                            }) => (
                                <tr
                                    key={user_id}
                                    className="odd:bg-tint4 even:bg-tint5 text-shade7 text-center"
                                >
                                    <td className="px-4 py-2">{nama}</td>
                                    <td className="px-4 py-2">{role}</td>
                                    <td className="px-4 py-2">
                                        {role === "Dokter" ||
                                        role === "Suster" ||
                                        role === "Apoteker"
                                            ? nomor_lisensi
                                            : "-"}
                                    </td>
                                    <td className="px-4 py-2">{email}</td>
                                    <td className="px-4 py-2">
                                        {role === "Dokter" ? jenis_poli : "-"}
                                    </td>
                                    <td className="px-4 py-2">
                                        {role === "Dokter"
                                            ? jadwal_praktik
                                            : "-"}
                                    </td>
                                    <td className="px-4 py-2">
                                        <a
                                            href={`superadmin-edit?${user_id}`} // Include user ID in the URL
                                            className="font-medium hover:text-blue-500 hover:underline mr-2"
                                        >
                                            Edit
                                        </a>
                                        <button
                                            className="font-medium hover:text-red-500 hover:underline ml-2"
                                            onClick={() => deleteUser(user_id)}
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
