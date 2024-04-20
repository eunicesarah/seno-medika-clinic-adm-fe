import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Dashboard from '@/app/kasir/detail-pembayaran/page';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Detail Pembayaran', () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } });
    });

    it('renders correctly', async () => {
        render(<Dashboard />);
        expect(screen.getByText('DETAIL PEMBAYARAN')).toBeInTheDocument();
    });

});
