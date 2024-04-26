import '@testing-library/jest-dom'
import { render, screen, fireEvent, getByTestId, getByAltText, getByLabelText, getByTitle, getByText} from '@testing-library/react'
import Resep from '@/app/dokter-pemeriksaan/resep'
import PemeriksaanDokter from '@/app/dokter-pemeriksaan/page';
import ResepMasuk from '@/app/dokter-pemeriksaan/resep_masuk';
import Keur from '@/app/dokter-pemeriksaan/keur';
import Diagnosa from '@/app/dokter-pemeriksaan/diagnosa';


// jest.mock('@/app/dokter-pemeriksaan/diagnosa', () => () => <div>Diagnosa mock</div>);
// jest.mock('@/app/dokter-pemeriksaan/resep', () => () => <div>Resep mock</div>);
// jest.mock('@/app/dokter-pemeriksaan/keur', () => () => <div>Keur mock</div>);
// jest.mock('@/app/dokter-pemeriksaan/resep_masuk', () => () => <div>ResepMasuk mock</div>);

describe('PemeriksaanDokter', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<PemeriksaanDokter />);
    expect(getByText('Pemeriksaan Fisik')).toBeInTheDocument();
    expect(getByText('Riwayat Pengobatan')).toBeInTheDocument();
  });

  it('changes tab on click', () => {
    const { getByTestId, getByTitle } = render(<PemeriksaanDokter />);
    
    const tesFisikButton = getByTestId('riwayatPengobatan');
    fireEvent.click(tesFisikButton);

    const diagnosaButton = getByTitle('Diagnosa');
    const resepButton = getByTitle('Resep');
    const keurButton = getByTitle('Keur');

    fireEvent.click(diagnosaButton);
    expect(diagnosaButton).toBeInTheDocument();

    fireEvent.click(resepButton);
    expect(resepButton).toBeInTheDocument();

    fireEvent.click(keurButton);
    expect(keurButton).toBeInTheDocument();
  });
});

describe('ResepMasuk', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<ResepMasuk />);
    expect(getByText('Ruang Tujuan')).toBeInTheDocument();
    expect(getByText('Status Obat')).toBeInTheDocument();
    expect(getByText('Tambah Obat')).toBeInTheDocument();
  });
});

describe('Keur', () => {
  it('renders without crashing', () => {
    const { getByText, getByPlaceholderText } = render(<Keur tanggal="2022-01-01" dokter="Dr. John Doe" />);
    expect(getByText('Tanggal')).toBeInTheDocument();
    expect(getByText('2022-01-01')).toBeInTheDocument();
    expect(getByText('Dokter / Tenaga Medis')).toBeInTheDocument();
    expect(getByText('Dr. John Doe')).toBeInTheDocument();
    expect(getByPlaceholderText('U001/SS-1/KPSM/III/2024')).toBeInTheDocument();
    expect(getByText('Tambahkan Keur')).toBeInTheDocument();
  });

  it('changes input value on type', () => {
    const { getByPlaceholderText } = render(<Keur tanggal="2022-01-01" dokter="Dr. John Doe" />);
    const noSuratInput = getByPlaceholderText('U001/SS-1/KPSM/III/2024') as HTMLInputElement;

    fireEvent.change(noSuratInput, { target: { value: 'U002/SS-2/KPSM/IV/2025' } });
    expect(noSuratInput.value).toBe('U002/SS-2/KPSM/IV/2025');
  });
  it('calculates days correctly', () => {
    const { getByLabelText, getByDisplayValue } = render(<Keur tanggal="2022-01-01" dokter="Dr. John Doe" />);
    const mulaiTanggalInput = getByLabelText(/Mulai Tanggal/i);
    const sampaiTanggalInput = getByLabelText(/Sampai Tanggal/i);

    fireEvent.change(mulaiTanggalInput, { target: { value: '2022-01-01' } });
    fireEvent.change(sampaiTanggalInput, { target: { value: '2022-01-10' } });

    const selamaInput = getByDisplayValue('9 hari');
    expect(selamaInput).toBeInTheDocument();
  });
});

describe('Diagnosa component', () => {
  it('renders all dropdowns with their respective labels', () => {
    const { getByText } = render(<Diagnosa />);
    
    expect(getByText('Diagnosa')).toBeInTheDocument();
    expect(getByText('Jenis')).toBeInTheDocument();
    expect(getByText('Kasus')).toBeInTheDocument();
    expect(getByText('Status Diagnosis')).toBeInTheDocument();
  });

  it('displays "Tambahkan Diagnosa" button', () => {
    const { getByText } = render(<Diagnosa />);
    
    expect(getByText(/Tambahkan Diagnosa/i)).toBeInTheDocument();
  });
});