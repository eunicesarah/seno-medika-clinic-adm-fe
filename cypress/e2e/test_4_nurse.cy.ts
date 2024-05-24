describe('Nurse', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:3000/login');
    });

    it('displays the header correctly', () => {
        cy.get('[data-testid=title]').should('contain', 'MASUK');
    });

    it('Input TTV', () => {
        cy.get('[data-testid="input-email"]').type('nuazmia@gmail.com');
        cy.get('[data-testid="input-password"]').type('123123qw');
        cy.get('[data-testid="button-login"]').click();
        cy.get('[data-testid="ttv-link"]').click();
        cy.get('[data-testid="tenaga-medis"]').click();
        cy.get('[data-testid="tenaga-medis"]').contains('dr. Doctor Rifa').click();
        cy.get('[data-testid="asisten-perawat"]').click();
        cy.get('[data-testid="asisten-perawat"]').contains('sus. Nurse Azmia').click();
        cy.get('[data-testid="keluhan-utama"]').type('Sakit kepala');
        cy.get('[data-testid="keluhan-tambahan"]').type('Sakit perut');
        cy.get('[data-testid="lama-sakit-tahun"]').type('1');
        cy.get('[data-testid="lama-sakit-bulan"]').type('1');
        cy.get('[data-testid="lama-sakit-hari"]').type('1');
        cy.get('[data-testid="disabilitas-tidak"]').click();
        cy.get('[data-testid="ambulansi"]').type('Tidak Ada');
        cy.get('[data-testid="hambatan-komunikasi-tidak"]').click();
        cy.get('[data-testid="sempoyongan-tidak"]').click();
        cy.get('[data-testid="duduk-menopang-tidak"]').click();
        cy.get('[data-testid="alat-bantu-tidak"]').click();
        cy.get('[data-testid="skala-nyeri"]').click();
        cy.get('[data-testid="nyeri-berulang"]').type('Tidak');
        cy.get('[data-testid="sifat-nyeri"]').type('Cenut-cenut');
        cy.get('[data-testid="penurunan-bb-tdk-tahu"]').click();
        cy.get('[data-testid="tdk-nafsu-makan-ya"]').click();
        cy.get('[data-testid="diagnosis-khusus-tidak"]').click();
        cy.get('[data-testid="nama-penyakit"]').type('Vertigo');
        cy.get('[data-testid="kesadaran"]').click();
        cy.get('[data-testid="kesadaran"]').contains('Compos Mentis').click();
        cy.get('[data-testid="sistole"]').type('120');
        cy.get('[data-testid="diastole"]').type('80');
        cy.get('[data-testid="tinggi-badan"]').type('170');
        cy.get('[data-testid="cara-ukur-tb"]').click();
        cy.get('[data-testid="cara-ukur-tb"]').contains('Berdiri').click();
        cy.get('[data-testid="berat-badan"]').type('70');
        cy.get('[data-testid="lingkar-perut"]').type('90');
        cy.get('[data-testid="detak-nadi"]').type('80');
        cy.get('[data-testid="nafas"]').type('20');
        cy.get('[data-testid="tdk-gawat-darurat"]').click();
        cy.get('[data-testid="simpan"]').click();
    });
});