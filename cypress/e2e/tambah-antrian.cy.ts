describe('Tambah Antrian', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:3000/tambah-antrian');
    });

    it('displays the header correctly', () => {
        cy.get('[data-testid=title]').should('contain', 'DAFTAR BEROBAT');
        cy.get('[data-testid=desc]').should('contain', 'Jika baru pertama kali mendaftar, silahkan ke menu pendaftaran pasien');
    });

    it('fill form submission', () => {
        cy.get('[data-testid="input-name"]').type('Ahmad Nadil');
        cy.get('[data-testid="input-nik"]').type('330299110022992');
        cy.get('[data-testid=dropdown-poli]').click();
        cy.get('[data-testid=dropdown-poli]').contains('Poli Umum').click();
    });
});