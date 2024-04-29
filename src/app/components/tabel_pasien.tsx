import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import test from 'node:test';

interface TableProps {
    data: Array<{
      antrian_id: number;
      pasien_id: number;
      nomor_antrian: number;
      status: boolean;
      created_at: string;
      instalasi: string;
      poli: string;
    }>;

    pasien: Array<{
      pasien_id: number;
      nama: string;
      penjamin: string;
    }>
  }

  function formatUpdatedAtToDDMMYYYY(timestamp:string) {
    const updatedAtDate = new Date(timestamp);
    const day = updatedAtDate.getDate().toString().padStart(2, '0');
    const month = (updatedAtDate.getMonth() + 1).toString().padStart(2, '0');
    const year = updatedAtDate.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  const Table: React.FC<TableProps> = ({ data, pasien }) => {

    console.log(pasien)
    console.log(data)
  
    return (
      <table className='ml-20 mr-20 w-11/12 mb-14'>
        <thead>
          <tr className='bg-shade1 h-16 font-Poppins font-semibold text-white text-center'>
            <th className='text-center'>No</th>
            <th>Tanggal Masuk</th>
            <th>Id Pasien</th>
            <th>Nama</th>
            <th>No Antrean</th>
            <th>Jenis Pasien</th>
            <th>Poli</th>
            <th>Instalasi</th>
          </tr>
        </thead>
        <tbody>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <tr
              key={item.antrian_id}
              className={`h-16 font-Poppins text-shade8 text-center font-medium hover:bg-shade4 hover:text-white ${
                item.antrian_id % 2 === 0 ? 'bg-tint4' : 'bg-tint5'
              }`}
            >
              <td className='w-28 text-center'>{item.nomor_antrian}</td>
              <td className='w-60'>{formatUpdatedAtToDDMMYYYY(item.created_at)}</td>
              <td className='w-40'>{item.pasien_id}</td>
              <td className=' w-72'>{pasien[index]?.nama}</td>
              <td className='w-32'>{item.nomor_antrian}</td>
              <td className=' w-60'>{pasien[index]?.penjamin}</td>
              <td className=' w-44'>{item.poli}</td>
              <td className=' w-40'>{item.instalasi}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={9} className='text-center h-16 font-Poppins text-shade8 font-medium hover:bg-shade4 hover:text-white'>
              Tidak ada data.
            </td>
          </tr>
        )}
        </tbody>
      </table>
    );
  };
  
  export default Table;