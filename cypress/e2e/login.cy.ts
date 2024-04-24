describe('Login', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:3000/login');
    });

    it('displays the header correctly', () => {
        cy.get('[data-testid=title]').should('contain', 'MASUK');
    });

    it('fill form submission', () => {
        cy.get('[data-testid="input-email"]').type('ahmada@gmail.com');
        cy.get('[data-testid="input-password"]').type('123123qw');
    });
});