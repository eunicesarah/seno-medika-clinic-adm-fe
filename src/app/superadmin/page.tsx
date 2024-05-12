"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserButton from "../components/user_button";
import Nav from "../components/hamburger";

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
    const [size, setSize] = useState(0);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/user?find_by=dashboard"
            );
            console.log("Response data:", response.data);
            if (response.data.status === "ok") {
                setUsers(response.data.data.user);
                setSize(response.data.data.size);
                totalPage(response.data.data.size);
            } else {
                console.error("Error fetching users:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const totalPage = (size: number) => {
        const totalPage = Math.ceil(size / 10);
        setPage(totalPage);
    };

    const handlePageChange = async (page: number) => {
        setCurrentPage(page);
        try {
            const response = await axios.get(
                `http://localhost:8080/user?find_by=dashboard&page=${page}`
            );
            console.log("Response data:", response.data);
            if (response.data.status === "ok") {
                setUsers(response.data.data.user);
                setSize(response.data.data.size);
                totalPage(response.data.data.size);
            } else {
                console.error("Error fetching users:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

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
        <div className="bg-tint6 w-full min-h-screen flex flex-col">
            <div className="flex mr-20 mt-14">
                <Nav />
                <UserButton />
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
                        {users && users.map(
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
                                            href={`/superadmin/edit?${user_id}`} // Include user ID in the URL
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
                <div className="flex justify-center mt-4">
                    <ul className="flex flex-row">
                        {currentPage > 1 && (
                            <li>
                                <button 
                                    onClick={() => handlePageChange(currentPage - 1)} 
                                    className="mr-3 text-black bg-white px-4 py-2 rounded-3xl"
                                >
                                    {"<"}
                                </button>
                            </li>
                        )}
                        {Array.from({ length: page }, (_, index) => (
                            <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                                <button onClick={() => handlePageChange(index + 1)} className={` mr-3 text-black bg-white px-4 py-2 rounded-3xl ${currentPage === index + 1 ? 'font-bold' : 'font-normal'}`}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        {currentPage < page && (
                            <li>
                                <button 
                                    onClick={() => handlePageChange(currentPage + 1)} 
                                    className="mr-3 text-black bg-white px-4 py-2 rounded-3xl"
                                >
                                    {">"}
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
