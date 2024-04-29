import { render, fireEvent, screen, waitFor, getByText } from '@testing-library/react';
import '@testing-library/jest-dom'
import TambahAntrian from '@/app/frontoffice/tambah-antrian/page';
import { useRouter } from 'next/navigation';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
global.alert = jest.fn();
describe('TambahAntrian', () => {
  it('renders correctly', () => {
    render(<TambahAntrian />);
    expect(screen.getByText('DAFTAR BEROBAT')).toBeInTheDocument()
  });
  it('should allow input in textarea fields', () => {
    render(<TambahAntrian />);
    const namaInput = screen.getByPlaceholderText('Masukkan nama pasien')
    const nikInput = screen.getByPlaceholderText('Masukkan NIK pasien')
    const submitButton = screen.getByText('Lanjut')


    fireEvent.change(namaInput, { target: { value: 'John Doe' } });
    fireEvent.change(nikInput, { target: { value: '1234567890' } });
    fireEvent.click(submitButton);
    }
    );
    
    it('should call alert when nama is empty', () => {
        render(<TambahAntrian />);
        const namaInput = screen.getByPlaceholderText('Masukkan nama pasien')
        const nikInput = screen.getByPlaceholderText('Masukkan NIK pasien')
        const submitButton = screen.getByText('Lanjut')
    
        fireEvent.change(namaInput, { target: { value: '' } });
        fireEvent.change(nikInput, { target: { value: '1234567890' } });
        fireEvent.click(submitButton);
    
        expect(global.alert).toHaveBeenCalledTimes(1);
        expect(global.alert).toHaveBeenCalledWith('Silahkan mengisi seluruh data yang dibutuhkan!');
    }

    );

    it ('should change selectedOption when poli is clicked', () => {
        render(<TambahAntrian />);
        
        const select = screen.getByTestId('dropdown-button');
        
        fireEvent.click(select);
        
       
        const dropdownElement = screen.getByText('Poli Umum');
        
        expect(dropdownElement).toBeInTheDocument();
        }
        );
    
        

        it('should call sendDataToApi when form is submitted with all fields filled', async () => {
         

            render(<TambahAntrian />);
            const namaInput = screen.getByPlaceholderText('Masukkan nama pasien')
            const nikInput = screen.getByPlaceholderText('Masukkan NIK pasien')
            const submitButton = screen.getByText('Lanjut')

            fireEvent.change(namaInput, { target: { value: 'John Doe' } });
            fireEvent.change(nikInput, { target: { value: '1234567890' } });


            const select = screen.getByTestId('dropdown-button');
            fireEvent.click(select);
            const dropdownElement = screen.getByText('Poli Umum');
            fireEvent.click(dropdownElement);
        
            fireEvent.click(submitButton);
        
            jest.mock('axios', () => ({
                post: jest.fn(() => Promise.resolve({ status: 200 })),
            }))
        });

});