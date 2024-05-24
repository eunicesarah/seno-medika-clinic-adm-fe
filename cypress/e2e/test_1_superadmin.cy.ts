describe('Superadmin', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        // cy.visit('http://localhost:3000/login');
        // cy.visit('http://localhost:3000/superadmin/register');
        // cy.visit('http://localhost:3000/superadmin');
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

    // Dashboard
    // it('displays the table correctly', () => {
    //     cy.get('[data-testid=table]').should('exist');
    //     cy.get('[data-testid=table] thead tr').within(() => {
    //         cy.get('th').should('have.length', 4);
    //         cy.get('th').eq(0).should('contain', 'Nama Pegawai');
    //         cy.get('th').eq(1).should('contain', 'Role');
    //         cy.get('th').eq(2).should('contain', 'E-mail');
    //         cy.get('th').eq(3).should('contain', 'Aksi');
    //     });
    // });
});