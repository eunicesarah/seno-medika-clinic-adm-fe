describe('Register Pasien', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000/frontoffice/register');
  });

  it('displays the header correctly', () => {
    cy.get('[data-testid=logo]').should('exist');
    cy.get('[data-testid=title]').should('contain', 'REGISTRASI PASIEN');
  });

  it('fill form submission', () => {
    cy.get('[data-testid="input-name"]').type('Ahmad Nadil');
    cy.get('[data-testid="input-nik"]').type('330299110022992');
    cy.get('[data-testid="input-no-kk"]').type('3399112200');
    cy.get('[data-testid=dropdown-goldar]').click();
    cy.get('[data-testid=dropdown-goldar]').contains('AB').click();
    cy.get('[data-testid=gender]').contains('Laki-laki').click();
    cy.get('[data-testid=input-tempat-lahir]').type('Jakarta');
    cy.get('[data-testid=input-tanggal-lahir]').type('11/11/2000');
    cy.get('[data-testid=input-email]').type('ahmada@gmail.com');
    cy.get('[data-testid=input-phone]').type('08123456789');
    cy.get('[data-testid=input-provinsi]').click();
    cy.get('[data-testid=input-provinsi]').contains('ACEH').click();
    cy.get('[data-testid=input-kabupaten-kota]').click();
    cy.get('[data-testid=input-kabupaten-kota]').contains('KABUPATEN ACEH BARAT').click();
    cy.get('[data-testid=input-kecamatan]').click();
    cy.get('[data-testid=input-kecamatan]').contains('BUBON').click();
    cy.get('[data-testid=input-kelurahan]').click();
    cy.get('[data-testid=input-kelurahan]').contains('RAMBONG').click();
    cy.get('[data-testid=input-alamat]').type('Jalan Rambong');
    cy.get('[data-testid=input-warga-negara]').click();
    cy.get('[data-testid=input-warga-negara]').contains('WNI').click();
    cy.get('[data-testid=input-status-perkawinan]').click();
    cy.get('[data-testid=input-status-perkawinan]').contains('Belum Kawin').click();
    cy.get('[data-testid=input-pendidikan]').click();
    cy.get('[data-testid=input-pendidikan]').contains('S3').click();
    cy.get('[data-testid=input-agama]').click();
    cy.get('[data-testid=input-agama]').contains('Islam').click();
    cy.get('[data-testid=input-pekerjaan]').click();
    cy.get('[data-testid=input-pekerjaan]').type('Software Engineer');
    cy.get('[data-testid=input-nama-kontak-darurat]').type('Dealna');
    cy.get('[data-testid=input-nomor-kontak-darurat]').type('08121156789');
    cy.get('[data-testid=input-asuransi]').click();
    cy.get('[data-testid=input-asuransi]').contains('Tunai').click();
  });
});
