describe('Nurse', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:3000/login');
    });

    it('displays the header correctly', () => {
        cy.get('[data-testid=title]').should('contain', 'MASUK');
    });

    it('Input TTV', () => {
        const email = 'nuazmia@gmail.com';
        const password = '123123qw';
        const delay = 100;

        // Login
        cy.get('[data-testid="input-email"]').type(email, { delay });
        cy.get('[data-testid="input-password"]').type(password, { delay });
        cy.get('[data-testid="button-login"]').click();

        // Ensure login success
        cy.url().should('not.include', 'login');

        // Navigate to TTV section
        cy.get('[data-testid="ttv-link"]').eq(0).click();

        // Fill in the TTV form
        cy.get('[data-testid="tenaga-medis"]').click();
        cy.contains('[data-testid="tenaga-medis"]', 'dr. Doctor Rifa').click();
        cy.get('[data-testid="asisten-perawat"]').click();
        cy.contains('[data-testid="asisten-perawat"]', 'sus. Nurse Azmia').click();

        cy.get('[data-testid="keluhan-utama"]').type('Sakit kepala', { delay });
        cy.get('[data-testid="keluhan-tambahan"]').type('Sakit perut', { delay });
        cy.get('[data-testid="lama-sakit-tahun"]').type('1', { delay });
        cy.get('[data-testid="lama-sakit-bulan"]').type('1', { delay });
        cy.get('[data-testid="lama-sakit-hari"]').type('1', { delay });
        cy.get('[data-testid="disabilitas-tidak"]').click();
        cy.get('[data-testid="ambulansi"]').type('Tidak Ada', { delay });
        cy.get('[data-testid="hambatan-komunikasi-tidak"]').click();
        cy.get('[data-testid="sempoyongan-tidak"]').click();
        cy.get('[data-testid="duduk-menopang-tidak"]').click();
        cy.get('[data-testid="alat-bantu-tidak"]').click();
        cy.get('[data-testid="skala-nyeri"]').click();
        cy.get('[data-testid="nyeri-berulang"]').type('Tidak', { delay });
        cy.get('[data-testid="sifat-nyeri"]').type('Cenut-cenut', { delay });
        cy.get('[data-testid="penurunan-bb-tdk-tahu"]').click();
        cy.get('[data-testid="tdk-nafsu-makan-ya"]').click();
        cy.get('[data-testid="diagnosis-khusus-tidak"]').click();
        cy.get('[data-testid="nama-penyakit"]').type('Vertigo', { delay });
        cy.get('[data-testid="kesadaran"]').click();
        cy.contains('[data-testid="kesadaran"]', 'Compos Mentis').click();

        // Vital signs
        cy.get('[data-testid="sistole"]').type('120', { delay });
        cy.get('[data-testid="diastole"]').type('80', { delay });
        cy.get('[data-testid="tinggi-badan"]').type('170', { delay });
        cy.get('[data-testid="cara-ukur-tb"]').click();
        cy.contains('[data-testid="cara-ukur-tb"]', 'Berdiri').click();
        cy.get('[data-testid="berat-badan"]').type('70', { delay });
        cy.get('[data-testid="lingkar-perut"]').type('90', { delay });
        cy.get('[data-testid="detak-nadi"]').type('80', { delay });
        cy.get('[data-testid="nafas"]').type('20', { delay });
        cy.get('[data-testid="tdk-gawat-darurat"]').click();

        // Submit the form
        cy.get('[data-testid="simpan"]').click();

    });
});
