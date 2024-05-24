describe('Superadmin', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
    });

    // Login
    it('Login', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('[data-testid="input-email"]').type('superadmin@gmail.com');
        cy.get('[data-testid="input-password"]').type('123123qw');
        cy.get('[data-testid="button-login"]').click();
    });

    // Register
    it('Register Front Officer', () => {
        cy.visit('http://localhost:3000/superadmin/register');
        cy.get('[data-testid="input-name"]').type('FO Ahmad');
        cy.get('[data-testid="input-email"]').type('fometiw@gmail.com');
        cy.get('[data-testid="input-password"]').type('123123qw');
        cy.get('[data-testid="select-role"]').select('Front Officer');
        cy.get('[data-testid="button-submit1"]').click();
    });
    it('Register Suster', () => {
        cy.visit('http://localhost:3000/superadmin/register');
        cy.get('[data-testid="input-name"]').type('Nurse Azmia');
        cy.get('[data-testid="input-email"]').type('nuazmia@gmail.com');
        cy.get('[data-testid="input-password"]').type('123123qw');
        cy.get('[data-testid="select-role"]').select('Suster');
        cy.get('[data-testid="input-lisensi"]').type('11111111');
        cy.get('[data-testid="button-submit2"]').click();
    });
    it('Register Dokter', () => {
        cy.visit('http://localhost:3000/superadmin/register');
        cy.get('[data-testid="input-name"]').type('Doctor Rifa');
        cy.get('[data-testid="input-email"]').type('dorifa@gmail.com');
        cy.get('[data-testid="input-password"]').type('123123qw');
        cy.get('[data-testid="select-role"]').select('Dokter');
        cy.get('[data-testid="input-lisensi"]').type('22222222');
        cy.get('[data-testid="select-poli"]').select('Poli Umum');
        cy.get('[data-testid="jadwal"]').click();
        cy.get('[data-testid="hari"]').click();
        cy.get('[data-testid="shift"]').click();
        cy.get('[data-testid="button-simpan"]').click();
        cy.get('[data-testid="button-close"]').click();
        cy.get('[data-testid="button-submit2"]').click();
    });
    it('Register Apoteker', () => {
        cy.visit('http://localhost:3000/superadmin/register');
        cy.get('[data-testid="input-name"]').type('Apoteker Just');
        cy.get('[data-testid="input-email"]').type('apjust@gmail.com');
        cy.get('[data-testid="input-password"]').type('123123qw');
        cy.get('[data-testid="select-role"]').select('Apoteker');
        cy.get('[data-testid="input-lisensi"]').type('33333333');
        cy.get('[data-testid="button-submit2"]').click();
    });
    it('Register Kasir', () => {
        cy.visit('http://localhost:3000/superadmin/register');
        cy.get('[data-testid="input-name"]').type('Cashier Rizky');
        cy.get('[data-testid="input-email"]').type('carizky@gmail.com');
        cy.get('[data-testid="input-password"]').type('123123qw');
        cy.get('[data-testid="select-role"]').select('Kasir');
        cy.get('[data-testid="button-submit1"]').click();
    });
});