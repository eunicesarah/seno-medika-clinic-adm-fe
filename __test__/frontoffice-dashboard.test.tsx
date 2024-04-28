import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Dashboard from '@/app/frontoffice/dashboard/page';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Front Office Dashboard', () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } });
    });

    it('renders correctly', async () => {
        render(<Dashboard />);
        expect(screen.getByText('DAFTAR ANTREAN')).toBeInTheDocument();
        await waitFor(() => expect(screen.getByText('Total Antrian')).toBeInTheDocument());
    });

    it('fetches data on load', async () => {
        render(<Dashboard />);
        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8080/antrian'));
    });

    // it('displays total queue count', async () => {
    //     mockedAxios.get.mockResolvedValueOnce({ data: { data: [{ pasien_id: 1 }] } });
    //     render(<Dashboard />);
    //     await waitFor(() => expect(screen.getByText('1')).toBeInTheDocument());
    // });

    // it('displays queue table when data is present', async () => {
    //     mockedAxios.get.mockResolvedValueOnce({ data: { data: [{ pasien_id: 1 }] } });
    //     render(<Dashboard />);
    //     await waitFor(() => expect(screen.getByTestId('queue-table')).toBeInTheDocument());
    // });

    it('opens popup when "Tambah Pasien" button is clicked', async () => {
        render(<Dashboard />);
        fireEvent.click(screen.getByText('Tambah Pasien'));
        await waitFor(() => expect(screen.getByText('Pasien Sudah Terdaftar')).toBeInTheDocument());
    });
});
