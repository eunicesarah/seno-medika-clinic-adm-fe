const Kasir = ['No', 'Nomor Antrean', 'Poli/Ruangan', 'Tanggal Masuk', 'No. eRM', 'Nama Pasien', 'Jenis Kelamin', 'Asuransi', ""];
// const Data = [
//   { nomor_antrian: '1', poli: 'umum', created_at: '2024-04-19', no_eRM: '12312312', nik: '33120099887777', nama_pasien: 'Salman', jenis_kelamin: 'laki-laki', tempat_tanggal_lahir: 'jawa, 18-4-2024', asuransi: 'tunai' }
// ];

function validateTableHeadersKasir() {
    cy.get('[data-testid=table] thead th').each(($th, index) => {
        expect($th).to.contain( Kasir[index]);
    });
}

// function validateTableRows() {
//   Data.forEach((data, index) => {
//     cy.get(`[data-testid=table] tbody tr:eq(${index})`).within(() => {
//       cy.get('td:eq(0)').should('contain', index + 1);
//       cy.get('td:eq(1)').should('contain', data.nomor_antrian);
//       cy.get('td:eq(2)').should('contain', data.poli);
//       cy.get('td:eq(3)').should('contain', data.created_at);
//       cy.get('td:eq(4)').should('contain', data.no_eRM);
//       cy.get('td:eq(5)').should('contain', data.nik);
//       cy.get('td:eq(6)').should('contain', data.nama_pasien);
//       cy.get('td:eq(7)').should('contain', data.jenis_kelamin);
//       cy.get('td:eq(8)').should('contain', data.tempat_tanggal_lahir);
//       cy.get('td:eq(9)').should('contain', data.asuransi);
//     });
//   });
// }

describe('Table Component Test', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:3000/kasir/dashboard');
    });

    it('renders table with   data', () => {
        cy.get('[data-testid=table]').should('exist');
        validateTableHeadersKasir();
        // validateTableRows();
    });
});