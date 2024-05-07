describe('Superadmin Register', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:3000/superadmin/register');
    });

    it('displays the header correctly', () => {
        cy.get('[data-testid=title]').should('contain', 'REGISTRASI');
    });

    it('fill form submission', () => {
        cy.get('[data-testid="input-name"]').type('FO Ahmad Nadil');
        cy.get('[data-testid="input-email"]').type('foahmada@gmail.com');
        cy.get('[data-testid="input-password"]').type('123123qw');
        cy.get('[data-testid="select-role"]').select('Front Officer');
    });
});