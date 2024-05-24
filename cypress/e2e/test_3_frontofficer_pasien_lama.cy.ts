describe('Front Officer', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:3000/login');
    });

    it('displays the header correctly', () => {
        cy.get('[data-testid=title]').should('contain', 'MASUK');
    });

    it('register registered patient', () => {
        cy.get('[data-testid="input-email"]').type('foahmada@gmail.com');
        cy.get('[data-testid="input-password"]').type('123123qw');
        cy.get('[data-testid="button-login"]').click();
        cy.get('[data-testid="button-tambah-pasien"]').click();
        cy.get('[data-testid="pasien-lama"]').click();
        cy.get('[data-testid="input-name"]').type('Cantika');
        cy.get('[data-testid="input-nik"]').type('0000000001883649');
        cy.get('[data-testid=dropdown-poli]').click();
        cy.get('[data-testid=dropdown-poli]').contains('Poli Umum Shift Pagi').click();
        cy.get('[data-testid="button-lanjut"]').click();

    });
});
