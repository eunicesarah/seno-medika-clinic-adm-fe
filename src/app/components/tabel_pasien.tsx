import React from 'react';

interface TableProps {
    data: Array<{
      no: number;
      tanggal_masuk: string;
      nama: string;
      no_antrean: number;
      jenis_pasien: string;
    }>;
  }


const Table: React.FC<TableProps> = ({ data }) => {
    return (
      <table className=' ml-20 mr-20 w-11/12 mb-14'>
        <thead>
          <tr className=' bg-shade1 h-16 font-poppins font-semibold text-shade8 text-left'>
            <th className=' text-center'>No</th>
            <th>Tanggal Masuk</th>
            <th>Nama</th>
            <th>No Antrean</th>
            <th>Jenis Pasien</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.no} className={`h-16 font-poppins text-shade8 text-left font-medium hover:bg-shade4 ${
                item.no % 2 === 0 ? 'bg-tint4' : 'bg-tint5'
              }`}>
              <td className=' w-28 text-center'>{item.no}</td>
              <td className=' w-60'>{item.tanggal_masuk}</td>
              <td className=' w-96'>{item.nama}</td>
              <td>{item.no_antrean}</td>
              <td>{item.jenis_pasien}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;
  