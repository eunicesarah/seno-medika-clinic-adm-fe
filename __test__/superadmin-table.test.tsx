import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/superadmin-table/page'; // replace with your actual component path
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe('Home', () => {
    it('renders the table headers', async () => {
        const users = [
            {
                user_id: 1,
                nomor_lisensi: '123',
                nama: 'Test User',
                email: 'test@example.com',
                role: 'Dokter',
                jenis_poli: 'Umum',
                jadwal_praktik: 'Monday',
            },
        ];

        mockedAxios.get.mockResolvedValueOnce({
            data: {
              status: 'ok',
              data: users,
            },
          });

        await act(async () => {
            render(<Home />);
        });

        const headers = [
            "Nama Pegawai",
            "Role",
            "Nomor Lisensi",
            "E-mail",
            "Jenis Poli",
            "Jadwal Praktik",
        ];
        headers.forEach(header => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });

        // Check if user data is rendered
        // expect(screen.getByText('Test User')).toBeInTheDocument();
        // expect(screen.getByText('Dokter')).toBeInTheDocument();
        // expect(screen.getByText('123')).toBeInTheDocument();
        // expect(screen.getByText('test@example.com')).toBeInTheDocument();
        // expect(screen.getByText('Umum')).toBeInTheDocument();
    });
});