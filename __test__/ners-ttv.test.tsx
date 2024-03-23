import '@testing-library/jest-dom'
import { render, screen, fireEvent} from '@testing-library/react'
import Dashboard from '@/app/ners-ttv/page'

describe('Dashboard', () => {
  it('should render the dashboard page', () => {
    render(<Dashboard />)
    expect(screen.getByText('TANDA-TANDA VITAL PASIEN')).toBeInTheDocument()
  })

  it('renders with dropdown and selects an option', () => {
    const { getByText } = render(<Dashboard />);

    expect(getByText('Tenaga Medis')).toBeInTheDocument();
    expect(getByText('Asisten Perawat')).toBeInTheDocument();
    expect(getByText('Keluhan Utama')).toBeInTheDocument();
    expect(getByText('Keluhan Tambahan')).toBeInTheDocument();
    expect(getByText('Lama Sakit')).toBeInTheDocument();

  });

  it('should allow input in textarea fields', () => {
    const { getByLabelText } = render(<Dashboard />);
    const keluhanUtamaTextarea = getByLabelText(/Keluhan Utama/) as HTMLTextAreaElement;

    fireEvent.change(keluhanUtamaTextarea, { target: { value: 'Test keluhan utama' } });

    expect(keluhanUtamaTextarea.value).toBe('Test keluhan utama');
  });

  it('should allow input in textarea fields', () => {
    const { getByLabelText } = render(<Dashboard />);
    const keluhanTambahanTextarea = getByLabelText(/Keluhan Tambahan/) as HTMLTextAreaElement;

    fireEvent.change(keluhanTambahanTextarea, { target: { value: 'Test keluhan tambahan' } });

    expect(keluhanTambahanTextarea.value).toBe('Test keluhan tambahan');
  });

  it('should allow selecting radio button options', () => {
    render(<Dashboard />);

    const yaRadio = screen.getByLabelText('Ya') as HTMLInputElement;
    fireEvent.click(yaRadio);

    expect(yaRadio.checked).toBe(true);
    expect((screen.getByLabelText('Tidak') as HTMLInputElement).checked).toBe(false);

    const tidakRadio = screen.getByLabelText('Tidak') as HTMLInputElement;
    fireEvent.click(tidakRadio);

    expect(tidakRadio.checked).toBe(true);
    expect((screen.getByLabelText('Ya') as HTMLInputElement).checked).toBe(false);
  });

});
