describe('Superadmin Table', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:3000/superadmin-table');
    })

    it('displays the table correctly', () => {
        cy.get('[data-testid=table]').should('exist');
        cy.get('[data-testid=table] thead tr').within(() => {
            cy.get('th').should('have.length', 7);
            cy.get('th').eq(0).should('contain', 'Nama Pegawai');
            cy.get('th').eq(1).should('contain', 'Role');
            cy.get('th').eq(2).should('contain', 'Nomor Lisensi');
            cy.get('th').eq(3).should('contain', 'E-mail');
            cy.get('th').eq(4).should('contain', 'Jenis Poli');
            cy.get('th').eq(5).should('contain', 'Jadwal Praktik');
            cy.get('th').eq(6).should('contain', 'Aksi');
        });
    });
});